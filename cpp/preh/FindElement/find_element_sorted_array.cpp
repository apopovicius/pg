#include <iostream>
using namespace std;

/* implement a function that return the index of the biggest number from a sorted array with distinct elements,
witch is stricly less than the value received as function parameter ( N ). Complexity O(logn)
x = [1,3,4,5,9,23,47] , N  = 25 => return 5
*/

/* TODO sort array function*/

int x[] = { 1,3,5,9,23,47 };
int N = 25;

int findElementIndex(int pos = 0, int count = 0);

int findElementIndex(int pos, int count)
{
	
	int result = -1;	
	if (count < pos)
		return -1;
	if (x[pos] > N)
	{
		result = pos;
		return result;
	}
	else
	{
		pos = pos * 2;



		findElementIndex(pos, count);
	}
	return result;
}
int main(void)
{
	int count=10;

	switch (count)
	{
		case 10:
		{
			int t = 20;
			break;
		}
		default:
		{
			int t = 10;
			break;
		}
	}

	//count = sizeof(x) / sizeof(x[0]) - 1;
	//cout << findElementIndex(0,count) << endl;
	return 0;
}


