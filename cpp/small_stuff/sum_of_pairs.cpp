/*
Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
Bonus: Can you do this in one pass?
*/

#include <iostream>
#include <set>
#include <vector>


int x[] = { 10, 10, 3, 17 };
std::vector<int> y{ 10, 5, 3, 10 };

int k = 20;


bool DoesItVector()
{
	std::set<int> my_set;
	std::set<int>::iterator it;
	for (int i = 0; i < y.size(); i++)
	{
		if (my_set.find(k - y.at(i)) != my_set.end()) return true;
		my_set.insert(y.at(i));
	}
	return false;
}

bool DoesIt()
{
	std::set<int> my_set;
	std::set<int>::iterator it;
	int n = sizeof(x) / sizeof(x[0]);
	for (int i = 0; i < n; i++)
	{
		if ( my_set.find(k - x[i]) != my_set.end() ) return true;
		my_set.insert(x[i]);
	}
	return false;
}

int main(void)
{
	std::string myStr;
	DoesIt() ? myStr = "TRUE" : myStr ="FALSE" ;

	{
		using namespace std;
		cout << myStr.c_str() << endl;
	}

	DoesItVector() ? myStr = "TRUE" : myStr = "FALSE";

	{
		using namespace std;
		cout << myStr.c_str() << endl;
	}


	return 0;
}