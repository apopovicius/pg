/*
Task description
A binary gap within a positive integer N is any maximal sequence of consecutive zeros that is surrounded by ones at both ends in the binary representation of N.

For example, number 9 has binary representation 1001 and contains a binary gap of length 2. The number 529 has binary representation 1000010001 and contains two binary gaps: one of length 4 and one of length 3. The number 20 has binary representation 10100 and contains one binary gap of length 1. The number 15 has binary representation 1111 and has no binary gaps.

Write a function:

int solution(int N);
that, given a positive integer N, returns the length of its longest binary gap. The function should return 0 if N doesn't contain a binary gap.

For example, given N = 1041 the function should return 5, because N has binary representation 10000010001 and so its longest binary gap is of length 5.

Assume that:

N is an integer within the range [1..2,147,483,647].
Complexity:

expected worst-case time complexity is O(log(N));
expected worst-case space complexity is O(1).
Copyright 2009–2016 by Codility Limited. All Rights Reserved. Unauthorized copying, publication or disclosure prohibited.

*/

// you can use includes, for example:
// #include <algorithm>
// you can write to stdout for debugging purposes, e.g.
// cout << "this is a debug message" << endl;
#include <vector>

int solution(int N) {
    // write your code in C++11 (g++ 4.8.2)
    std::vector<int> binary;
    int count = 0;
    int r = 0;
    do
	{
		binary.push_back(N % 2);
		N = N / 2;
	} while (N != 0);

    int len = binary.size();
    bool limit = false;
    int pos = 0;

    for (int i = 1; i< len; i++)
	{
		if (binary[i] == 0 && binary[i - 1] == 1)
		{
			pos = 0;
			count = 1;
			for (int j = i + 1; j < len; j++)
			{
				if (binary[j] == 0)
				{
					count++;
					continue;
				}
				if (binary[j] == 1)
				{
					limit = true;
					pos = j;
					break;
				}
			}

			i = pos;
			if (!limit)
			{
				count = 0;
			}
		}
		else
		{
			continue;
		}
		r = std::max(r, count);
	}
    return r;
}