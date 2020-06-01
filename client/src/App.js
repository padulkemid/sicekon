import React, { useState } from 'react';
import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Home, Info, Check, Map, LoginRegister } from './pages';
import { Logo, MenuBar } from './components';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const location = useLocation();
  const [showLoginRegister, setShowLoginRegister] = useState(null);

  return (
    <div className="App">
      <MenuBar setShowLoginRegister={setShowLoginRegister} />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/info">
            <Info />
          </Route>
          <Route path="/check">
            <Check />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
        </Switch>
      </AnimatePresence>
      {showLoginRegister && (
        <LoginRegister
          showLoginRegister={showLoginRegister}
          setShowLoginRegister={setShowLoginRegister}
        />
      )}
    </div>
  );
}
