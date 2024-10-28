#include "object-array.h"
#include "refcount.h"

bool array_set(object_t *array, size_t index, object_t *value) {
  if (array == NULL || value == NULL) {
    return false;
  }

  if (array->kind != ARRAY) {
    return false;
  }

  if (index >= array->data.v_array.size) {
    return false;
  }

  // Set the value directly now (already checked size constraint)
  array->data.v_array.elements[index] = value;
  return true;
}

object_t *array_get(object_t *array, size_t index) {
  if (array == NULL) {
    return NULL;
  }

  if (array->kind != ARRAY) {
    return NULL;
  }

  if (index >= array->data.v_array.size) {
    return NULL;
  }

  // Set the value directly now (already checked size constraint)
  return array->data.v_array.elements[index];
}

object_t *new_array(size_t size) {
  object_t *obj = new_object();
  if (obj == NULL) {
    return NULL;
  }

  object_t **elements = calloc(size, sizeof(object_t *));
  if (elements == NULL) {
    free(obj);
    return NULL;
  }

  obj->kind = ARRAY;
  obj->data.v_array = (array_t){.size = size, .elements = elements};
  return obj;
}