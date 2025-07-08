// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {
//   addMyInfo,
//   addSingle,
//   addToAllPost,
//   addUser,
//   deleteThePost,
// } from "./slice";

// // const SERVER_URL="http://localhost:5000";
// // const SERVER_URL = import.meta.env.REACT_APP_BACKEND_URL;
// const SERVER_URL = import.meta.env.VITE_BACKEND_URL;

// export const serviceApi = createApi({
//   reducerPath: "serviceApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${SERVER_URL}/api/`,
//     // baseUrl: "http://localhost:5000/api/",
//     credentials: "include",

//   }),
//   keepUnusedDataFor: 60 * 60 * 24 * 7,
//   tagTypes: ["Post", "User", "Me"],
//   endpoints: (builder) => ({
//     // signin: builder.mutation({
//     //   query: (data) => ({
//     //     url: "signin",
//     //     method: "POST",
//     //     body: data,
//     //   }),
//     //   invalidateTags: ["Me"],
//     // }),
//     // login: builder.mutation({
//     //   query: (data) => ({
//     //     url: "login",
//     //     method: "POST",
//     //     body: data,
//     //   }),
//     //   invalidatesTags: ["Me"],
//     // }),

//     signin: builder.mutation({
//       query: (data) => ({
//         url: "signin",  // Ensure this endpoint matches your backend
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Me"],
//     }),

//     login: builder.mutation({
//       query: (data) => ({
//         url: "login",  // Ensure this endpoint matches your backend
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Me"],
//     }),

//     myInfo: builder.query({
//       query: () => ({
//         url: "me",
//         method: "GET",
//       }),
//       providesTags: ["Me"],
//       async onQueryStarted(params, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           dispatch(addMyInfo(data));
//         } catch (err) {
//           console.log(err);
//         }
//       },
//     }),
//     logoutMe: builder.mutation({
//       query: () => ({
//         url: "logout",
//         method: "POST",
//       }),
//       invalidatesTags: ["Me"],
//     }),
//     userDetails: builder.query({
//       query: (id) => ({
//         url: `user/${id}`,
//         method: "GET",
//       }),
//       providesTags: ["User"],
//       async onQueryStarted(params, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           dispatch(addUser(data));
//         } catch (err) {
//           console.log(err);
//         }
//       },
//     }),
//     searchUsers: builder.query({
//       query: (query) => ({
//         url: `users/search/${query}`,
//         method: "GET",
//       }),
//     }),
//     followUser: builder.mutation({
//       query: (id) => ({
//         url: `user/follow/${id}`,
//         method: "PUT",
//       }),
//       invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
//     }),
//     updateProfile: builder.mutation({
//       query: (data) => ({
//         url: "update",
//         method: "PUT",
//         body: data,
//       }),
//       invalidatesTags: ["Me"],
//     }),

//     addPost: builder.mutation({
//       query: (data) => ({
//         url: `post`,
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Post"],
//       async onQueryStarted(params, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           dispatch(addSingle(data));
//         } catch (err) {
//           console.log(err);
//         }
//       },
//     }),
//     allPost: builder.query({
//       query: (page) => ({
//         url: `post?page=${page}`,
//         method: "GET",
//       }),
//       providesTags: (result) => {
//         return result
//           ? [
//               ...result.posts.map(({ _id }) => ({ type: "Post", id: _id })),
//               { type: "Post", id: "LIST" },
//             ]
//           : [{ type: "Post", id: "LIST" }];
//       },
//       async onQueryStarted(params, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           dispatch(addToAllPost(data));
//         } catch (err) {
//           console.log(err);
//         }
//       },
//     }),
//     deletePost: builder.mutation({
//       query: (id) => ({
//         url: `post/${id}`,
//         method: "DELETE",
//       }),
//       async onQueryStarted(params, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           dispatch(deleteThePost(data));
//         } catch (err) {
//           console.log(err);
//         }
//       },
//     }),
//     likePost: builder.mutation({
//       query: (id) => ({
//         url: `post/like/${id}`,
//         method: "PUT",
//       }),
//       invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
//     }),
//     singlePost: builder.query({
//       query: (id) => ({
//         url: `post/${id}`,
//         method: "GET",
//       }),
//       providesTags: (result, error, { id }) => [{ type: "Post", id }],
//     }),
//     repost: builder.mutation({
//       query: (id) => ({
//         url: `repost/${id}`,
//         method: "PUT",
//       }),
//       invalidatesTags: ["User"],
//     }),

//     addComment: builder.mutation({
//       query: ({ id, ...data }) => ({
//         url: `comment/${id}`,
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["User"],
//     }),
//     deleteComment: builder.mutation({
//       query: ({ postId, id }) => ({
//         url: `comment/${postId}/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (result, error, { postId }) => [
//         { type: "Post", id: postId },
//       ],
//     }),
//   }),
// });

// export const {
//   useSigninMutation,
//   useLoginMutation,
//   useMyInfoQuery,
//   useLogoutMeMutation,
//   useUserDetailsQuery,
//   useLazySearchUsersQuery,
//   useAllPostQuery,
//   useFollowUserMutation,
//   useAddCommentMutation,
//   useAddPostMutation,
//   useDeleteCommentMutation,
//   useDeletePostMutation,
//   useLikePostMutation,
//   useRepostMutation,
//   useSinglePostQuery,
//   useUpdateProfileMutation,
// } = serviceApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addMyInfo,
  addSingle,
  addToAllPost,
  addUser,
  deleteThePost,
} from "./slice";

// ✅ Make sure this env variable is correctly set in `.env` file as:
// VITE_BACKEND_URL=http://localhost:5000
const SERVER_URL = import.meta.env.VITE_BACKEND_URL;

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  //   baseQuery: fetchBaseQuery({
  //   baseUrl: `${SERVER_URL}/api`,
  //   credentials: "include",
  //   prepareHeaders: (headers) => {
  //     headers.set("Content-Type", "application/json");

  //     // OPTIONAL: If you're using token-based auth (with Authorization header)
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       headers.set("Authorization", `Bearer ${token}`);
  //     }

  //     return headers;
  //   },
  // }),
  baseQuery: fetchBaseQuery({
  baseUrl: `${SERVER_URL}/api`,
  credentials: "include", // ✅ for cookie-based auth
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers; // ❌ DON'T set Content-Type manually
  },
}),


  // baseQuery: fetchBaseQuery({
  //   baseUrl: `${SERVER_URL}/api`,
  //   credentials: "include", // ✅ Required for cookies (JWT)
  // }),
  keepUnusedDataFor: 60 * 60 * 24 * 7,
  tagTypes: ["Post", "User", "Me"],
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data) => ({
        url: "signin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),

    myInfo: builder.query({
      query: () => "me",
      providesTags: ["Me"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addMyInfo(data));
        } catch (err) {
          console.log("❌ myInfo fetch error:", err);
        }
      },
    }),

    logoutMe: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: ["Me"],
    }),

    userDetails: builder.query({
      query: (id) => `user/${id}`,
      providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addUser(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    searchUsers: builder.query({
      query: (query) => `users/search/${query}`,
    }),

    followUser: builder.mutation({
      query: (id) => ({
        url: `user/follow/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),

    addPost: builder.mutation({
      query: (data) => ({
        url: `post`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addSingle(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    allPost: builder.query({
      query: (page) => `post?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ _id }) => ({ type: "Post", id: _id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addToAllPost(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `post/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(deleteThePost(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    likePost: builder.mutation({
      query: (id) => ({
        url: `post/like/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),

    singlePost: builder.query({
      query: (id) => `post/${id}`,
      providesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),

    repost: builder.mutation({
      query: (id) => ({
        url: `repost/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),

    addComment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    deleteComment: builder.mutation({
      query: ({ postId, id }) => ({
        url: `comment/${postId}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
      ],
    }),
  }),
});

export const {
  useSigninMutation,
  useLoginMutation,
  useMyInfoQuery,
  useLogoutMeMutation,
  useUserDetailsQuery,
  useLazySearchUsersQuery,
  useAllPostQuery,
  useFollowUserMutation,
  useAddCommentMutation,
  useAddPostMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useRepostMutation,
  useSinglePostQuery,
  useUpdateProfileMutation,
} = serviceApi;
