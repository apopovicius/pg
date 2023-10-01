1. Why do we need to `import React from "react"` in our files?
   React is what defines JSX

2. If I were to console.log(page) in index.js, what would show up?
   A JavaScript object. React elements that describe what React should eventually add to the real DOM for us.

3. What's wrong with this code:

```
const page = (
    <h1>Hello</h1>
    <p>This is my website!</p>
)
```

We need our JSX to be nested under a single parent element. Fixed:

```
const page = (
    <div>
    <h1>Hello</h1>
    <p>This is my website!</p>
    </div>
)
```

4. What does it mean for something to be "declarative" instead of "imperative"?
   Declarative means I can tell the computer WHAT to do and expect it to handle the details.
   Imperative means I need to tell it HOW to do each step.

5. What does it mean for something to be "composable"?
   We have small pieces that we can put together to make something larger/greater than the individual pieces.

6. What is a React component?
   A function that returns React elements( javascript object containing JSX code). (UI)

7. What's wrong with this code?

```
function myComponent() {
    return (
        <small>I'm tiny text!</small>
    )
}
```

> FIX

```
function MyComponent()
```

8. What's wrong with this code?

```
function Header() {
    return (
        <header>
            <nav>
                <img src="./react-logo.png" width="40px" />
            </nav>
        </header>
    )
}

ReactDOM.render(Header(), document.getElementById("root"))
```

> FIX

```
ReactDOM.render(<Header/>, document.getElementById("root"))
```
