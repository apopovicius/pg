#include "zero.h"
void zero_out(void *ptr, object_kind_t kind){
  switch(kind) {
    case INTEGER:  {
      ((int_t*)ptr)->value=0;
      break;  
    }
     case FLOAT:  {
      ((float_t*)ptr)->value=0.0;
      break;  
    }
     case BOOL:  {
      ((bool_t*)ptr)->value=0;
      break;  
    }
    
  }
}