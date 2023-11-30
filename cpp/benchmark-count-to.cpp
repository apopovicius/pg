#include<iostream>
#include<ctime>

int main(void) {
    int num = 0;
    //std::time_t start = std::time(0);
    while(num<1000000000) num++;
    std::time_t stop = std::time(0);
    //std::cout<<"to count to 1.000.000.000 it took: "<<(stop-start)<< " seconds"<<std::endl;
    std::cout<<num<<std::endl;
    //system("pause");
    return 0;
}