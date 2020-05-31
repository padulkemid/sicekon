import React from 'react'
import {useHistory} from 'react-router-dom'
import logo from '../assets/logo.png'
import doc from '../assets/doc.png'

export default function Logo() {
    const history = useHistory()

    function isHome() {
        history.push("/")
    }
    return (
        <>
            <img src={logo} alt="logo" style={{width: "17.18%", top: "2.73%", left: "1.4%", position: 'absolute'}} onClick={isHome}/>
            <img src={doc} alt="doc" style={{width:"10.78%", left: "25.39%", top: "25%",position: "absolute"}} />
        </>
    )
}