import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/MenuBar.scss'

export default () => {
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
                <Link to="/check" class="btn menubtn">
                    <p class="menutext">Check</p>
                </Link>
                <Link to="/map" class="btn menubtn">
                    <p class="menutext">Map</p>
                </Link>
                <Link to="/info" class="btn menubtn">
                    <p class="menutext">Info</p>
                </Link>
            </div>
            <div className="right bar">
                <Link to="/login" class="btn menubtn">
                    <p class="menutext">Login</p>
                </Link>
                <Link to="/register" class="btn menubtn">
                    <p class="menutext">Register</p>
                </Link>
            </div>
        </div>
    )
}