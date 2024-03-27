import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../hooks/redux.ts";
import {useSingInMutation} from "../services/socialAppService.ts";
import {AuthResponse} from "../types/AuthResponse.ts";
import {setAuthType} from "../store/slices/authSlice.ts";
import {AuthType} from "../types/AuthType.ts";
import {CircularProgress} from "@mui/material";
import styles from '../pagesStyles/LoginPage.module.css'
import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../router/routes.tsx";
import loginPageImg from '../imges/11668720_20945740.svg';
interface LoginFormValues {
    userName: string;
    password: string;
    loginError: string;
}
const LoginPage: React.FC = () => {
    const {
        handleSubmit,
        formState: { errors },
        setError,
        control
    } = useForm<LoginFormValues>({
        defaultValues: {
            userName: "",
            password: "",
            loginError: ""
        }
    });
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [signIn, {isLoading}] = useSingInMutation()
    const confirmLogin: SubmitHandler<LoginFormValues> = async ({userName, password}): Promise<void> => {
        try {
            const response: AuthResponse = await signIn({
                userName,
                password
            }).unwrap()
            console.log(response)
            dispatch(setAuthType(AuthType.LOGIN))
            navigate(RouteNames.HOME)
        } catch (e) {
            setError("loginError", {
                type: "manual",
                message: "Login error"
            })
        }
    }
    return (
        <div className={styles.loginPageLayout}>
            <div className={styles.loginPageImg}>
                <img src={loginPageImg}/>
            </div>
            <div className={styles.loginContainer}>
                <form onSubmit={handleSubmit(confirmLogin)}>
                    <h2 className={styles.title}>Login into <br/> your account</h2>
                    <div className={styles.inputGroup}>
                        <Controller
                            name="userName"
                            control={control}
                            render={({field}) => (
                                <input
                                    type="text"
                                    autoComplete="off"
                                    {...field}
                                    className={`${styles.defaultInput} ${field.value ? styles.activeInput : ''} ${errors.userName ? styles.errorInput : ''}`}
                                />
                            )}
                            rules={{
                                required: "Username is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9_-]+$/,
                                    message: "Invalid characters in username"
                                },
                                minLength: {
                                    value: 3,
                                    message: "The username must contain at least 3 characters"
                                },
                                maxLength: {
                                    value: 16,
                                    message: "The username must not exceed 16 characters"
                                }
                            }}
                        />
                        <label htmlFor="">{errors.userName ? errors.userName.message : "Username"}</label>
                    </div>
                    <div className={styles.inputGroup}>
                        <Controller
                            name="password"
                            control={control} defaultValue=""
                            render={({field}) => (
                                <input
                                    type="password"
                                    autoComplete="off"
                                    {...field}
                                    className={`${styles.defaultInput} ${field.value ? styles.activeInput : ''} ${errors.password ? styles.errorInput : ''}`}
                                />
                            )}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "The password must contain at least 8 characters",
                                },
                                maxLength: {
                                    value: 16,
                                    message: "The password must not exceed 16 characters",
                                },
                            }}
                        />
                        <label htmlFor="">{errors.password ? errors.password.message : "Password"}</label>
                    </div>
                    <button>{isLoading ? <CircularProgress size={20} color={"inherit"}/> : "Sign in"}</button>
                    {
                        errors.loginError &&
                        <div className={styles.loginError}>
                            {errors.loginError.message}
                        </div>
                    }
                    <span className={styles.accountInfo}>Don't have an account? <Link to={"/registration"}>Sign up</Link></span>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;