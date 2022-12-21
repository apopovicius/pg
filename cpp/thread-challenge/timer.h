//
// Created by ViciuS on 8/9/2021.
//

#ifndef AT_TIMER_H
#define AT_TIMER_H


class Timer {
    bool clear = false;

public:

    template<typename Function>
    void setTimeout(Function  function, int delay)
    {
        this->clear = false;
        std::thread t([=]() {
            if(this->clear) throw std::logic_error("Shutting down");
            std::this_thread::sleep_for(std::chrono::milliseconds(delay));
            if(this->clear) throw std::logic_error("Shutting down");
            function();
        });
        t.detach();
    }

    template<typename Function>
    void setInterval(Function  function, int interval)
    {
        this->clear = false;
        std::thread t([=]() {
            while(true) {
                if(this->clear) throw std::logic_error("Shutting down");
                std::this_thread::sleep_for(std::chrono::milliseconds(interval));
                if(this->clear) throw std::logic_error("Shutting down");
                function();
            }
        });
        t.detach();
    }

    void stop()
    {
        this->clear = true;
    }
};


#endif //AIRTAME_TIMER_H
