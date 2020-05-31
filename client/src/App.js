import React from 'react';
import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Home, Info, Symptom } from './pages';
import { Logo } from './components';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Logo />
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
        </Switch>
      </AnimatePresence>
    </div>
  );
}
