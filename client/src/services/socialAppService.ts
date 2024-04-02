import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {SignUpRequestBody} from "../types/SignUpRequestBody.ts";
import {SignInRequestBody} from "../types/SignInRequestBody.ts";
import {AuthResponse} from "../types/AuthResponse.ts";
import {User} from "../types/User.ts";

export const socialAppApi = createApi({
    reducerPath: "socialAppApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1",
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        }
    }),
    endpoints: (builder) => ({
        signUp: builder.mutation<AuthResponse, SignUpRequestBody>({
            query: ({nickName, userName, password}) => ({
                url: "auth/sign-up",
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
                url: "auth/sign-in",
                method: "POST",
                body: {
                    username: userName,
                    password
                }
            })
        }),
        getUserInfo: builder.query<User, string>({
            query: (token) => ({
                url: "user/my-info",
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        })
    })
})
export const {
    useSignUpMutation,
    useSingInMutation,
    useGetUserInfoQuery
} = socialAppApi