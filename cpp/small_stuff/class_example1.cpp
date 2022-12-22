#include "stdafx.h"
#include <iostream>

using namespace std;

class X
{
public:
	X() { cout << "X()"; }
	virtual void me() {}
	virtual ~X() { cout << "~X"; }
};

class Y: public X
{
public:
	Y() { cout << "Y()"; }
	void me() {}
	~Y() { cout << "~Y"; }
};

class Z : virtual X
{
public:
	Z() {}
	void me() {}
	~Z() { cout << "~Z"; }
};

class W : public Y, public Z
{
public:
	W() {}
	void me() {}
	~W() { cout << "~W"; }
};

class A
{
	int x = 100;
public:
	A(int _x = 50) : x(_x) { cout << "A(int x)"; }
	A(A &a) : x(a.x) { cout << "A(A &a)"; }
	int getX() { return x; }
};

int v = 0;

struct Rez
{
	int suma;
	int diferenta;
	int produs;
	void print()
	{
		cout << "produsul este:" << produs;
	}
	Rez()
	{
		suma = 5;
		diferenta = 0;
		produs = 0;
	}
	~Rez()
	{
		cout << "~Rez";
	}
};

void calculate(int x, int y, Rez *r);

void calculate(int x, int y, Rez *r)
{
	r->diferenta = x - y;
	r->produs = x * y;
	r->suma = x + y;
}

void cal(int x, int y);

void cal(int x, int y)
{
	Rez r;
	r.diferenta = x - y;
	r.produs = x * y;
	r.suma = x + y;
}
int main()
{
	//A a{50};
	//A a{50;
	A a = 40;
	//cout << a.getX();
	//Rez z;
	//memset(&z, 0, sizeof(Rez));
	//z.produs = 5;
	//z.print();

	//calculate(5, 4, &z);
	//cal(5, 4);

	char *s1 = "Aloha";
	char *s2 = "Aloha";

	char *string;
	int newSize = 0;

	//int x[10] = { 0 };
	//int *p = new int[3];

	//x[10] = 5;
	//p[3] = 6;

	newSize = strlen(s1) + strlen(s2);

	string = (char*)malloc(sizeof(char)*newSize);

	//string = (char*)malloc(0);

	if (string == NULL)
		throw "Bad allocation";
	else
	{
		string = s1;
	}

	//free(string);

	X *px = new Y;
	delete px;

	//Y *m = new Y;

	//delete m;

//	W *w = new W;

	//delete w;
	return 0;
}