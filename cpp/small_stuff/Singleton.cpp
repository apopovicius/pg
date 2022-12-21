class Singleton
{
public:
    static Singleton& getInstance()
    {
        // Guaranteed to be destroyed. Instantiated on first use.
        static Singleton instance;
        return instance;
    }

public:
    S(S const&) = delete;
    void operator=(S const&) = delete;
    // Note: Scott Meyers mentions in his Effective Modern C++ book,
    // that deleted functions should generally be public
    // as it results in better error messages due to the compilers behavior
    // to check accessibility before deleted status
};
