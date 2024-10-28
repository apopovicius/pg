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
