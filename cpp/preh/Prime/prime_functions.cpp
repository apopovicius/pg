#include "prime_functions.h"

/* function that determine if a number is prime or not  */
/* input paramenter - nr to be check */
/* return bool: true if nr is prime, false if not */
bool isNumberPrime(int nr)
{
	bool ret = true;
	int i = 0;
	if (nr < 2)
	{
		ret = false;
	}
	else if (nr == 2)
	{
		ret = true;
	}
	else if (nr % 2 == 0)
	{
		ret = false;
	}
	else /* 3 5 7 9 .... */
	{
		for (int i = 3; i*i<=nr; i += 2)
		{
			if (nr % i == 0)
			{
				ret = false;
				break;
			}			
		}
	}
	return ret;
}