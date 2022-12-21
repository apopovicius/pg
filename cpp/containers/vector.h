//
// Created by Andrei on 7/27/2021.
//

#ifndef CONTAINERS_CPP_VECTOR_H
#define CONTAINERS_CPP_VECTOR_H


#include <algorithm>
#include <vector>

bool isOdd(int& i) {
    return (i%2 == 1);
}

void play_with_vector()
{
    std::vector<int> v = { 7, 5, 16, 8 };
    v.push_back(25);
    v.push_back(13);

    v.insert(v.begin(), 200);
    int arr[] = { 501,502,503 };
    v.insert(v.begin(), arr, arr+3);
    v.erase(v.begin());

    for (auto iter = v.begin(); iter != v.end();)
        if (*iter % 2 == 1) iter = v.erase(iter);
        else ++iter;

    v.erase(remove_if(v.begin(), v.end(), isOdd), v.end());
    v.erase(remove_if(v.begin(), v.end(), [](int& i){ return (i%2 == 1); }), v.end());

    std::cout << "Size: " << v.size() << " - capacity: " << v.capacity() << "\n";
    std::vector<int> empty;
    std::cout << "Size: " << empty.size() << " - capacity: " << empty.capacity() << "\n";
    empty.reserve(5);
    empty.insert(empty.begin(), 100);
    std::cout << "Size: " << empty.size() << " - capacity: " << empty.capacity() << "\n";
    empty.clear();
    std::cout << "Size: " << empty.size() << " - capacity: " << empty.capacity() << "\n";

    for (int n : v) std::cout << n << " ";

    std::vector<std::string> words;
    //adds an element to the end
    words.push_back("push_back"); // copies
    std::vector<std::string> words2;

    words2.push_back(std::string("push_back")); // moves
    std::vector<std::string> words3;

    //constructs an element in-place at the end
    words3.emplace_back("emplace_back");

}


#endif //CONTAINERS_CPP_VECTOR_H
