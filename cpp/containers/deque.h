//
// Created by Andrei on 7/27/2021.
//

#ifndef CONTAINERS_DEQUE_H
#define CONTAINERS_DEQUE_H

#include <deque>
#include <algorithm>

void play_with_deque()
{
    std::deque<int> d = {7, 5, 16, 8};
    d.push_front(13);
    d.push_back(25);

    for(int n : d)
    {
        std::cout << n << '\n';
    }
}
#endif //CONTAINERS_DEQUE_HD
