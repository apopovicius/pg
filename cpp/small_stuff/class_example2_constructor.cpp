#include "stdafx.h"
#include <iostream>
using namespace std;

//class B {
//
//public:
//	int y;
//	B(int _x = 5) : y(_x) { cout << " B = " << y << endl; }
//};
//
//
//class A {
//
//public:
//	int x;
//	friend class B;
//	A(int _x = 5) : x(_x) { cout << " A = " << x << endl; }
//
//	operator int()
//	{
//		return x;
//	}
//};


struct A {
	A() { cout << "A" << endl; }
	~A() { cout << "~A" << endl;  cout << endl << "....... " << endl;
	}
};

struct B: public A {
	B() { cout << "B" << endl; }
	~B() { cout << "~B" << endl; cout << endl << "....... " << endl;
	}
};

struct C: public A {
	C() { cout << "C" << endl; }
	~C() { cout << "~C" << endl; cout << endl << "....... " << endl;
	}
};

struct D: public B, public C {
	D() { cout << "D" << endl; }
	~D() { cout << "~D" << endl; cout << endl << "....... " << endl;}
};


void printI(int &&i) {
	cout << "first :" << i;
}

struct SA
{
	int x;
	char *n;
};


int main()
{
	//A a;
	//cout << endl << "....... " << endl;
	//B b;
	//cout << endl << "....... " << endl;
	//C c;
	//cout << endl << "....... " << endl;
	//D d;
	//cout << endl << "....... " << endl;

	int a = 5;
	char *s;
	/*printI(7);*/

	SA sa;

	s = (char*)malloc(255 * sizeof(char));

	gets_s(s,255);

	if (s == NULL)
		cout << "Bad Alloc";
	else
	{
		sa.x = a;
		sa.n = s;
	}

	free(s);
	s = NULL;




	cout << sa.x;
	/*A a(3);
	a.x = 10;
	cout << a.x;

	int n = a;
	cout << " n = "<< n;*/
	//const a ca;
	//ca.x = 100;
	//cout << ca.x;

	return 0;
}

