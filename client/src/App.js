import React from 'react';
import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Home, Info, Symptom, LoginRegister } from './pages';
import { Logo, MenuBar } from './components';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const location = useLocation();
  return (
    <div className="App">
      <MenuBar />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/info">
            <Info />
          </Route>
          <Route path="/symptom">
            <Symptom />
          </Route>
          <Route path="/login">
            <LoginRegister />
          </Route>
          <Route path="/register">
            <LoginRegister />
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}
