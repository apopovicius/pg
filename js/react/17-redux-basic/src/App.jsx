import './App.css';
import {useSelector, useDispatch} from 'react-redux';

function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const inc = () => {
    dispatch({ type: "inc"});
  }

  const dec = () => {
    dispatch({ type: "dec"});
  }

  const addBy = () => {
    dispatch({type: "addBy", payload: 10});
  }
  return (
    <>
      <h1>Counter app</h1>
      <h2>{counter}</h2>
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
      <button onClick={addBy}>+10</button>
    </>
  );
}

export default App
