#include <iostream>
using namespace std;

/*
n = 5, n e [3,25], n is odd
   01234 
     *   0          
	***  1
   ***** 2
    ***  3
	 *   4

*/

void resetRow(char row[], int nr);
void printRow(char row[], int nr);

void resetRow(char row[],int nr)
{
	for (int i = 0; i < nr; i++)
	{
		if (i == nr / 2)
		{
			row[i] = '*';
		}
		else
		{
			row[i] = ' ';
		}		
	}
}

void printRow(char row[], int nr)
{
	for (int i = 0; i < nr; i++)
		cout << row[i];
	cout << endl;
}

int main(void)
{
	int nr = 0;
	char *row = NULL;
	unsigned stars = 1; /* for each row star encrease with 2 if row < nr/2 else decreaase by 2*/
	unsigned left = 0;
	unsigned right = 0;

	do
	{
		cout << "Insert odd number in intervale [3,25]: ";
		cin >> nr;
	}while (nr < 3 || nr > 25 || nr % 2 == 0);
	

	row = (char*)malloc(sizeof(char)*nr);
	for (int i = 0; i < nr; i++) /* counting rows */
	{
		//cout << "The line: " << i << " has: " << stars << " stars" << endl;
		resetRow(row, nr); /* will treat mid of row output asswell */
		/* because after reset we place a star we need to itereate for stars-1. */
		/* because we modified 2 on a time we need to itereate for (stars-1)/2. */
		for (int k = 1; k <= (stars - 1) / 2; k++)
		{
			left = nr / 2 - k;
			right = nr / 2 + k;			
			row[left] = '*';
			row[right] = '*';
		}
		printRow(row, nr);

		if (i < (nr / 2) )
		{
			stars = stars + 2;
		}
		else
		{
			stars = stars - 2;
		}
	}


}
