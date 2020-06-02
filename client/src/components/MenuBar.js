import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/MenuBar.scss'

export default ({ setShowLoginRegister }) => {
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
                <div className="btn menubtn" onClick={() => { setShowLoginRegister('login') }}>
                    <p className="menutext">Login</p>
                </div>
                <div className="btn menubtn" onClick={() => { setShowLoginRegister('register') }}>
                    <p className="menutext">Register</p>
                </div>
            </div>
        </div>
    )
}