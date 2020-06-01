import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/LoginRegister.scss";
import Button from '@material-ui/core/Button';
import { PasswordInput, GenderInput, TextInput } from '../components';

export default function ({ setShowLoginRegister, showLoginRegister }) {
    const pageTransition = {
        init: {
            opacity: 0
        },
        in: {
            opacity: 1
        },
        out: {
        },
    };

    const [values, setValues] = useState({
        email: '',
        password: '',
        age: 0,
        gender: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values);
    };

    return (
        <motion.div initial="init" animate="in" exit="out" variants={pageTransition} className='login-outer-container' onClick={() => { setShowLoginRegister(null) }}>
            <div className="login-container" onClick={(e) => { e.stopPropagation() }}>
                <div className="login-panel">
                    {showLoginRegister == 'login' && <div className="content login">
                        <form className="login-form" noValidate autoComplete="off">
                            <TextInput label="Email" onChange={handleChange('email')} />
                            <PasswordInput onChange={handleChange('password')} />
                            <Button className="btn" variant="outlined" color="primary">
                                Login
                            </Button>
                            <p>Don't have an account? <a className="link" onClick={() => { setShowLoginRegister('register') }}>Register</a></p>
                        </form>
                    </div>}
                    {showLoginRegister == 'register' && <div className="content register">
                        <form className="register-form" noValidate autoComplete="off">
                            <TextInput label="Email" onChange={handleChange('email')} />
                            <PasswordInput onChange={handleChange('password')} />
                            <TextInput label="Age" onChange={handleChange('age')} isAge={true} />
                            <GenderInput onChange={handleChange('gender')} />
                            <Button className="btn" variant="outlined" color="primary">
                                Register
                            </Button>
                            <p>Already have an account? <a className="link" onClick={() => { setShowLoginRegister('login') }}>Login</a></p>
                        </form>
                    </div>}
                    <img className="closebtn" src={require('../assets/xmarks.svg')} onClick={() => { setShowLoginRegister(null) }} />
                </div>
                <div className="side-panel">
                    <img className="content" src={require('../assets/heartwhite.png')} />
                </div>
            </div>
        </motion.div>
    );
}
