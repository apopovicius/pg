#include "swap.h"
#include <stdio.h>

int main(void) {
  int x = 5;
  int y = 10;

  swap_ints(&x, &y);
  printf("x=%d\ny=%d\n",x,y);
  return 0;
}
