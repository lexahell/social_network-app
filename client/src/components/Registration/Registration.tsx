import React from 'react';
import styles from './Registration.module.css';
import {HiXMark} from "react-icons/hi2";
import {useDispatch} from "react-redux";
import {setModalContent, setModalVisibility} from "../../store/slices/modalSlice.ts";
import Login from "../Login/Login.tsx";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
interface RegistrationFormValues {
    email: string;
    userName: string;
    password: string;
    registrationError: string;
}

const Registration: React.FC = () => {
    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<RegistrationFormValues>({
        defaultValues: {
            email: "",
            userName: "",
            password: "",
            registrationError: ""
        }
    });
    const dispatch = useDispatch();

    const onClose = (): void => {
        dispatch(setModalVisibility(false));
        dispatch(setModalContent(null));
    };

    const redirectToLogin = (): void => {
        dispatch(setModalContent(<Login />));
    };

    const confirmRegistration: SubmitHandler<RegistrationFormValues> = async ({email, userName, password}): Promise<void> => {
        dispatch(setModalVisibility(false))
        dispatch(setModalContent(null))
    };
    return (
        <div className={styles.registrationContainer}>
            <div className={styles.exitContainer}>
                <HiXMark size={26} onClick={onClose} />
            </div>
            <form onSubmit={handleSubmit(confirmRegistration)}>
                <h2>Registration</h2>
                <div className={styles.inputGroup}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <input type="text" autoComplete="off" {...field} className={`${styles.defaultInput} ${field.value ? styles.activeInput : ''} ${errors.email ? styles.errorInput : ''}`}/>
                        )}
                        rules={{
                            required: "Данное поле обязательно",
                            pattern: {
                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Некорректный email",
                            },
                        }}
                    />
                    <label htmlFor="">{errors.email ? errors.email.message : "Email"}</label>
                </div>
                <div className={styles.inputGroup}>
                    <Controller
                        name="userName"
                        control={control}
                        render={({ field }) => (
                            <input type="text" autoComplete="off" {...field} className={`${styles.defaultInput} ${field.value ? styles.activeInput : ''} ${errors.userName ? styles.errorInput: ''}`}/>
                        )}
                        rules={{
                            required: "Данное поле обязательно",
                        }}
                    />
                    <label htmlFor="">{errors.userName ? errors.userName.message : "Username"}</label>
                </div>
                <div className={styles.inputGroup}>
                    <Controller
                        name="password"
                        control={control}defaultValue=""
                        render={({ field }) => (
                            <input type="password" autoComplete="off" {...field} className={`${styles.defaultInput} ${field.value ? styles.activeInput : ''} ${errors.password ? styles.errorInput : ''}`}/>
                        )}
                        rules={{
                            required: "Данное поле обязательно",
                            minLength: {
                                value: 6,
                                message: "Пароль должен содержать минимум 6 символов",
                            },
                            maxLength: {
                                value: 20,
                                message: "Пароль не должен превышать 20 символов",
                            },
                        }}
                    />
                    <label htmlFor="">{errors.password ? errors.password.message : "Password"}</label>
                </div>
                <button>Sign up</button>
                {
                    errors.registrationError &&
                    <div className={styles.registrationError}>
                        {errors.registrationError.message}
                    </div>
                }
                <span className={styles.accountInfo}>Already have an account? <span onClick={redirectToLogin}>Sign in</span></span>
            </form>
        </div>
    );
};
export default Registration;