import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from './store/indexReduxToolkit'

function AppReduxToolKit() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const inc = () => {
    dispatch(actions.inc());
  }

  const dec = () => {
    dispatch(actions.dec());
  }

  const addBy = () => {
    dispatch(actions.addBy(10));
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

export default AppReduxToolKit
