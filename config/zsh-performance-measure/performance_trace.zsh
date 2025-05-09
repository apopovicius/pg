# ~/.oh-my-zsh/tools/performance_trace.zsh
# Usage: performance_trace "LABEL"
# Outputs elapsed time only when OMZ_TRACE=true

typeset -gA __omz_perf_trace

function performance_trace() {
  [[ "$OMZ_TRACE" != "true" ]] && return

  local label=$1
  local now=$EPOCHREALTIME

  # Safely disable glob expansion errors temporarily
  setopt localoptions
  unsetopt nomatch

  if [[ -n "${__omz_perf_trace[$label]:-}" ]]; then
    local then="${__omz_perf_trace[$label]}"
    echo "⏱ $label: $(echo "$now - $then" | bc -l)s"
    unset __omz_perf_trace[$label]
  else
    __omz_perf_trace[$label]=$now
  fi
}