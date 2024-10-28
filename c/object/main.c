#include <stdlib.h>

#include "munit.h"
#include "object.h"

munit_case(RUN, test_integer_add, {
  object_t *one = new_integer(1);
  object_t *three = new_integer(3);
  object_t *four = add(one, three);

  assert_not_null(four, "must return an object");
  assert_int(four->kind, ==, INTEGER, "1 + 3 = 4");
  assert_int(four->data.v_int, ==, 4, "1 + 3 = 4");

  free(one);
  free(three);
  free(four);
  assert(boot_all_freed());
});

munit_case(RUN, test_float_add, {
  object_t *one = new_float(1.5);
  object_t *three = new_float(3.5);
  object_t *five = add(one, three);

  assert_not_null(five, "must return an object");
  assert_int(five->kind, ==, FLOAT, "1.5 + 3.5 = 5.0");
  assert_float(five->data.v_float, ==, 1.5 + 3.5, "1.5 + 3.5 = 5.0");

  free(one);
  free(three);
  free(five);
  assert(boot_all_freed());
});

munit_case(RUN, test_string_add, {
  object_t *hello = new_string("hello");
  object_t *world = new_string(", world");
  object_t *greeting = add(hello, world);

  assert_not_null(greeting, "must return an object");
  assert_int(greeting->kind, ==, STRING, "Must be a string!");
  assert_string_equal(
      greeting->data.v_string, "hello, world", "Should concatenate strings"
  );

  free(hello->data.v_string);
  free(hello);
  free(world->data.v_string);
  free(world);
  free(greeting->data.v_string);
  free(greeting);
  assert(boot_all_freed());
});

munit_case(SUBMIT, test_string_add_self, {
  object_t *repeated = new_string("(repeated)");
  object_t *result = add(repeated, repeated);

  assert_not_null(result, "must return an object");
  assert_int(result->kind, ==, STRING, "Must be a string!");
  assert_string_equal(
    result->data.v_string,
    "(repeated)(repeated)",
    "Should concatenate strings"
  );

  free(repeated->data.v_string);
  free(repeated);
  free(result->data.v_string);
  free(result);
  assert(boot_all_freed());
});

munit_case(SUBMIT, test_vector3_add, {
  object_t *one = new_float(1.0);
  object_t *two = new_float(2.0);
  object_t *three = new_float(3.0);
  object_t *four = new_float(4.0);
  object_t *five = new_float(5.0);
  object_t *six = new_float(6.0);

  object_t *v1 = new_vector3(one, two, three);
  object_t *v2 = new_vector3(four, five, six);
  object_t *result = add(v1, v2);

  assert_not_null(result, "must return an object");
  assert_int(result->kind, ==, VECTOR3, "Must be a vector3");

  assert_float(result->data.v_vector3.x->data.v_float, ==, 5.0, "x component should be 5.0");
  assert_float(result->data.v_vector3.y->data.v_float, ==, 7.0, "y component should be 7.0");
  assert_float(result->data.v_vector3.z->data.v_float, ==, 9.0, "z component should be 9.0");


  free(v1->data.v_vector3.x);
  free(v1->data.v_vector3.y);
  free(v1->data.v_vector3.z);
  free(v1);

  free(v2->data.v_vector3.x);
  free(v2->data.v_vector3.y);
  free(v2->data.v_vector3.z);
  free(v2);

  free(result->data.v_vector3.x);
  free(result->data.v_vector3.y);
  free(result->data.v_vector3.z);
  free(result);
  assert(boot_all_freed());
});

munit_case(SUBMIT, test_array_add, {
  object_t *one = new_integer(1);
  object_t *ones = new_array(2);
  assert(array_set(ones, 0, one));
  assert(array_set(ones, 1, one));

  object_t *hi = new_string("hi");
  object_t *hellos = new_array(3);
  assert(array_set(hellos, 0, hi));
  assert(array_set(hellos, 1, hi));
  assert(array_set(hellos, 2, hi));

  object_t *result = add(ones, hellos);

  assert_not_null(result, "must return an object");
  assert_int(result->kind, ==, ARRAY, "Must be an array");

  object_t *first = array_get(result, 0);
  assert_not_null(first, "should find the first item");
  assert_int(first->data.v_int, ==, 1, "First item should be an int with 1");

  object_t *third = array_get(result, 2);
  assert_not_null(third, "should find the third item");
  assert_string_equal(third->data.v_string, "hi", "third == hi");

  free(one);
  free(ones->data.v_array.elements);
  free(ones);

  free(hi->data.v_string);
  free(hi);
  free(hellos->data.v_array.elements);
  free(hellos);
  free(result->data.v_array.elements);
  free(result);

  assert(boot_all_freed());
});

int main() {
  MunitTest tests[] = {
    munit_test("/integer", test_integer_add),
    munit_test("/float", test_float_add),
    munit_test("/string", test_string_add),
    munit_test("/string-repeated", test_string_add_self),
    munit_test("/array", test_array_add),
    munit_test("/vector3", test_vector3_add),
    munit_null_test,
  };

  MunitSuite suite = munit_suite("object-add", tests);

  return munit_suite_main(&suite, NULL, 0, NULL);
}