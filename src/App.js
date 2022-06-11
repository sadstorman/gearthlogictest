import React from 'react'
import { Provider } from 'react-redux'
import { Navigation } from './routes/Navigation';
import { store } from './store/store';
import './styles/index.css'

export const App = () => {
  return <Provider store={store}>
    <Navigation />
  </Provider>

}
