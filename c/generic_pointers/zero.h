typedef enum ObjectKind {
  INTEGER,
  FLOAT,
  BOOL,
} object_kind_t;

typedef struct Int {
  char *name;
  int value;
} int_t;

typedef struct Float {
  char *name;
  float value;
} float_t;

typedef struct Bool {
  char *name;
  unsigned int value;
} bool_t;

void zero_out(void *ptr, object_kind_t kind);