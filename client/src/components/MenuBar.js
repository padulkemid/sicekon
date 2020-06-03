import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import '../styles/MenuBar.scss'
import { GET_USER_DATA } from "../schema";
import Avatar from '@material-ui/core/Avatar';

export default ({ showLoginRegister, setShowLoginRegister, showUser, setShowUser }) => {

    const { data } = useQuery(GET_USER_DATA);
    useEffect(() => {
        if (data && data.userData);
    }, [data])

    return (
        <div className="menu-bar">
            <div className="left bar">
                <Link to="/" className="logobtn">
                    <img className="logo" alt="sicekon" src={require("../assets/heart.png")} />
                    <div className="title-container">
                        <p className="title">Si Cekon</p>
                        <p className="subtitle">Symptom Check Online</p>
                    </div>
                </Link>
                <Link to="/check" className="btn menubtn">
                    <p className="menutext">Check</p>
                </Link>
                <Link to="/map" className="btn menubtn">
                    <p className="menutext">Map</p>
                </Link>
                <Link to="/info" className="btn menubtn">
                    <p className="menutext">Info</p>
                </Link>
            </div>
            <div className="right bar">
                {(!data || !data.userData) &&
                    <>
                        <div className="btn menubtn" onClick={() => { showLoginRegister === 'login' ? setShowLoginRegister(null) : setShowLoginRegister('login') }}>
                            <p className="menutext">Login</p>
                        </div>
                        <div className="btn menubtn" onClick={() => { showLoginRegister === 'register' ? setShowLoginRegister(null) : setShowLoginRegister('register') }}>
                            <p className="menutext">Register</p>
                        </div>
                    </>
                }

                {data && data.userData &&
                    <>
                        <Avatar className="avatar" title={data.userData.username} onClick={() => { showUser ? setShowUser(null) : setShowUser('user') }}>{data.userData.username[0].toUpperCase()}</Avatar>
                    </>
                }
            </div>
        </div>
    )
}