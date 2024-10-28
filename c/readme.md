# How to use nobuild

>github repo:
https://github.com/tsoding/nobuild/tree/master

>raw header:
https://raw.githubusercontent.com/tsoding/nobuild/refs/heads/master/nobuild.h

# Working sample
> Check swap project!

1. copy raw file nobuild.h from repo
2. create nobuild.c
```c
#define NOBUILD_IMPLEMENTATION
#include "./nobuild.h"
// portable - pedantic
#define CFLAGS "-Wall", "-Wextra", "-std=c11", "-pedantic", "-ggdb"
#define APPNAME "swap"

int main(int argc, char **argv) {
  GO_REBUILD_URSELF(argc, argv);
  CMD("cc", CFLAGS, "-o", APPNAME, "main.c", "swap.c");

  if(argc > 1) {
    if(strcmp(argv[1], "run") == 0) {
      CMD("./"APPNAME);
    } else {
      PANIC("%s is an unknown subcommand", argv[1]);
    }
  }
  return 0;
}
```

3. build it!
```bash
$gcc -o nobuild nobuild.`` 
```

4. rebuild!
```bash
$./nobuild
```

5. rebuild & run!
```bash
./nobuild run
```
