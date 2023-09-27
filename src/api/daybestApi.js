import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const staggeredBaseQuery = async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
        baseUrl: "https://api3.daybestgroup.com",
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

export const daybestApi = createApi({
    reducerPath: "daybestApi",
    baseQuery: staggeredBaseQuery,
    keepUnusedDataFor: 360,
    tagTypes: ["designation-list", "employee-list", "inventory-list", "historyitem-list"],
    endpoints: (builder) => ({
        allDesignations: builder.query({
            query: ({ dept }) => `/admin/designation?department=${dept}`,
            invalidatesTags: ["designation-list"],
        }),
        allDepartments: builder.query({
            query: () => `/admin/department/`,
            providesTags: ["designation-list"],
        }),
        getAttendanceList: builder.query({
            query: ({ date, page, size }) => `/admin/attendence-list/?date=${date}&page=${page}&size=${size}`,
        }),
        getAttendanceSearch: builder.query({
            query: ({ key, date }) => {
                // console.log({ key, date });
                return {
                    url: `/admin/attendence-search/?key=${key}&date=${date}`,
                };
            },
        }),
        getEmployeeList: builder.query({
            query: ({ page, size, dept, degn }) => {
                return {
                    url: `/admin/employees-list/?page=${page}&size=${size}&dept=${dept}&degn=${degn}`,
                };
            },
            providesTags: ["employee-list"],
        }),
        getEmployeeSearch: builder.query({
            query: ({ page, size, key }) => `/admin/employees-search/?page=${page}&size=${size}&key=${key}`,
            providesTags: ["employee-list"],
        }),
        getInventoryList: builder.query({
            query: ({ page, size }) => `/admin/items-list?page=${page}&size=${size}`,
            providesTags: ["inventory-list"],
        }),
        addInventoryItem: builder.mutation({
            query: (body) => {
                // console.log(body);
                return {
                    url: `/admin/add-item`,
                    method: "POST",
                    body: body,
                };
            },
            invalidatesTags: ["inventory-list"],
        }),
        assignItem: builder.mutation({
            query: (body) => {
                return {
                    url: `/admin/assign-item/`,
                    method: "POST",
                    body: body,
                };
            },
            invalidatesTags: ["inventory-list", "historyitem-list"],
        }),
        getAssignedItemHistory: builder.query({
            query: ({ itemId, page }) => {
                console.log(itemId);
                return {
                    url: `/admin/assign-item-history?itemId=${itemId}&page=${page}&size=20`,
                };
            },
            providesTags: ["historyitem-list"],
        }),
        editEmployeeDetails: builder.mutation({
            query: (body) => {
                // console.log(body);
                return {
                    url: `/admin/edit-employee-details/`,
                    method: "PUT",
                    body: body,
                };
            },
            invalidatesTags: ["employee-list"],
        }),
        editBankDetails: builder.mutation({
            query: (body) => {
                // console.log(body);
                return {
                    url: `/admin/edit-bank-details/`,
                    method: "PUT",
                    body: body,
                };
            },
            invalidatesTags: ["employee-list"],
        }),
    }),
});

export const {
    useAllDesignationsQuery,
    useAllDepartmentsQuery,
    useGetAttendanceListQuery,
    useGetAttendanceSearchQuery,
    useGetEmployeeListQuery,
    useGetEmployeeSearchQuery,
    useGetInventoryListQuery,
    useAddInventoryItemMutation,
    useAssignItemMutation,
    useGetAssignedItemHistoryQuery,
    useEditEmployeeDetailsMutation,
    useEditBankDetailsMutation,
} = daybestApi;
