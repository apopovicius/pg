# Profiler

This bash script is used to measure block loading time. It started as a annoying issue of long start time on my warp+zsh+omz combo(more than 3s loading time).

# Usage

## copy into the oh-my-zsh path

```bash
cp performance_trace.zsh ~/.oh-my-zsh/tools/performance_trace.zsh
```

## inside zshrc or oh-my-zsh file source the script

```bash
source "$ZSH/tools/performance_trace.zsh"
```

## measure it by adding it before and after block using **performance_trace "YOUR-TAG-HERE"**

```bash
performance_trace "PLUGINS"
for plugin ($plugins); do
  _omz_source "plugins/$plugin/$plugin.plugin.zsh"
done
unset plugin
performance_trace "PLUGINS"
```
