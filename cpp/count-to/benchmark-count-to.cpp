#include<iostream>
#include<ctime>

int main() {
    long num = 0;
    const std::time_t start = std::time(nullptr);
    while(num<10000000000) num++;
    const std::time_t stop = std::time(nullptr);
    std::cout<<"to count to 1.000.000.000 it took: "<<(stop-start)<< " seconds"<<std::endl;
    std::cout<<num<<std::endl;
    //system("pause");
}