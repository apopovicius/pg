# Enable this for internal profiling (off by default)
#OMZ_TRACE=true
source "$ZSH/tools/performance_trace.zsh"

performance_trace "OMZ_INIT"
# ANSI formatting function (\033[<code>m)
# 0: reset, 1: bold, 4: underline, 22: no bold, 24: no underline, 31: red, 33: yellow
omz_f() {
  [ $# -gt 0 ] || return
  IFS=";" printf "\033[%sm" $*
}
[ -t 1 ] || omz_f() { :; }

[[ -n "$ZSH_VERSION" ]] || {
  omz_ptree() {
    pid=$$; pids="$pid"
    while [ ${pid-0} -ne 1 ] && ppid=$(ps -e -o pid,ppid | awk "\$1 == $pid { print \$2 }"); do
      pids="$pids $pid"; pid=$ppid
    done
    case "$(uname)" in
      Linux) ps -o ppid,pid,command -f -p $pids 2>/dev/null ;;
      Darwin|*) ps -o ppid,pid,command -p $pids 2>/dev/null ;;
    esac
    [ $? -eq 0 ] || ps -o ppid,pid,comm | awk "NR == 1 || index(\"$pids\", \$2) != 0"
  }

  {
    shell=$(ps -o pid,comm | awk "\$1 == $$ { print \$2 }")
    printf "$(omz_f 1 31)Error:$(omz_f 22) Oh My Zsh can't be loaded from: $(omz_f 1)${shell}$(omz_f 22). "
    printf "You need to run $(omz_f 1)zsh$(omz_f 22) instead.$(omz_f 0)\n"
    printf "$(omz_f 33)Here's the process tree:$(omz_f 22)\n\n"
    omz_ptree
    printf "$(omz_f 0)\n"
  } >&2

  return 1
}

[[ "$(emulate)" = zsh ]] || {
  printf "$(omz_f 1 31)Error:$(omz_f 22) Oh My Zsh can't be loaded in \`$(emulate)\` emulation mode.$(omz_f 0)\n" >&2
  return 1
}

unset -f omz_f

[[ -n "$ZSH" ]] || export ZSH="${${(%):-%x}:a:h}"
[[ -n "$ZSH_CUSTOM" ]] || ZSH_CUSTOM="$ZSH/custom"
[[ -n "$ZSH_CACHE_DIR" ]] || ZSH_CACHE_DIR="$ZSH/cache"

if [[ ! -w "$ZSH_CACHE_DIR" ]]; then
  ZSH_CACHE_DIR="${XDG_CACHE_HOME:-$HOME/.cache}/oh-my-zsh"
fi

mkdir -p "$ZSH_CACHE_DIR/completions"
(( ${fpath[(Ie)$ZSH_CACHE_DIR/completions]} )) || fpath=("$ZSH_CACHE_DIR/completions" $fpath)

source "$ZSH/tools/check_for_upgrade.sh"

fpath=($ZSH/{functions,completions} $ZSH_CUSTOM/{functions,completions} $fpath)

autoload -U compaudit compinit zrecompile

is_plugin() {
  local base_dir=$1
  local name=$2
  builtin test -f $base_dir/plugins/$name/$name.plugin.zsh \
    || builtin test -f $base_dir/plugins/$name/_$name
}

for plugin ($plugins); do
  if is_plugin "$ZSH_CUSTOM" "$plugin"; then
    fpath=("$ZSH_CUSTOM/plugins/$plugin" $fpath)
  elif is_plugin "$ZSH" "$plugin"; then
    fpath=("$ZSH/plugins/$plugin" $fpath)
  else
    echo "[oh-my-zsh] plugin '$plugin' not found"
  fi
done

if [[ "$OSTYPE" = darwin* ]]; then
  SHORT_HOST=$(scutil --get ComputerName 2>/dev/null) || SHORT_HOST="${HOST/.*/}"
else
  SHORT_HOST="${HOST/.*/}"
fi

[[ -z "$ZSH_COMPDUMP" ]] && ZSH_COMPDUMP="${ZDOTDIR:-$HOME}/.zcompdump-${SHORT_HOST}-${ZSH_VERSION}"

zcompdump_revision="#omz revision: $(builtin cd -q "$ZSH"; git rev-parse HEAD 2>/dev/null)"
zcompdump_fpath="#omz fpath: $fpath"

if ! command grep -q -Fx "$zcompdump_revision" "$ZSH_COMPDUMP" 2>/dev/null \
   || ! command grep -q -Fx "$zcompdump_fpath" "$ZSH_COMPDUMP" 2>/dev/null; then
  command rm -f "$ZSH_COMPDUMP"
  zcompdump_refresh=1
fi

autoload -Uz compinit
if [[ -z "$__OMZ_COMPINIT_DONE" ]]; then
  __OMZ_COMPINIT_DONE=1
  compinit -C -d "$ZSH_COMPDUMP" 2>/dev/null
fi

if (( $zcompdump_refresh )) \
  || ! command grep -q -Fx "$zcompdump_revision" "$ZSH_COMPDUMP" 2>/dev/null; then
  tee -a "$ZSH_COMPDUMP" &>/dev/null <<EOF

$zcompdump_revision
$zcompdump_fpath
EOF
fi
unset zcompdump_revision zcompdump_fpath zcompdump_refresh

if command mkdir "${ZSH_COMPDUMP}.lock" 2>/dev/null; then
  zrecompile -q -p "$ZSH_COMPDUMP"
  command rm -rf "$ZSH_COMPDUMP.zwc.old" "${ZSH_COMPDUMP}.lock"
fi

_omz_source() {
  local context filepath="$1"

  case "$filepath" in
    lib/*) context="lib:${filepath:t:r}" ;;
    plugins/*) context="plugins:${filepath:h:t}" ;;
  esac

  local disable_aliases=0
  zstyle -T ":omz:${context}" aliases || disable_aliases=1

  local -A aliases_pre galiases_pre
  if (( disable_aliases )); then
    aliases_pre=("${(@kv)aliases}")
    galiases_pre=("${(@kv)galiases}")
  fi

  if [[ -f "$ZSH_CUSTOM/$filepath" ]]; then
    source "$ZSH_CUSTOM/$filepath"
  elif [[ -f "$ZSH/$filepath" ]]; then
    source "$ZSH/$filepath"
  fi

  if (( disable_aliases )); then
    if (( #aliases_pre )); then
      aliases=("${(@kv)aliases_pre}")
    else
      (( #aliases )) && unalias "${(@k)aliases}"
    fi
    if (( #galiases_pre )); then
      galiases=("${(@kv)galiases_pre}")
    else
      (( #galiases )) && unalias "${(@k)galiases}"
    fi
  fi
}

for lib_file ("$ZSH"/lib/*.zsh); do
  _omz_source "lib/${lib_file:t}"
done
unset lib_file

#performance_trace "PLUGINS"
for plugin ($plugins); do
  _omz_source "plugins/$plugin/$plugin.plugin.zsh"
done
unset plugin
#performance_trace "PLUGINS"

for config_file ("$ZSH_CUSTOM"/*.zsh(N)); do
  source "$config_file"
done
unset config_file

is_theme() {
  local base_dir=$1
  local name=$2
  builtin test -f $base_dir/$name.zsh-theme
}

if [[ -n "$ZSH_THEME" ]]; then
  if is_theme "$ZSH_CUSTOM" "$ZSH_THEME"; then
    source "$ZSH_CUSTOM/$ZSH_THEME.zsh-theme"
  elif is_theme "$ZSH_CUSTOM/themes" "$ZSH_THEME"; then
    source "$ZSH_CUSTOM/themes/$ZSH_THEME.zsh-theme"
  elif is_theme "$ZSH/themes" "$ZSH_THEME"; then
    source "$ZSH/themes/$ZSH_THEME.zsh-theme"
  else
    echo "[oh-my-zsh] theme '$ZSH_THEME' not found"
  fi
fi

[[ -z "$LS_COLORS" ]] || zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"

performance_trace "OMZ_INIT"
