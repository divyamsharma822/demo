import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { add } from "../redux/reducers/historySlice";

const staggeredBaseQuery = async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
        baseUrl: "https://api.daybestgroup.com/admin",
        // baseUrl: "http://testingkisaanstation-env.eba-uezt4kgq.ap-south-1.elasticbeanstalk.com/admin",
        prepareHeaders: () => {
            const token = window.sessionStorage.getItem("JWT");
            const myHeaders = new Headers();

            if (token) {
                myHeaders.append("Authorization", `Bearer ` + token);
                myHeaders.append("Application", "application/json");
            }

            return myHeaders;
        },
    })(args, api, extraOptions);

    if (result.error?.status === 401) {
        window.location.href = "/?warning=SessionExpired";
    }

    return result;
};

export const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: staggeredBaseQuery,
    keepUnusedDataFor: 240,
    tagTypes: ["News"],
    endpoints: (builder) => ({
        getNewsList: builder.query({
            query: (type) => `/news/${type}`,
            providesTags: ["News"],
        }),
        createNews: builder.mutation({
            query: (formdata) => ({
                url: "/news/create",
                method: "POST",
                body: formdata,
            }),
            invalidatesTags: ["News"],
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                // const patchResult = dispatch(
                //     add({
                //         title: body.title ? body.title : "No Title Available",
                //         time: Date.now(),
                //         changes: "created",
                //     })
                // );
                // queryFulfilled.catch(patchResult.undo);
                try {
                    await queryFulfilled;
                    dispatch(
                        add({
                            title: body.title
                                ? body.title
                                : "No Title Available",
                            time: Date.now(),
                            changes: "created",
                        })
                    );
                } catch (err) {
                    // `onError` side-effect
                    // dispatch(messageCreated('Error fetching post!'))
                }
            },
        }),
        editPost: builder.mutation({
            query: (formdata) => {
                return {
                    url: `/news/edit/`,
                    method: "PUT",
                    body: formdata,
                };
            },
            invalidatesTags: ["News"],
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(
                            add({
                                title: body.title
                                    ? body.title
                                    : "No Title Available",
                                time: Date.now(),
                                changes: "edited",
                            })
                        );
                    }
                } catch (err) {}
            },
        }),
        delPost: builder.mutation({
            query: (postId) => ({
                url: `/news/delete/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["News"],
        }),
        publishPost: builder.mutation({
            query: (status) => ({
                url: `/news/publishThrough/${status}`,
                method: "PUT",
            }),
            invalidatesTags: ["News"],
        }),
        saveToDraftThroughCreate: builder.mutation({
            query: ({ DraftThrough, ...rest }) => ({
                url: `/news/saveToDraft/${DraftThrough}`,
                method: "POST",
                body: rest,
            }),
            invalidatesTags: ["News"],
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                // const patchResult = dispatch(
                //     add({
                //         title: body.title ? body.title : "No Title Available",
                //         time: Date.now(),
                //         changes: "created",
                //     })
                // );
                // queryFulfilled.catch(patchResult.undo);
                try {
                    await queryFulfilled;
                    dispatch(
                        add({
                            title: body.title
                                ? body.title
                                : "No Title Available",
                            time: Date.now(),
                            changes: "saved to draft",
                        })
                    );
                } catch (err) {
                    // `onError` side-effect
                    // dispatch(messageCreated('Error fetching post!'))
                }
            },
        }),
    }),
});

export const {
    useGetNewsListQuery,
    useCreateNewsMutation,
    useEditPostMutation,
    useDelPostMutation,
    useSaveToDraftThroughCreateMutation,
} = newsApi;
