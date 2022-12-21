# Thread Challenge

Our software captures the image shown on the computer screen, encodes it, and sends it over the network. It does this at 60/frames/second. It has two independent modules, each running in their own thread:

-   a producer module which captures the data displayed on the computer screen
-   a consumer module which gets the captured screen data from the producer, encodes it, and sends it over the network

The modules need to communicate, but the data passed from producer to consumer is very large (e.g. ~16MB/frame, @60 frames/second).

Your task is to write the logic that allows the two modules to communicate. You should design and implement the component or components, that the two modules will use in order to pass the frame data from one to the other. You must also demonstrate the use of your API in a simple producer/consumer demo. Of corse, you do not need to implement anything related to image capturing or encoding. See the provided functions below.

## Requirements

1. _Independent_. The two modules run in separate threads, and must be able to run in parallel. While the consumer module is working on frame N, the producer module might be writing data to frame N+1 or N+2

2. _Decoupled_. We also want to allow the modules to run at different speeds, at least temporarly. For example, if the consumer module occasionally takes slightly more time to process a certain frame, the producer module should be able to continue producing data.

3. _Can repeat_. If there are no changes on the screen, the producer module has no new data to send (see the _get_screen_data_ function below). But assume that the consumer module is dumb and can't simply be told that there is no new data. Instead, for the consumer it must seem like the same data is eing received over and over, allowing _enconde_and_send_screen_data_ to be called with a valid image, even when the producer has nothing new. How does your API implement this efficiently?

4. _C/C++_. Please use C or C++. In C, you can use a threading library( e.g. phreads). In C++, please don't use any other libraries aprat from the standard library. Your code does not need to be cross-platform, as long as it works on one of Window, OS X, or Linux, using the compiler of your choise.

5. _Reasonable performance_. Our software does real-time streaming video data. As such, performance, and especially latency is important. Of course, the communication between the producer and consumer modules is only a small part of the entire data pipeline. We want to avoid any unnecessary inefficiency, but only up to a certain point. So we expect the code to be reasonably performant, but optimizing every single thing would be a waste of time and would make the code harder to reason about.

6. _Constant frame size_. You can assume that the frame size is a compile-time constant.

Assume the following functions exists. They must be called from the producer and consumer respectively. To keep things simple they have no way of reporting errors, and the buffer they take as an argument is assumed to always have _FRAME_SIZE_ capacity and be non-NULL.

```cpp
#define FRAME_SIZE (16*1024*1024)

/*
    This is the function that the producer must call periodically.

    If something changed on the screen since the last call,
    it fills the output_buffer with the screen contents and
    returns true.

    If there are no changes on the screen, it does not touch
    the output_buffer and returns false.

    output_buffer must not be NULL and must have space for at least
    FRAME_SIZE bytes.
*/

bool get_screen_data(void *output_buffer);

/*
    This is the function that the consumer must call.

    Note that this function must be called even for frames when
    get_screen_data return false.

    screen_data must not be NULL and is assumed to contain
    FRAME_SIZE bytes.
*/

void encode_and_send_screen_data(void *screen_data);
```

## Deliverables:

1. working code for the communication components
2. code for a binary that sets up a producer and consumer, runs them for 10 secons using your API for communication, then shuts down. It's up to you how the code is structred, as long as there is one producer thread and one consumer thread, and _get_screen_data_ and _encode_and_send_screen_data_ are called periodically. You can leafve the implementation of _get_screen_data_ and _encode_and_send_screen_data_ empty, or include code helps you in your tests.
3. A description of the choise you made while writing the code. For example, what data structures you used and why. What choises did you make related to performance? Why did you design your API the way you did, and wat alternatives did you consider? And if there is a part of your code that you are especially proud of and you want us to tkae not of it, please point it out.
