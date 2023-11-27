# Setup a typescript project

```bash
$tsc --init
npm init -y
```

This creates a tsconfig file.
To generate the js file from ts by compile we need to change this config file and add the **dist** folder to **outDir**

```bash
...
"outDir": "./dist",
...
```

If we just compile the file with **tsc** command will generate the js file next to the ts file. So to make use of the config file we will use the watch mode by _-w_: **tsc -w**
