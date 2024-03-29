import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {SignUpRequestBody} from "../types/SignUpRequestBody.ts";
import {SignInRequestBody} from "../types/SignInRequestBody.ts";
import {AuthResponse} from "../types/AuthResponse.ts";

export const socialAppApi = createApi({
    reducerPath: "socialAppApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1/auth/",
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        }
    }),
    endpoints: (builder) => ({
        signUp: builder.mutation<AuthResponse, SignUpRequestBody>({
            query: ({nickName, userName, password}) => ({
                url: "sign-up",
                method: "POST",
                body: {
                    nickname: nickName,
                    username: userName,
                    password
                }
            })
        }),
        singIn: builder.mutation<AuthResponse, SignInRequestBody>({
            query: ({userName, password}) => ({
                url: "sign-in",
                method: "POST",
                body: {
                    username: userName,
                    password
                }
            })
        })
    })
})
export const {useSignUpMutation, useSingInMutation} = socialAppApi