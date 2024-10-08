#include "bootlib.h"
#include "munit.h"
#include "stack.h"

munit_case(RUN, create_stack_small, {
  stack_t *s = stack_new(3);
  assert_int(s->capacity, ==, 3, "Sets capacity to 3");
  assert_int(s->count, ==, 0, "No elements in the stack yet");
  assert_ptr_not_null(s->data, "Allocates the stack data");

  free(s->data);
  free(s);

  assert(boot_all_freed());
});

munit_case(SUBMIT, create_stack_large, {
  stack_t *s = stack_new(100);
  assert_int(s->capacity, ==, 100, "Sets capacity to 100");
  assert_int(s->count, ==, 0, "No elements in the stack yet");
  assert_ptr_not_null(s->data, "Allocates the stack data");

  free(s->data);
  free(s);

  assert(boot_all_freed());
});

munit_case(RUN, create_stack, {
  stack_t *s = stack_new(10);
  assert_int(s->capacity, ==, 10, "Sets capacity to 10");
  assert_int(s->count, ==, 0, "No elements in the stack yet");
  assert_ptr_not_null(s->data, "Allocates the stack data");

  stack_free(s);
  assert(boot_all_freed());
});

munit_case(RUN, pop_stack, {
  stack_t *s = stack_new(2);
  assert_ptr_not_null(s, "Must allocate a new stack");

  assert_int(s->capacity, ==, 2, "Sets capacity to 2");
  assert_int(s->count, ==, 0, "No elements in the stack yet");
  assert_ptr_not_null(s->data, "Allocates the stack data");

  int one = 1;
  int two = 2;
  int three = 3;

  stack_push(s, &one);
  stack_push(s, &two);

  assert_int(s->capacity, ==, 2, "Sets capacity to 2");
  assert_int(s->count, ==, 2, "2 elements in the stack");

  stack_push(s, &three);
  assert_int(s->capacity, ==, 4, "Capcity is doubled");
  assert_int(s->count, ==, 3, "3 elements in the stack");

  int *popped = stack_pop(s);
  assert_int(*popped, ==, three, "Should pop the last element");

  popped = stack_pop(s);
  assert_int(*popped, ==, two, "Should pop the last element");

  popped = stack_pop(s);
  assert_int(*popped, ==, one, "Should pop the only remaining element");

  popped = stack_pop(s);
  assert_null(popped, "No remaining elements");

  stack_free(s);
  assert(boot_all_freed());
});

munit_case(RUN, pop_stack_empty, {
  stack_t *s = stack_new(2);
  assert_ptr_not_null(s, "Must allocate a new stack");

  assert_int(s->capacity, ==, 2, "Sets capacity to 2");
  assert_int(s->count, ==, 0, "No elements in the stack yet");
  assert_ptr_not_null(s->data, "Allocates the stack data");

  int *popped = stack_pop(s);
  assert_null(popped, "Should return null when popping an empty stack");

  // Clean up our allocated data.
  free(s->data);
  free(s);

  // Should be nothing left that is allocated.
  assert(boot_all_freed());
});

munit_case(RUN, push_stack, {
  stack_t *s = stack_new(2);
  assert_ptr_not_null(s, "Must allocate a new stack");

  assert_int(s->capacity, ==, 2, "Sets capacity to 2");
  assert_int(s->count, ==, 0, "No elements in the stack yet");
  assert_ptr_not_null(s->data, "Allocates the stack data");

  int a = 1;

  stack_push(s, &a);
  stack_push(s, &a);

  assert_int(s->capacity, ==, 2, "Sets capacity to 2");
  assert_int(s->count, ==, 2, "2 elements in the stack");

  stack_push(s, &a);
  assert_int(s->capacity, ==, 4, "Capcity is doubled");
  assert_int(s->count, ==, 3, "3 elements in the stack");

  stack_free(s);
  assert(boot_all_freed());
});

munit_case(SUBMIT, push_double_capcity, {
  stack_t *s = stack_new(2);
  assert_ptr_not_null(s, "Must allocate a new stack");

  assert_int(s->capacity, ==, 2, "Sets capacity to 2");
  assert_int(s->count, ==, 0, "No elements in the stack yet");
  assert_ptr_not_null(s->data, "Allocates the stack data");

  int a = 1;

  stack_push(s, &a);
  stack_push(s, &a);

  assert_int(s->capacity, ==, 2, "Sets capacity to 2");
  assert_int(s->count, ==, 2, "2 elements in the stack");

  stack_push(s, &a);
  assert_int(s->capacity, ==, 4, "Capcity is doubled");
  assert_int(s->count, ==, 3, "3 elements in the stack");

  // Clean up our allocated data.
  free(s->data);
  free(s);

  // Should be nothing left that is allocated.
  assert(boot_all_freed());
});



munit_case(RUN, multiple_types_stack, {
  stack_t *s = stack_new(4);
  assert_ptr_not_null(s, "Must allocate a new stack");

  stack_push_multiple_types(s);
  assert_int(s->count, ==, 2, "Should have two items in the stack");

  float *f = s->data[0];
  assert_float(*f, ==, 3.14, "Float is equal");

  char *string = s->data[1];
  assert_string_equal(string, "Sneklang is blazingly slow!", "char* is equal");

  free(f);
  free(string);
  stack_free(s);
});

munit_case(RUN, heterogenous_stack, {
  stack_t *s = stack_new(2);
  assert_ptr_not_null(s, "Must allocate a new stack");

  scary_double_push(s);
  assert_int(s->count, ==, 2, "Should have two items in the stack");

  int value = (int)s->data[0];
  assert_int(value, ==, 1337, "Zero item should be 1337");

  int *pointer = s->data[1];
  assert_int(*pointer, ==, 1024, "Top item should be 1024");

  free(pointer);
  stack_free(s);
});



int main() {
  MunitTest tests[] = {
      munit_test("/create_stack_small", create_stack_small),
      munit_test("/create_stack_large", create_stack_large),
      munit_test("/create_stack", create_stack),
      munit_test("/push_stack", push_stack),
      munit_test("/push_double_capcity", push_double_capcity),
      munit_test("/pop_stack", pop_stack),
      munit_test("/pop_stack_empty", pop_stack_empty),
      munit_test("/multiple_types_stack", multiple_types_stack),
      munit_test("/heterogenous_stack", heterogenous_stack),
      munit_null_test,
  };

  MunitSuite suite = munit_suite("stack", tests);

  return munit_suite_main(&suite, NULL, 0, NULL);
}