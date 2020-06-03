import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/Loading.scss';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Home, Check, Map, LoginRegister, UserMenu, Chatbot } from './pages';
import { MenuBar } from './components';
import { AnimatePresence } from 'framer-motion';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import { SET_USER_DATA } from './schema';

export default function App() {
  const location = useLocation();
  const [showLoginRegister, setShowLoginRegister] = useState(null);
  const [showUser, setShowUser] = useState(null);
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#e34b4b',
      },
    },
  });

  const [setUserData] = useMutation(SET_USER_DATA);
  const SetUserData = async (userData) => {
    try {
      await setUserData({
        variables: {
          userData,
        },
      });
      setShowLoginRegister(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      SetUserData(JSON.parse(localStorage.getItem('userData')));
    }
  }, []);

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <MenuBar
          showLoginRegister={showLoginRegister}
          setShowLoginRegister={setShowLoginRegister}
          showUser={showUser}
          setShowUser={setShowUser}
        />
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/check">
              <Check />
            </Route>
            <Route path="/map">
              <Map />
            </Route>
            <Route path="/chatbot">
              <Chatbot />
            </Route>
          </Switch>
        </AnimatePresence>
        {showLoginRegister && (
          <LoginRegister
            showLoginRegister={showLoginRegister}
            setShowLoginRegister={setShowLoginRegister}
          />
        )}
        {showUser && <UserMenu showUser={showUser} setShowUser={setShowUser} />}
      </MuiThemeProvider>
    </div>
  );
}
