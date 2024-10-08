#include "token.h"

token_t** create_token_pointer_array(token_t* tokens, size_t count) {
  token_t** token_pointers = (token_t**)malloc(count * sizeof(token_t*));
  if (token_pointers == NULL) {
    exit(1);
  }

  for (size_t i = 0; i < count; ++i) {
    token_pointers[i] = (token_t*)malloc(sizeof(token_t));
    if (token_pointers[i] == NULL) {
      exit(1);
    }
    token_pointers[i]->literal = tokens[i].literal;
    token_pointers[i]->line = tokens[i].line;
    token_pointers[i]->column = tokens[i].column;
  }

  return token_pointers;
}