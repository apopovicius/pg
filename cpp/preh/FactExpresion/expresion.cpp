#include <iostream>
using namespace std;

/* for bigger number than20 we need implement an other alghoritm */
long long fact(int nr);
float expresion(int n);

int main(void)
{
	float e; 
	int aprox = 0;
	int nr = 0;
	float e_aprox = 0;
	cout << "Insert a number between [1:20]: ";
	cin >> nr;
	e = expresion(nr);

	aprox = e;
	e_aprox = e - aprox;
	if (e_aprox * 10 > 5)
		aprox += 1;
	
	cout << "e aproximated is: " << aprox << endl;
	return 0;
}

/* range [1:20] */
long long fact(int nr)
{
	int i = 1;
	long long result = 1;
	if (nr < 1 && nr <= 20)
	{
		result = 1;
	}
	else
	{
		for (i = 2; i <= nr; i++)
		{
			result = result * i;
		}
	}
	
	return result;
}

float expresion(int n)
{
	float e = 0;
	int i = 0;

	for (i = 1; i <= n; i++)
	{
		e += 1 / (float)fact(i);
	}
	return e;
}
