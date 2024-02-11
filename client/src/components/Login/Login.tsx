import React from 'react';
import styles from './Login.module.css'
import {HiXMark} from "react-icons/hi2";
import {useDispatch} from "react-redux";
import {setModalContent, setModalVisibility} from "../../store/slices/modalSlice.ts";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Registration from "../Registration/Registration.tsx";
interface LoginFormValues {
    email: string;
    password: string;
    loginError: string;
}
const Login : React.FC = () => {
    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
            loginError: ""
        }
    });
    const dispatch = useDispatch()
    const onClose = (): void  => {
        dispatch(setModalVisibility(false))
        dispatch(setModalContent(null))
    }
    const redirectToRegistration = (): void  => {
        dispatch(setModalContent(<Registration />))
    }
    const confirmLogin: SubmitHandler<LoginFormValues> = async ({email, password}): Promise<void> => {
        dispatch(setModalVisibility(false))
        dispatch(setModalContent(null))
    }
    return (
        <div className={styles.loginContainer}>
            <div className={styles.exitContainer}>
                <HiXMark size={26} onClick={onClose}/>
            </div>
            <form onSubmit={handleSubmit(confirmLogin)}>
                <h2>Login</h2>
                <div className={styles.inputGroup}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <input type="text" autoComplete="off" {...field} className={`${styles.defaultInput} ${field.value ? styles.activeInput : ''} ${errors.email ? styles.errorInput : ''}`}/>
                        )}
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Incorrect email",
                            },
                        }}
                    />
                    <label htmlFor="">{errors.email ? errors.email.message : "Email"}</label>
                </div>
                <div className={styles.inputGroup}>
                    <Controller
                        name="password"
                        control={control}defaultValue=""
                        render={({ field }) => (
                            <input type="password" autoComplete="off" {...field} className={`${styles.defaultInput} ${field.value ? styles.activeInput : ''} ${errors.password ? styles.errorInput : ''}`}/>
                        )}
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "The password must contain at least 8 characters",
                            },
                            maxLength: {
                                value: 15,
                                message: "The password must not exceed 15 characters",
                            },
                        }}
                    />
                    <label htmlFor="">{errors.password ? errors.password.message : "Password"}</label>
                </div>
                <button>Sign in</button>
                {
                    errors.loginError &&
                    <div className={styles.loginError}>
                        {errors.loginError.message}
                    </div>
                }
                <span className={styles.accountInfo}>Don't have an account? <span onClick={redirectToRegistration}>Sign up</span></span>
            </form>
        </div>
    );
};

export default Login;