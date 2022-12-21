//
// Created by ViciuS on 8/9/2021.
//

#ifndef AT_SOLUTION_H
#define AT_SOLUTION_H

#include<mutex>
#include<condition_variable>
#include <string>
#include <deque>
#include <fstream>

#define MB 50
#define FRAME_SIZE MB*1024*1024

#define MAX_PROD_SIZE 5

// safe and no need for x86_64 for intel or amd
// unsafe for other platforms
std::atomic <bool> shutdown = false;
std::atomic <bool> g_ready = false;

//std::mutex g_mutex_deque; // mutex to protect the dequeue
std::mutex g_mutex_cond; // mutex for the condition variable
std::condition_variable g_cv;

std::deque<unsigned char*> frames;
unsigned int max_unconsumed_frames = 0;

bool get_screen_data(void *output_buffer)
{
    std::cout << "get_screen_data" << std::endl;
    if (output_buffer == nullptr)
        return false;

    static unsigned int i = 0;
    unsigned char my_char= 'a' + i++;
    memset(output_buffer, my_char, FRAME_SIZE);
    return true;
}

void encode_and_send_screen_data(void *screen_data)
{
    std::cout << "writing in file" << std::endl;
    std::ofstream fileHandle;
    static unsigned int i = 0;
    auto name = "file" + std::to_string(i++) + ".txt";

    fileHandle.open(name);
    fileHandle << static_cast<unsigned char*> (screen_data);
    fileHandle.close();
}

void producer()
{
    std::cout << "Producing" <<  std::endl;
    while(!shutdown)
    {
        std::unique_lock<std::mutex> ul(g_mutex_cond);
        g_cv.wait(ul, [](){return frames.size() < MAX_PROD_SIZE;});
        unsigned char* produced = new unsigned char[FRAME_SIZE+1];
        memset(produced, 0, FRAME_SIZE+1);
        g_ready = get_screen_data(produced);
        if ( g_ready )
        {
            frames.emplace_back(produced);
            if(max_unconsumed_frames <= frames.size())
                max_unconsumed_frames = frames.size();
            std::cout << "new frame stored - unconsumed frames size: " << frames.size()
                      << " - all time max of unconsumed:" << max_unconsumed_frames << std::endl;
        }
        ul.unlock();
        g_cv.notify_all();
    }
}

void consumer()
{
    std::cout << "Consuming" << std::endl;
    while(!shutdown)
    {
        std::unique_lock<std::mutex> ul(g_mutex_cond);
        g_cv.wait(ul, []() { return !frames.empty();});

        encode_and_send_screen_data(frames.front());
        frames.pop_front();
        ul.unlock();
        g_cv.notify_all();
    }
}
#endif //AIRTAME_SOLUTION_H
