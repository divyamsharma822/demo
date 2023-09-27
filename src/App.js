import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Home, CreatePost, EditPost, Draft, History } from "./components";
import {
    KrishiBazaar,
    ViewProfile,
    KisaanStations,
    MyStationServices,
    MyStationServicesDetails,
    ViewServiceDetails,
    FarmAnalysis,
    AnalysisReports,
    FarmAnalysisView,
    AdminLogin,
    UserDetailsView,
    Reports,
    PostReport,
    DaybestManagement,
    Employees,
    EmployeesView,
    TravelExpenses,
    DailyExpenses,
    Inventory,
    InventoryView,
    AllSellers,
    Approvals,
    SellerView,
    ApprovalsView,
    AnalysisReportPDF,
    ComingSoon,
} from "./pages";
import { KissanStationLogin } from "./KisaanStation/pages";
import { KSViewProfile, KSRequests, Sidebar, ViewServiceProvider } from "./components/KisaanStation";
import AnalysisReportView from "./pages/FarmAnalysis/AnalysisReportView/AnalysisReportView";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserDetails from "./pages/UserDetails/UserDetails";
import Leaves from "./pages/DaybestManagement/Leaves/Leaves";

const App = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== "/" && <Sidebar />}

            <React.Suspense fallback={<div className='text-center'>Loading...</div>}>
                <Routes>
                    {/* // Home Route */}
                    <Route
                        index
                        element={<AdminLogin />}
                    />

                    {/* // Overview Routes */}
                    <Route
                        path='/admin/KisaanStation/Overview'
                        exact
                        element={<Dashboard />}
                    />
                    {/* // Daybest Management Routes */}
                    <Route
                        path='/admin/KisaanStation/DaybestManagement/Attendance'
                        exact
                        element={<DaybestManagement />}
                    />
                    <Route
                        path='/admin/KisaanStation/DaybestManagement/Employees'
                        exact
                        element={<Employees />}
                    />
                    <Route
                        path='/admin/KisaanStation/DaybestManagement/Employees/View'
                        exact
                        element={<EmployeesView />}
                    />
                    <Route
                        path='/admin/KisaanStation/DaybestManagement/Inventory'
                        exact
                        element={<Inventory />}
                    />
                    <Route
                        path='/admin/KisaanStation/DaybestManagement/Inventory/View'
                        exact
                        element={<InventoryView />}
                    />
                    <Route
                        path='/admin/KisaanStation/DaybestManagement/Leaves'
                        exact
                        element={<Leaves />}
                    />
                    <Route
                        path='/admin/KisaanStation/DaybestManagement/TravelExpenses'
                        exact
                        element={<TravelExpenses />}
                    />
                    <Route
                        path='/admin/KisaanStation/DaybestManagement/DailyExpenses'
                        exact
                        element={<DailyExpenses />}
                    />
                    {/* <Route
            path="/admin/KisaanStation/DaybestManagement/FileStorage"
            exact
            element={<FileStorage />}
          /> */}
                    {/* // UserDetails Routes */}
                    <Route
                        path='/admin/KisaanStation/User%20Details'
                        exact
                        element={<UserDetails />}
                    />
                    <Route
                        path='/admin/KisaanStation/User%20Details/:name'
                        exact
                        element={<UserDetailsView />}
                    />
                    {/* // MyStation Routes */}
                    <Route
                        exact
                        path='/admin/KisaanStation/MyStation/Services'
                        element={<MyStationServicesDetails />}
                    />
                    <Route
                        path='/admin/KisaanStation/MyStation/Services/:status'
                        element={<MyStationServicesDetails />}
                    />
                    <Route
                        path='/admin/KisaanStation/MyStation/Services/UpdateServices/DroneSpray'
                        element={<MyStationServices />}
                    />
                    <Route
                        path='/admin/KisaanStation/MyStation/Services/Order%20Details'
                        element={<ViewServiceDetails />}
                    />
                    {/* // Farm Analysis Routes */}
                    <Route
                        exact
                        path='/admin/KisaanStation/Farm%20Analysis'
                        element={<FarmAnalysis />}
                    />
                    <Route
                        exact
                        path='/admin/KisaanStation/Farm%20Analysis/Analysis%20Requests'
                        element={<AnalysisReports />}
                    />
                    <Route
                        exact
                        path='/admin/KisaanStation/Farm%20Analysis/Analysis%20Requests/View'
                        element={<AnalysisReportView />}
                    />
                    <Route
                        exact
                        path='/admin/KisaanStation/Analysis%20Request/Report%20Generation'
                        element={<AnalysisReportPDF />}
                    />
                    <Route
                        exact
                        path='/admin/KisaanStation/Farm%20Analysis/View'
                        element={<FarmAnalysisView />}
                    />
                    {/* // Kisaan Station --Admin Routes /////// */}
                    <Route
                        path='/admin/KisaanStation/Kisaan%20Station/Stations'
                        element={<KisaanStations />}
                    />
                    <Route
                        path='/admin/KisaanStation/Kisaan%20Station/Stations/Requests'
                        element={<KSRequests />}
                    />
                    <Route
                        path='/admin/KisaanStation/Kisaan%20Station/Stations/Requests/View%20Profile'
                        element={<KSViewProfile />}
                    />
                    <Route
                        path='/admin/KisaanStation/Kisaan%20Station/Stations/Service%20Providers'
                        element={<ViewServiceProvider />}
                    />
                    <Route
                        path='/admin/KisaanStation/Kisaan%20Station/Sellers'
                        element={<AllSellers />}
                    />
                    <Route
                        path='/admin/KisaanStation/Kisaan%20Station/Sellers/View'
                        element={<SellerView />}
                    />
                    <Route
                        path='/admin/KisaanStation/Kisaan%20Station/Sellers/View/Order%20Details'
                        element={<ViewServiceDetails />}
                    />
                    <Route
                        path='/admin/KisaanStation/Kisaan%20Station/Sellers/Approvals'
                        element={<Approvals />}
                    />
                    <Route
                        path='/admin/KisaanStation/Kisaan%20Station/Sellers/Approvals/View'
                        element={<ApprovalsView />}
                    />
                    {/* // Krishi Bazaar Routes */}
                    <Route
                        path='/admin/KisaanStation/Krishi%20Bazaar'
                        element={<KrishiBazaar />}
                    />
                    <Route
                        path='/admin/KisaanStation/Krishi%20Bazaar/View%20Details'
                        element={<ViewProfile />}
                    />
                    {/* // Krishi Gyaan AgriNews Routes */}
                    <Route
                        path='/admin/KisaanStation/krishiGyaan/AgriNews'
                        element={<Home />}
                    />
                    <Route
                        path='/admin/KisaanStation/krishiGyaan/AgriNews/create'
                        element={<CreatePost />}
                    />
                    <Route
                        path='/admin/KisaanStation/krishiGyaan/AgriNews/edit/:postId'
                        element={<EditPost />}
                    />
                    <Route
                        path='/admin/KisaanStation/krishiGyaan/AgriNews/delete/:postId'
                        element={<Home />}
                    />
                    <Route
                        path='/admin/KisaanStation/krishiGyaan/AgriNews/draft'
                        element={<Draft />}
                    />
                    <Route
                        path='/admin/KisaanStation/krishiGyaan/AgriNews/history'
                        element={<History />}
                    />
                    {/* // Reports Routes */}
                    <Route
                        path='/admin/KisaanStation/Reports'
                        element={<Reports />}
                    />
                    <Route
                        path='/admin/KisaanStation/Reports/PostReports'
                        element={<PostReport />}
                    />
                    {/* // Kisaan Station Routes ///////// */}
                    <Route
                        path='/KisaanStation/login'
                        element={<KissanStationLogin />}
                    />
                    {/* <Route
                    path='/KisaanStation/Approvals' element={<Approvals />}
                /> */}
                    <Route
                        path='/admin/ComingSoon'
                        element={<ComingSoon />}
                    />
                    <Route
                        path='*'
                        element={
                            <Navigate
                                to='/admin/ComingSoon'
                                replace
                            />
                        }
                    />
                </Routes>
            </React.Suspense>
        </>
    );
};

export default App;
