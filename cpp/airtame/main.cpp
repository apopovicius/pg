#include <iostream>
#include <thread>
#include <chrono>
#include <vector>
#include "solution.h"
#include "timer.h"

#define SECONDS 5

int main()
{

    /*std::thread timer([](){
                std::cout << "Starting timer" << std::endl;
                int i = 0;
                std::this_thread::sleep_for(std::chrono::seconds(1));
                i++;
                if(shutdown)
                {
                    throw std::logic_error("thread stopped");
                }
                if (i == SECONDS)
                {
                    shutdown = true;
                }
            }
    );*/

    unsigned int num_cpus = std::thread::hardware_concurrency();
    std::cout << "Number of cpus: " << num_cpus << std::endl;
    std::vector<std::thread> threadPoolProd;
    std::vector<std::thread> threadPoolCons;


//    Timer t = Timer();
//    t.setTimeout([&]() {
//        std::cout << "shutdown in progress" << std::endl;
//        t.stop();
//        shutdown = true;
//    }, 10000);


    for (unsigned i=0; i<num_cpus; i++)
    {
        threadPoolProd.emplace_back(std::thread(consumer));
        threadPoolCons.emplace_back(std::thread(producer));
    }


    //timer.join();

    for (unsigned i=0; i<num_cpus/2; i++)
    {
        threadPoolProd.at(i).join();
        threadPoolCons.at(i).join();
    }


    return 0;
}
