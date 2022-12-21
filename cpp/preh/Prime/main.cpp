#include <iostream>
#include "prime_functions.h"

using namespace std;

void unit_test_lower_than_n_prime_numbers();
void unit_test_lower_than_not_prime_numbers();
void unit_test_infinit_read_n_and_check_prime_numbers();

int main(void)
{
	unit_test_lower_than_n_prime_numbers();
	unit_test_lower_than_not_prime_numbers();
	unit_test_infinit_read_n_and_check_prime_numbers();
	return 0;
}

void unit_test_lower_than_n_prime_numbers()
{
	int n,m;
	cout << "Insert number for unit_test_lower_than_n_prime_numbers: ";
	cin >> m;
	for (n = 0; n <= m; n++)
	{
		if (isNumberPrime(n))
		{
			cout << n << " is prime" << endl;
		}
		else
		{
			//cout << n << " is not prime" << endl;
		}
	}
}
void unit_test_lower_than_not_prime_numbers()
{
	int n, m;
	cout << "Insert number for unit_test_lower_than_not_prime_numbers: ";
	cin >> m;
	for (n = 0; n <= m; n++)
	{
		if (isNumberPrime(n))
		{
			//cout << n << " is prime" << endl;
		}
		else
		{
			cout << n << " is not prime" << endl;
		}
	}
}

void unit_test_infinit_read_n_and_check_prime_numbers()
{
	int n;
	cout << "Insert number for prime checking: ";
	cin >> n;
	while (true)
	{
		if (isNumberPrime(n))
		{
			cout << n << " is prime" << endl;
		}
		else
		{
			cout << n << " is not prime" << endl;
		}
	}
}