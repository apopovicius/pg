//
// Created by Andrei on 7/21/2021.
//

#ifndef SMARTPOINTERS_WEAK_PTR_H
#define SMARTPOINTERS_WEAK_PTR_H

#include<memory>
#include "Entity.h"

void test_weak_ptr() {
    std::cout << "weak_ptr_test: \n";
    std::shared_ptr<Entity> entity1;
    {
        std::cout << "RefCount before make_shared: " << entity1.use_count() << "\n";
        std::shared_ptr<Entity> entity2 = std::make_shared<Entity>(2);
        entity1 = entity2;
        std::weak_ptr<Entity> weak = entity2;
        std::cout << "RefCount after creating weak_ptr: " << entity1.use_count() << "\n";
        auto sp = weak.lock();
        std::cout << "RefCount after creating a new share_ptr from weak_ptr : " << entity1.use_count() << "\n";
    }
    std::cout << "RefCount after end of above scope: " << entity1.use_count() << "\n";
}
#endif //SMARTPOINTERS_WEAK_PTR_H
