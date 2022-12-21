//
// Created by Andrei on 7/21/2021.
//

#ifndef SMARTPOINTERS_SHARED_PTR_H
#define SMARTPOINTERS_SHARED_PTR_H
#include <memory>
#include "Entity.h"
#include <iostream>


void test_shared_ptr() {
    std::cout << "shared_ptr_test: \n";
    std::shared_ptr<Entity> entity1;
    {
        std::cout << "RefCount: " << entity1.use_count() << "\n";
        std::shared_ptr<Entity> entity2 = std::make_shared<Entity>(2);
        entity1 = entity2;
        std::cout << "RefCount: " << entity1.use_count() << "\n";
    }
    std::cout << "RefCount: " << entity1.use_count() << "\n";
}

#endif //SMARTPOINTERS_SHARED_PTR_H

