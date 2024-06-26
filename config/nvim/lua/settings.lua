local global = vim.g
local o = vim.o

-- map <leader>

global.mapleader = " "
global.maplocalleader = " "

-- editor options

o.number = true
o.relativenumber = true
o.clipboard = "unnamedplus"
o.syntax = "on"
o.autoindent = true
o.cursorline = true
o.expandtab = true
o.shiftwidth = 2
o.tabstop = 2
o.encoding = "utf-8"
o.ruler = true
o.mouse = "a"
o.title = true
o.hidden = true
o.ttimeoutlen = 0
o.wildmenu = true
o.showcmd = true
o.showmatch = true
o.termguicolors = true
o.wrap = false
o.smartindent = true
o.hlsearch = false
o.incsearch = true
o.updatetime = 50
o.scrolloff = 8
o.signcolumn = "yes"
o.colorcolumn = "150"
