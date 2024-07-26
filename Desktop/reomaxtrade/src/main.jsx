import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './api/store';
import './index.css';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import Loader from './components/Loader';
import PriceList from './pages/PriceList';

const router = createHashRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'priceList',
                element: <PriceList />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} fallbackElement={<Loader />} />
        </Provider>
    </React.StrictMode>
);
