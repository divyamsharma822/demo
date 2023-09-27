import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const staggeredBaseQuery = async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
        baseUrl: "https://api.daybestgroup.com/admin",
        // baseUrl:"http://testingkisaanstation-env.eba-uezt4kgq.ap-south-1.elasticbeanstalk.com/admin",
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

export const kisaanStationsApi = createApi({
    reducerPath: "kisaanStationsApi",
    baseQuery: staggeredBaseQuery,
    keepUnusedDataFor: 360,
    tagTypes: [
        "kisaanStationListForApproval",
        "serviceslist",
        "farmanalysis-allFarms",
        "farmanalysis-analysisRequests",
        "user-list",
        "croppdf",
        "userDetailsList",
        "droneorderlist",
        "sellerList",
    ],
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (body) => {
                return {
                    url: `/login`,
                    method: "POST",
                    body: body,
                };
            },
        }),
        getTotalUsers: builder.query({
            query: () => `/totalUsers`,
            providesTags: ["user-list"],
        }),
        userDetailsList: builder.query({
            query: (currentPage) => `/userDetails?page=${currentPage}&size=20`,
            providesTags: ["userDetailsList"],
        }),
        getListForApproval: builder.query({
            query: (currentPage) =>
                `/ks/requestsList/?page=${currentPage}&size=20`,
            providesTags: ["kisaanStationListForApproval"],
        }),
        getAllStations: builder.query({
            query: (currentPage) =>
                `/ks/all-stations-list?page=${currentPage}&size=20`,
            providesTags: ["kisaanStationListForApproval"],
        }),
        changeStatus: builder.mutation({
            query: (body) => {
                return {
                    url: `/ks/approvel`,
                    method: "POST",
                    body: body,
                };
            },
            invalidatesTags: ["kisaanStationListForApproval"],
        }),
        getListOfServices: builder.query({
            query: () => `/myStation/services/sellservices`,
            providesTags: ["serviceslist"],
        }),
        getDroneSprayFormData: builder.query({
            query: () =>
                `/myStation/service/getDroneSprayingDetails/6336da9218d85bdf221f8c52`,
        }),
        postDroneSprayFormData: builder.mutation({
            query: (body) => {
                console.log(body);
                return {
                    url: `/myStation/service/droneSprayingDetails`,
                    method: "POST",
                    // prepareHeaders: (headers) => {
                    //     headers.set('Access-Control-Allow-Origin','*')
                    //     return headers;
                    // },
                    body: body,
                };
            },
            invalidatesTags: ["serviceslist"],
        }),
        getMyStationServices: builder.query({
            query: ({ currentPage, status }) =>
                `/myStation/ordersList/${status}/${currentPage}/10`,
            providesTags: ["droneorderlist"],
        }),
        getOrderDetails: builder.query({
            query: ({ id }) => `/myStation/ordersListDetail?_id=${id}`,
            providesTags: ["droneorderlist"],
        }),
        getAllKS: builder.query({
            query: () => `/myStation/ks-stations-list`,
        }),
        getAllSellerPerKS: builder.query({
            query: ({ stationId }) =>
                `/myStation/list-of-sellers?stationId=${stationId}`,
        }),
        updateMyStationOrder: builder.mutation({
            query: (body) => {
                console.log(body);
                return {
                    url: `/myStation/ordersList/fill-seller-infromation`,
                    method: "POST",
                    body: body,
                };
            },
            invalidatesTags: ["droneorderlist"],
        }),
        getAllFarms: builder.query({
            query: ({ currentPage, search }) =>
                `/myFarm/active-detail/${currentPage}/10?${search}`,
            providesTags: ["farmanalysis-allFarms"],
        }),
        getAllAnalysisRequests: builder.query({
            query: (currentPage) =>
                `/myFarm/analysis-requests/${currentPage}/10`,
            providesTags: ["farmanalysis-analysisRequests"],
        }),
        postCropReport: builder.mutation({
            query: (body) => {
                console.log(body);
                return {
                    url: `/myFarm/submit-report`,
                    method: "POST",
                    body: body,
                };
            },
            invalidatesTags: ["farmanalysis-analysisRequests", "croppdf"],
        }),
        getUploadedPdf: builder.query({
            query: (obj) =>
                `/myFarm/crop-reports-list/${obj.reqUserId}/${obj.cropID}`,
            providesTags: ["croppdf"],
        }),
        sellerListandRequestList: builder.query({
            query: ({ currentPage, status, search }) =>
                `/sp/seller-list?page=${currentPage}&size=20&status=${status}&${search}`,
            providesTags: ["sellerList"],
        }),
        sellerApprovalOrActiveOrInactive: builder.mutation({
            query: (body) => {
                console.log(body);
                return {
                    url: `/sp/seller-approval`,
                    method: "POST",
                    body: body,
                };
            },
            invalidatesTags: ["sellerList"],
        }),
        sellerOrders: builder.query({
            query: ({ sellerId, currentPage }) =>
                `/sp/seller-orders-or-listings?sellerId=${sellerId}&status=Orders&page=${currentPage}&size=20`,
        }),
        sellerListings: builder.query({
            query: ({ sellerId, currentPage }) =>
                `/sp/seller-orders-or-listings?sellerId=${sellerId}&status=Listings&page=${currentPage}&size=20`,
        }),
        updateAnalysisReport: builder.mutation({
            query: (body) => {
                console.log(body);
                return {
                    url: `/myFarm/update-farm-details/`,
                    method: "POST",
                    body: body,
                };
            },
            invalidatesTags: ["sellerList"],
        }),
    }),
});

export const {
    useAdminLoginMutation,
    useGetTotalUsersQuery,
    useUserDetailsListQuery,
    useGetListForApprovalQuery,
    useGetAllStationsQuery,
    useChangeStatusMutation,
    useGetListOfServicesQuery,
    useGetDroneSprayFormDataQuery,
    usePostDroneSprayFormDataMutation,
    useGetMyStationServicesQuery,
    useGetOrderDetailsQuery,
    useGetAllKSQuery,
    useGetAllSellerPerKSQuery,
    useUpdateMyStationOrderMutation,
    useGetAllFarmsQuery,
    useGetAllAnalysisRequestsQuery,
    usePostCropReportMutation,
    useGetUploadedPdfQuery,
    useSellerListandRequestListQuery,
    useSellerApprovalOrActiveOrInactiveMutation,
    useSellerOrdersQuery,
    useSellerListingsQuery,
    useUpdateAnalysisReportMutation,
} = kisaanStationsApi;
