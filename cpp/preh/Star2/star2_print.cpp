#include <iostream>
using namespace std;

/* TO BE DONE - not finished
n = 5, n e [5,25], n odd
	01234
	***** 0
	** ** 1
	* * * 2
	** ** 3
	***** 4

*/

void resetRow(char row[], int nr, int row_nr);
void printRow(char row[], int nr);

void resetRow(char row[], int nr, int row_nr)
{
	for (int i = 0; i < nr; i++)
	{
		if (row_nr % 2 != 0 && i == nr /2 )
		{
			row[i] = ' ';
		}
		else
		{
			row[i] = '*';
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
	unsigned spaces = 0; /* for each row star encrease with 2 if row < nr/2 else decreaase by 2*/
	unsigned left = 0;
	unsigned right = 0;

	do
	{
		cout << "Insert number in intervale [5,25]: ";
		cin >> nr;
	} while (nr < 5 || nr > 25 && nr % 2 == 0);


	row = (char*)malloc(sizeof(char)*nr);
	resetRow(row, nr, 0);
	printRow(row, nr);
	for (int i = 1; i < nr-1; i++) /* counting rows */
	{		
		if (i < (nr / 2))
		{
			spaces = i;
		}
		else
		{
			spaces = i; /* ???? */
		}
		cout << "The line: " << i << " has: " << spaces << " spaces" << endl;
		resetRow(row, nr, i); /* will treat mid of row output asswell */
		/* because after reset we place a star we need to itereate for stars-1. */
		/* because we modified 2 on a time we need to itereate for (stars-1)/2. */
		/*for (int k = 1; k <= (stars - 1) / 2; k++)
		{
			left = nr / 2 - k;
			right = nr / 2 + k;
			row[left] = ' ';
			row[right] = ' ';
		}*/
		printRow(row, nr);		
	}
	resetRow(row, nr, nr);
	printRow(row, nr);

}
