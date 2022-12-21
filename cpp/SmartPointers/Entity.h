//
// Created by Andrei on 7/21/2021.
//

#ifndef SMARTPOINTERS_ENTITY_H
#define SMARTPOINTERS_ENTITY_H

class Entity {
    int id;
public:
    explicit Entity(int id=0): id(id)
    {
        std::cout << "ctr() with params: " << id << "\n";
    }
    ~Entity()
    {
        std::cout << "dtr()" << "\n";
    }
};

#endif //SMARTPOINTERS_ENTITY_H
