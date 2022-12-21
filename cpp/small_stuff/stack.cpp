#include <iostream>
#include <cassert>

using namespace std;

class Stack
{

private:
	int array[10];
	int lenght;

public:
	Stack()
	{
		cout << "Stack()" << endl;
	}
	virtual ~Stack()
	{
		cout << "~Stack()" << endl;
	}
	void reset()
	{
		lenght = 0;
		//memset(array, 0, 10);
		for (int i = 0; i < 10; ++i)
			array[i] = 0;
	}
	bool push(int value)
	{
		if (lenght >= 10)
			return false;
		else
		{
			array[lenght++] = value;
			return true;
		}
	}
	int pop()
	{
		assert(lenght > 0);

		return array[--lenght];
	}

	void print()
	{
		std::cout << "( ";
		for (int i = 0; i < lenght; i++)
		{
			cout << array[i] << " ";
		}
		cout << ") " << endl;
	}

};

class MyStack : public Stack
{
public:
	MyStack()
	{
		cout << "MyStack()" << endl;
	}
	~MyStack()
	{
		cout << "~MyStack()" << endl;
	}
};

int main()
{
	/*Stack stack;
	stack.reset();

	stack.print();

	stack.push(5);
	stack.push(3);
	stack.push(8);
	stack.print();

	stack.pop();
	stack.print();

	stack.pop();
	stack.pop();

	stack.print();*/

	Stack *p = new MyStack();
	delete p;

	return 0;
}