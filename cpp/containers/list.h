//
// Created by Andrei on 7/28/2021.
//

#ifndef CONTAINERS_CPP_LIST_H
#define CONTAINERS_CPP_LIST_H

#include<list>
#include<algorithm>

void play_with_list()
{
    std::list<int> l = { 7, 5, 16, 8 };

    // Add an integer to the front of the list
    l.push_front(25);
    // Add an integer to the back of the list
    l.push_back(13);

    // Insert an integer before 16 by searching
    auto it = std::find(l.begin(), l.end(), 16);
    if (it != l.end()) {
        l.insert(it, 42);
    }

    for (int n : l) {
        std::cout << n << " ";
    }
}


#endif //CONTAINERS_CPP_LIST_H
