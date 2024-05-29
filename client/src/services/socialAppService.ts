import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {SignUpRequestBody} from "../types/SignUpRequestBody.ts";
import {SignInRequestBody} from "../types/SignInRequestBody.ts";
import {AuthResponse} from "../types/AuthResponse.ts";
import {User} from "../types/User.ts";
import {Message} from "../types/Message.ts";
import {FriendsDTO} from "../types/FriendsDTO.ts";

export const socialAppApi = createApi({
    reducerPath: "socialAppApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/",
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        }
    }),
    endpoints: (builder) => ({
        signUp: builder.mutation<AuthResponse, SignUpRequestBody>({
            query: ({nickName, userName, password}) => ({
                url: "api/v1/auth/sign-up",
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
                url: "api/v1/auth/sign-in",
                method: "POST",
                body: {
                    username: userName,
                    password
                }
            })
        }),
        subscribe: builder.mutation<string, FriendsDTO>({
            query: (dto: FriendsDTO) => ({
                url: `api/v1/user/subscribe/${dto.username}`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${dto.token}`
                }
            })
        }),
        unsubscribe: builder.mutation<string, FriendsDTO>({
            query: (dto: FriendsDTO) => ({
                url: `api/v1/user/unsubscribe/${dto.username}`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${dto.token}`
                }
            })
        }),
        getSubscribers: builder.query<User[], FriendsDTO>({
            query: (dto: FriendsDTO) => ({
                url: `api/v1/user/subscribers/${dto.username}`,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${dto.token}`
                }
            })
        }),
        getFriends: builder.query<User[], FriendsDTO>({
            query: (dto: FriendsDTO) => ({
                url: `api/v1/user/friends/${dto.username}`,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${dto.token}`
                }
            })
        }),
        getSubscriptions: builder.query<User[], FriendsDTO>({
           query: (dto: FriendsDTO) => ({
               url: `api/v1/user/subscriptions/${dto.username}`,
               method: "GET",
               headers: {
                   'Authorization': `Bearer ${dto.token}`
               }
           })
        }),
        getUserInfo: builder.query<User, string>({
            query: (token) => ({
                url: "api/v1/user/my-info",
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
        getAllUsers: builder.query<User[], string>({
            query: (token) => ({
                url: "api/v1/user/all",
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
        getChatHistory: builder.query<Message[], Pick<Message, "senderUsername" | "recipientUsername"> & AuthResponse>({
            query: ({senderUsername, recipientUsername, token}) => ({
                url: `/messages/${senderUsername}/${recipientUsername}`,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
    })
})
export const {
    useSignUpMutation,
    useSingInMutation,
    useSubscribeMutation,
    useUnsubscribeMutation,
    useGetSubscribersQuery,
    useGetSubscriptionsQuery,
    useGetFriendsQuery,
    useGetUserInfoQuery,
    useGetAllUsersQuery,
    useGetChatHistoryQuery
} = socialAppApi