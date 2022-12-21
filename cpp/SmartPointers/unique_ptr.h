//
// Created by Andrei on 7/21/2021.
//

#ifndef SMARTPOINTERS_UNIQUE_PTR_H
#define SMARTPOINTERS_UNIQUE_PTR_H
#include<memory>
#include "Entity.h"

void test_unique_ptr() {
    std::cout << "unique_ptr_test: \n";
    std::unique_ptr<Entity> entity1(new Entity(1));
    std::unique_ptr<Entity> entity2 = std::make_unique<Entity>(2);

    //entity2.reset(new Entity(3));
    //entity2 = std::make_unique<Entity>(3);
    //auto internal_ptr = entity1.release();
    auto entity = std::move(entity2);
}
#endif //SMARTPOINTERS_UNIQUE_PTR_H
