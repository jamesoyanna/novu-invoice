import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';

import Invoice from './components/Invoice';
import InvoiceDetails from './components/InvoiceDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Invoice />,
  },
  {
    path: "/invoice-details",
    element: <InvoiceDetails/>,
  },

]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);


