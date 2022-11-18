import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { validate } from './validate';
import { notify } from './toast';
import styles from './SignUp.module.css';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    useEffect(() => {
        setErrors(validate(data, "login"))
    }, [data])

    const changeHandler = event => {
        setData({...data, [event.target.name]: event.target.value})
    }

    const focusHandler = event => {
        setTouched({...touched, [event.target.name]: true})
    }

    const submitHandler = event => {
        event.preventDefault();
        if (!Object.keys(errors).length){
            notify("You loged in successfully", "success")
        } else {
            notify("Invalid data!", "error")
            setTouched({
                email: true,
                password: true,
            })
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2>Login</h2>
                <div className={styles.formField}>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type="text" 
                        name='email' 
                        id='email'
                        value={data.email} 
                        onChange={changeHandler} 
                        onFocus={focusHandler} 
                        className={(errors.email && touched.email) ? styles.formError : styles.formInput} 
                    />
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>
                <div className={styles.formField}>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type="password" 
                        name='password' 
                        id='password'
                        value={data.password} 
                        onChange={changeHandler} 
                        onFocus={focusHandler} 
                        className={(errors.password && touched.password) ? styles.formError : styles.formInput} 
                    />
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div className={styles.formButtons}>
                    <Link to={"/signup"}>Sign Up</Link>
                    <button type='submit'>Login</button>
                </div>
                <ToastContainer />
            </form>
        </div>
    );
};

export default Login;