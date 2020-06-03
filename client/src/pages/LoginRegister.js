import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/LoginRegister.scss';
import Button from '@material-ui/core/Button';
import { PasswordInput, GenderInput, TextInput } from '../components';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER, LOGIN, SET_USER_DATA } from '../schema';

export default function ({ setShowLoginRegister, showLoginRegister }) {
  const pageTransition = {
    init: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {},
  };

  const [register] = useMutation(REGISTER);
  const registerUser = async (input) => {
    try {
      const result = await register({
        variables: {
          input,
        },
      });
      if (result.data.register.result === 'Successfully created new user!')
        handleClick('login');
    } catch (error) {
      console.log(error);
    }
  };

  const [login] = useMutation(LOGIN);
  const loginUser = async (input) => {
    try {
      const result = await login({
        variables: {
          input,
        },
      });
      if (result.data.login) SetUserData(result.data.login);
    } catch (error) {
      console.log(error);
    }
  };

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

  const [values, setValues] = useState({
    email: '',
    password: '',
    age: '',
    sex: '',
    username: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClick = (prop) => {
    const { email, password, sex, age, username } = values;
    switch (prop) {
      case 'register':
        registerUser({ email, password, sex, age: Number(age), username });
        break;
      case 'login':
        loginUser({ email, password });
        break;
      default:
        break;
    }
  };

  return (
    <motion.div
      initial="init"
      animate="in"
      exit="out"
      variants={pageTransition}
      className="login-outer-container"
      onClick={() => {
        setShowLoginRegister(null);
      }}>
      <div
        className="login-container"
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div className="login-panel">
          {showLoginRegister === 'login' && (
            <div className="content login">
              <form className="login-form" noValidate autoComplete="off">
                <TextInput
                  label="Email"
                  onChange={handleChange('email')}
                  value={values.email}
                />
                <PasswordInput onChange={handleChange('password')} />
                <Button
                  onClick={() => {
                    handleClick('login');
                  }}
                  value={values.login}
                  className="btn"
                  variant="outlined"
                  color="primary"
                  disabled={!values.email || !values.password}>
                  Login
                </Button>
                <p>
                  Don't have an account?{' '}
                  <p
                    className="link"
                    onClick={() => {
                      setShowLoginRegister('register');
                    }}>
                    Register
                  </p>
                </p>
              </form>
            </div>
          )}
          {showLoginRegister === 'register' && (
            <div className="content register">
              <form className="register-form" noValidate autoComplete="off">
                <TextInput
                  label="Email"
                  onChange={handleChange('email')}
                  value={values.email}
                />
                <TextInput
                  label="Username"
                  onChange={handleChange('username')}
                  value={values.username}
                />
                <PasswordInput onChange={handleChange('password')} />
                <TextInput
                  label="Age"
                  onChange={handleChange('age')}
                  isAge={true}
                  value={values.age}
                />
                <GenderInput
                  onChange={handleChange('sex')}
                  value={values.sex}
                />
                <Button
                  onClick={() => {
                    handleClick('register');
                  }}
                  className="btn"
                  variant="outlined"
                  color="primary"
                  disabled={
                    !values.email ||
                    !values.username ||
                    !values.password ||
                    !values.age ||
                    !values.sex
                  }>
                  Register
                </Button>
                <p>
                  Already have an account?{' '}
                  <p
                    className="link"
                    onClick={() => {
                      setShowLoginRegister('login');
                    }}>
                    Login
                  </p>
                </p>
              </form>
            </div>
          )}
          <img
            className="closebtn"
            alt="Close"
            src={require('../assets/xmarks.svg')}
            onClick={() => {
              setShowLoginRegister(null);
            }}
          />
        </div>
        <div className="side-panel">
          <img
            className="content"
            alt="Close"
            src={require('../assets/heartwhite.png')}
          />
        </div>
      </div>
    </motion.div>
  );
}
