cmake_minimum_required(VERSION 3.19)
project(SmartPointers)

set(CMAKE_CXX_STANDARD 14)

add_executable(SmartPointers main.cpp shared_ptr.h cmake-build-debug/unique_ptr.h unique_ptr.h Entity.h weak_ptr.h)