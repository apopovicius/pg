local function map(mode, lhs, rhs)
	vim.keymap.set(mode, lhs, rhs, { silent = true })
end

local status, telescope = pcall(require, "telescope.builtin")
if status then
	-- Telescope
	map("n", "<leader>pf", telescope.find_files)
	map("n", "<C-p>", telescope.git_files)
	map("n", "<leader>ps", function()
		telescope.grep_string({ search = vim.fn.input("Grep > ") })
	end)
	map("n", "<leader>pg", telescope.live_grep)
	map("n", "<leader>pc", telescope.grep_string)
	map("n", "<leader>pb", telescope.buffers)
	map("n", "<leader>ph", telescope.help_tags)
	map("n", "<leader>gs", telescope.git_status)
	map("n", "<leader>gc", telescope.git_commits)
else
	print("Telescope not found")
end

-- <leader> = the space key
map("n", "<leader>pv", ":Ex<CR>")

-- Save
map("n", "<leader>w", "<CMD>update<CR>")

-- Quit
map("n", "<leader>q", "<CMD>q<CR>")

-- Exit insert mode
map("i", "jk", "<ESC>")

-- Windows
map("n", "<leader>sv", "<CMD>vsplit<CR>")
map("n", "<leader>sh", "<CMD>split<CR>")
-- NeoTree
map("n", "<leader>e", "<CMD>Neotree toggle<CR>")
map("n", "<leader>o", "<CMD>Neotree focus<CR>")

-- Buffer
map("n", "<TAB>", "<CMD>bnext<CR>")
map("n", "<S-TAB>", "<CMD>bprevious<CR>")

-- Terminal
map("n", "<leader>th", "<CMD>ToggleTerm size=10 direction=horizontal<CR>")
map("n", "<leader>tv", "<CMD>ToggleTerm size=80 direction=vertical<CR>")

-- Markdown Preview
map("n", "<leader>m", "<CMD>MarkdownPreview<CR>")
map("n", "<leader>mn", "<CMD>MarkdownPreviewStop<CR>")

-- Window Navigation
map("n", "<C-h>", "<C-w>h")
map("n", "<C-l>", "<C-w>l")
map("n", "<C-k>", "<C-w>k")
map("n", "<C-j>", "<C-w>j")
map("n", "<C-f>", "<CMD>silent !tmux neww tmux-sessionizer<CR>")

-- Resize Windows
map("n", "<C-Left>", "<C-w><")
map("n", "<C-Right>", "<C-w>>")
map("n", "<C-Up>", "<C-w>+")
map("n", "<C-Down>", "<C-w>-")

-- Debugger
--map("n", "<F5>", require 'dap'.continue)
map("n", "<C-b>", "<CMD>lua require'dap' .toogle_breakpoint()<CR>")
--map("n", "<C-l>", function()
--require 'dap'.set_breakpoint(vim.fn.input('Breakpoint condition'))
-- end)

--map("n", "<F10>", require 'dap'.step_over)
--map("n", "<F11>", require 'dap'.step_into)
--map("n", "<F12>", require 'dap'.step_out)
--map("n", "<F6>", require 'dap'.repl.open)
--map("n", "dl", require 'dap'.run_last)

map("n", "<leader>zz", function()
	require("zen-mode").setup({
		window = {
			width = 130,
			options = {},
		},
	})
	require("zen-mode").toggle()
	vim.wo.wrap = false
	vim.wo.number = true
	vim.wo.rnu = true
	--ColorMyPencils()
end)

map("n", "<leader>zZ", function()
	require("zen-mode").setup({
		window = {
			width = 120,
			options = {},
		},
	})
	require("zen-mode").toggle()
	vim.wo.wrap = false
	vim.wo.number = false
	vim.wo.rnu = false
	vim.opt.colorcolumn = "0"
	--ColorMyPencils()
end)
