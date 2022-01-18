import {Navigate, useRoutes} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Reports from './pages/Reports';
import Forms from './pages/Forms';
import NewClientForm from './pages/forms/new-client-form/NewClientForm';
import NewClientFormList from "./pages/forms/new-client-form/NewClientFormList";
import TailGateTalkForm from "./pages/forms/tail-gate-talk/TailGateTalkForm";
import SignatureConfirmPage from "./pages/forms/tail-gate-talk/SignatureConfirmPage";
import TailGateTalkFormList from "./pages/forms/tail-gate-talk/TailGateFormList";
import React from "react";
import Talks from "./pages/forms/talks/Talks";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'forms', element: <Forms /> },
        { path: 'reports', element: <Reports /> },
        { path: 'talks', element: <Talks /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/signatureConfirmPage',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <SignatureConfirmPage /> }
      ]
    },
    {
      path: '/dashboard/forms',
      element: <DashboardLayout />,
      children: [
        { path: 'newClientForm', element: <NewClientForm /> },
        { path: 'tailGateTalkForm', element: <TailGateTalkForm /> }
      ]
    },
    {
      path: '/dashboard/savedForms',
      element: <DashboardLayout />,
      children: [
        { path: 'newClientForm', element: <NewClientFormList /> },
        { path: 'tailGateTalkForm', element: <TailGateTalkFormList />}
      ]
    },
    {
      path: '/',
      children: [
        { element: <Navigate to="/index.html" replace /> },
        { path: 'index.html', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
