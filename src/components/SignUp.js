import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { validate } from './validate';
import { notify } from './toast';
import styles from './SignUp.module.css';

const SignUp = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAccepted: false
    })
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    useEffect(() => {
        setErrors(validate(data, "signup"))
    }, [data])

    const changeHandler = event => {
        if (event.target.name === 'isAccepted'){
            setData({...data, [event.target.name]: event.target.checked})
        } else {
            setData({...data, [event.target.name]: event.target.value})
        }
    }

    const focusHandler = event => {
        setTouched({...touched, [event.target.name]: true})
    }

    const submitHandler = event => {
        event.preventDefault();
        if (!Object.keys(errors).length){
            notify("You signed in successfully", "success")
        } else {
            notify("Invalid data!", "error")
            setTouched({
                name: true,
                email: true,
                password: true,
                confirmPassword: true,
                isAccepted: true
            })
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2>SignUp</h2>
                <div className={styles.formField}>
                    <label htmlFor='name'>Name</label>
                    <input 
                        type="text" 
                        name='name' 
                        id='name'
                        value={data.name} 
                        onChange={changeHandler} 
                        onFocus={focusHandler}
                        className={(errors.name && touched.name) ? styles.formError : styles.formInput} 
                    />
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
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
                <div className={styles.formField}>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input 
                        type="password" 
                        name='confirmPassword' 
                        id='confirmPassword'
                        value={data.confirmPassword} 
                        onChange={changeHandler} 
                        onFocus={focusHandler} 
                        className={(errors.confirmPassword && touched.confirmPassword) ? styles.formError : styles.formInput} 
                    />
                    {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                <div className={styles.formField}>
                    <div className={styles.checkboxContainer}>
                        <label htmlFor='isAccepted'>I accept terms of privacy policy</label>
                        <input 
                            type="checkbox" 
                            name='isAccepted' 
                            id='isAccepted'
                            value={data.isAccepted} 
                            onChange={changeHandler} 
                            onFocus={focusHandler} 
                        />
                    </div>
                    {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
                </div>
                <div className={styles.formButtons}>
                    <Link to={'/login'}>Login</Link>
                    <button type='submit'>Sign Up</button>
                </div>
                <ToastContainer />
            </form>
        </div>
    );
};

export default SignUp;