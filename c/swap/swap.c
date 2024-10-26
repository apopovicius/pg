#include "swap.h"
#include <stdlib.h>
#include <string.h>

void swap_ints(int *a, int *b) {
  int temp = *a;
  *a = *b;
  *b = temp;
}

void swap_strings(char **a, char **b) {
  char *temp = *a;
  *a = *b;
  *b = temp;
}

void swap(void *vp1, void *vp2, size_t size) {
  void *temp = malloc(size);  // Allocate temporary memory for swapping
  if (temp != NULL) {
    memcpy(temp,vp1, size);
    memcpy(vp1,vp2, size);
    memcpy(vp2,temp, size);
    free(temp);
  }
}
