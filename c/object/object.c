#include <stdlib.h>
#include <string.h>
#include "object.h"
#include "refcount.h"

object_t *add(object_t *a, object_t *b) {
  if (a == NULL || b == NULL) {
    return NULL;
  }

  switch (a->kind) {
  case INTEGER:
    switch (b->kind) {
    case INTEGER:
      return new_integer(a->data.v_int + b->data.v_int);
    case FLOAT:
      return new_float((float)a->data.v_int + b->data.v_float);
    default:
      return NULL;
    }
  case FLOAT:
    switch (b->kind) {
    case FLOAT:
      return new_float(a->data.v_float + b->data.v_float);
    default:
      return add(b, a);
    }
  case STRING:
    switch (b->kind) {
    case STRING: {
      int a_len = strlen(a->data.v_string);
      int b_len = strlen(b->data.v_string);
      int len = a_len + b_len + 1;
      char *dst = calloc(len, sizeof(char));

      strcat(dst, a->data.v_string);
      strcat(dst, b->data.v_string);

      object_t *obj = new_string(dst);
      free(dst);

      return obj;
    }
    default:
      return NULL;
    }
  case VECTOR3:
    switch (b->kind) {
    case VECTOR3:
      return new_vector3(
          add(a->data.v_vector3.x, b->data.v_vector3.x),
          add(a->data.v_vector3.y, b->data.v_vector3.y),
          add(a->data.v_vector3.z, b->data.v_vector3.z)
      );
    default:
      return NULL;
    }
  case ARRAY:
    switch (b->kind) {
    case ARRAY: {
      size_t a_len = (size_t)length(a);
      size_t b_len = (size_t)length(b);
      size_t length = a_len + b_len;

      object_t *array = new_array(length);

      for (int i = 0; i <= a_len; i++) {
        array_set(array, i, array_get(a, i));
      }

      for (int i = 0; i <= b_len; i++) {
        array_set(array, i + a_len, array_get(b, i));
      }

      return array;
    }
    default:
      return NULL;
    }
  default:
    return NULL;
  }
}

int length(object_t *obj) {
  if (obj == NULL) {
    return -1;
  }

  switch (obj->kind) {
  case INTEGER:
    return 1;
  case FLOAT:
    return 1;
  case STRING:
    return strlen(obj->data.v_string);
  case VECTOR3:
    return 3;
  case ARRAY:
    return obj->data.v_array.size;
  default:
    return -1;
  }
}

object_t *new_vector3(object_t *x, object_t *y, object_t *z) {
  if (x == NULL || y == NULL || z == NULL) {
    return NULL;
  }
  object_t *obj = new_object();
  if (obj == NULL) {
    return NULL;
  }
  obj->kind = VECTOR3;
  obj->data.v_vector3 = (vector_t){.x = x, .y = y, .z = z};
  refcount_inc(x);
  refcount_inc(y);
  refcount_inc(z);
  return obj;
}

object_t *new_integer(int value) {
  object_t *obj = malloc(sizeof(object_t));
  if (obj == NULL) {
    return NULL;
  }

  obj->kind = INTEGER;
  obj->data.v_int = value;
  return obj;
}

object_t *new_float(float value) {
  object_t *obj = malloc(sizeof(object_t));
  if (obj == NULL) {
    return NULL;
  }

  obj->kind = FLOAT;
  obj->data.v_float = value;
  return obj;
}

object_t *new_string(char *value) {
  object_t *obj = malloc(sizeof(object_t));
  if (obj == NULL) {
    return NULL;
  }

  int len = strlen(value);
  char *dst = malloc(len + 1);
  if (dst == NULL) {
    free(obj);
    return NULL;
  }

  strcpy(dst, value);

  obj->kind = STRING;
  obj->data.v_string = dst;
  return obj;
}
