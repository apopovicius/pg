CC = gcc
CFLAGS = -Iinclude -g -Wall
LDFLAGS = -lm

# Automatically find all C source files in the src directory
SRC = $(wildcard src/*.c)

# Object files
OBJ = $(SRC:.c=.o)

# Target executable name
TARGET = app

# Default target
all: $(TARGET)

# Link object files to create the executable
$(TARGET): $(OBJ)
	$(CC) -o $@ $^ $(LDFLAGS)

# Compile source files into object files
%.o: %.c
	$(CC) -c $(CFLAGS) $< -o $@

# Clean up object files and the executable
clean:
	rm -f $(OBJ) $(TARGET)