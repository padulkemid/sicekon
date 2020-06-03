import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/UserMenu.scss';
import Button from '@material-ui/core/Button';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { SET_USER_DATA, LOGOUT, GET_USER_DATA } from '../schema';
import Avatar from '@material-ui/core/Avatar';

export default function ({ showUser, setShowUser }) {
  const pageTransition = {
    init: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {},
  };

  const { data } = useQuery(GET_USER_DATA);

  const [Set_User_Data] = useMutation(SET_USER_DATA);
  const setUserData = async (userData) => {
    try {
      const result = await Set_User_Data({
        variables: {
          userData,
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const [Logout] = useMutation(LOGOUT);
  const logout = async () => {
    try {
      const result = await Logout();
      if (result.data.logout.result === 'Successfully logged out!')
        setUserData(null);
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

  const handleClick = (prop) => {
    switch (prop) {
      case 'history':
        break;
      case 'logout':
        logout();
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
      className="user-outer-container"
      onClick={() => {
        setShowUser(null);
      }}>
      {data && data.userData && (
        <div
          className="user-container"
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <div className="info-panel">
            <Avatar className="avatar" title={data.userData.username}>
              {data.userData.username[0].toUpperCase()}
            </Avatar>
            <p className="username">{data.userData.username}</p>
            <p className="email">{data.userData.email}</p>
          </div>
          <hr></hr>
          <div className="btn-panel">
            <Button
              onClick={() => {
                handleClick('logout');
              }}
              value={values.login}
              className="btn"
              variant="outlined"
              color="primary">
              Logout
            </Button>
          </div>
          <img
            className="closebtn"
            alt="Close"
            src={require('../assets/xmarks.svg')}
            onClick={() => {
              setShowUser(null);
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
