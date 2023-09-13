local status, nvim_lsp = pcall(require, "lspconfig")
if not status then
	return
end

local on_attach = function(client, bufnr)
	-- format on save
	if client.server_capabilities.documentFormattingProvider then
		vim.api.nvim_create_autocmd("BufWritePre", {
			group = vim.api.nvim_create_augroup("Format", { clear = true }),
			buffer = bufnr,
			callback = function()
				vim.lsp.buf.format()
			end,
		})
	end

	-- set keybinds
	local opts = { buffer = bufnr, remap = false }

	vim.keymap.set("n", "gd", function()
		vim.lsp.buf.definition()
	end, opts)
	vim.keymap.set("n", "K", function()
		vim.lsp.buf.hover()
	end, opts)
	vim.keymap.set("n", "<leader>vws", function()
		vim.lsp.buf.workspace_symbol()
	end, opts)
	vim.keymap.set("n", "<leader>vd", function()
		vim.diagnostic.open_float()
	end, opts)
	vim.keymap.set("n", "[d", function()
		vim.diagnostic.goto_next()
	end, opts)
	vim.keymap.set("n", "]d", function()
		vim.diagnostic.goto_prev()
	end, opts)
	vim.keymap.set("n", "<leader>vca", function()
		vim.lsp.buf.code_action()
	end, opts)
	vim.keymap.set("n", "<leader>vrr", function()
		vim.lsp.buf.references()
	end, opts)
	vim.keymap.set("n", "<leader>vrn", function()
		vim.lsp.buf.rename()
	end, opts)
	vim.keymap.set("i", "<C-h>", function()
		vim.lsp.buf.signature_help()
	end, opts)
end

local capabilities = require("cmp_nvim_lsp").default_capabilities()

-- TypeScript
nvim_lsp.tsserver.setup({
	on_attach = on_attach,
	filetypes = { "typescript", "typescriptreact", "typescript.tsx" },
	cmd = { "typeScript-language-server.cmd", "--stdio" },
	capabilities = capabilities,
})

-- CSS
nvim_lsp.cssls.setup({
	on_attach = on_attach,
	capabilities = capabilities,
})

-- HTML
nvim_lsp.html.setup({
	on_attach = on_attach,
	capabilities = capabilities,
})

-- JSON
nvim_lsp.jsonls.setup({
	on_attach = on_attach,
	capabilities = capabilities,
})

-- Eslint
nvim_lsp.eslint.setup({
	on_attach = on_attach,
	capabilities = capabilities,
})
