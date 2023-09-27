import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: staggeredBaseQuery,
    keepUnusedDataFor: 240,
    tagTypes: ["listForApproval"],
    endpoints: (builder) => ({
        getProductList: builder.query({
            query: (currentPage) => `/list/forApproval?page=${currentPage}`,
            providesTags: ["listForApproval"],
        }),
        changeStatus: builder.mutation({
            query: (body) => {
                console.log(body);
                return {
                    url: `/changeStatus`,
                    method: "PUT",
                    body: body,
                };
            },
            invalidatesTags: ["listForApproval"],
        }),
    }),
});

export const { useGetProductListQuery, useChangeStatusMutation } = dashboardApi;
