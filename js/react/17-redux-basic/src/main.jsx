import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AppReduxToolKit from './AppReduxToolKit.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/indexReduxToolkit.jsx'
//import store from './store/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <AppReduxToolKit />
  </React.StrictMode>
  </Provider>
)
