import React, {useState} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../hooks/redux.ts";
import {useSignUpMutation} from "../services/socialAppService.ts";
import {AuthResponse} from "../types/AuthResponse.ts";
import {setAuthType} from "../store/slices/authSlice.ts";
import {AuthType} from "../types/AuthType.ts";
import {CircularProgress} from "@mui/material";
import styles from '../pagesStyles/RegistrationPage.module.css'
import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../router/routes.tsx";
import registrationPageImg from '../imges/11668720_20945740.svg';
import {AuthError} from "../types/AuthError.ts";
import {CustomError} from "../types/CustomError.ts";
interface RegistrationFormValues {
    nickName: string;
    userName: string;
    password: string;
    registrationError: string;
}
const RegistrationPage: React.FC = () => {
    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<RegistrationFormValues>({
        defaultValues: {
            nickName: "",
            userName: "",
            password: "",
            registrationError: ""
        }
    });
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [signUp, {isLoading}] = useSignUpMutation()
    const [registrationError, setRegistrationError] = useState<AuthError>({
        isError: false,
        message: ""
    })
    const confirmRegistration: SubmitHandler<RegistrationFormValues> = async ({nickName, userName, password}): Promise<void> => {
        try {
            const response: AuthResponse = await signUp({
                nickName,
                userName,
                password
            }).unwrap()
            localStorage.setItem("token", response.token)
            dispatch(setAuthType(AuthType.REGISTRATION))
            navigate(RouteNames.HOME)
        } catch(e) {
            const errorData = e as CustomError
            setRegistrationError({
                isError: true,
                message: errorData.data.message
            })
        }
    };
    return (
        <div className={styles.registrationPageLayout}>
            <div className={styles.loginPageImg}>
                <img src={registrationPageImg}/>
            </div>
            <div className={styles.registrationContainer}>
                <form onSubmit={handleSubmit(confirmRegistration)}>
                    <h2 className={styles.title}>Create<br/> your account</h2>
                    <div className={styles.inputGroup}>
                        <Controller
                            name="nickName"
                            control={control}
                            render={({field}) => (
                                <input
                                    type="text"
                                    autoComplete="off"
                                    {...field}
                                    className={`${styles.defaultInput} ${field.value ? styles.activeInput : ''} ${errors.nickName ? styles.errorInput : ''}`}
                                />
                            )}
                            rules={{
                                required: "Nickname is required",
                                minLength: {
                                    value: 3,
                                    message: "The nickname must contain at least 3 characters"
                                },
                                maxLength: {
                                    value: 16,
                                    message: "The nickname must not exceed 16 characters"
                                }
                            }}
                        />
                        <label htmlFor="">{errors.nickName ? errors.nickName.message : "Nickname"}</label>
                    </div>
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
                            control={control}
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
                    <button>{isLoading ? <CircularProgress size={20} color={"inherit"}/> : "Sign up"}</button>
                    {
                        registrationError.isError &&
                        <div className={styles.registrationError}>
                            {registrationError.message}
                        </div>
                    }
                    <span className={styles.accountInfo}>Already have an account? <Link
                        to={"/login"}>Sign in</Link></span>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;