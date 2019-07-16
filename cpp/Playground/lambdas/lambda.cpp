/*

Anonymus functions object
[ captures ] ( params ) -> ret { body }
[ captures ] ( params ) { body }
[ captures ] { body }

[&epsilon] capture by reference
[&] captures all variables used in the lambda by reference
[=] captures all variables used in the lambda by value
[&, epsilon] captures variables like with [&], but epsilon by value
[=, &epsilon] captures variables like with [=], but epsilon by reference

Q: Where to use?
A: Whenever you have a function pointer you can you a lambda

*/

#include



/*
* References:
* https://en.cppreference.com/w/cpp/language/lambda
* https://www.youtube.com/watch?v=mWgmBBz0y8c
*/
