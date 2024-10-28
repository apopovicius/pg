#include "object.h"

object_t *new_object();
void refcount_free(object_t *obj);
void refcount_inc(object_t *obj);
void refcount_dec(object_t *obj);