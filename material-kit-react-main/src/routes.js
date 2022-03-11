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
import BarChartEx from "./pages/charts/BarChartEx";
import CreateUser from "./pages/user-management/CreateUser";
import TimeCard from "./pages/forms/time-card/TimeCard";
import TimeCardList from "./pages/forms/time-card/TimeCardList";
import ProjectEstimateTemplate from "./pages/forms/project/ProjectEstimateTemplate";
import TimeCardReport from "./pages/reports/time-card-report/TimeCardReport";
import ProjectEstimateTemplateList from "./pages/forms/project/ProjectEstimateTemplateList";
import PavingMillingReport from "./pages/reports/paving-milling-report/PavingMillingReport";
import HomePage from "./home-page/HomePage";
import UserList from "./pages/user-management/UserList";
import AboutUs from "./about-us/AboutUs";
import Paving from "./goa-services/Paving";
import ColdMilling from "./goa-services/ColdMilling";
import EquipmentRentals from "./goa-services/EquipmentRentals";
import Trucking from "./goa-services/Trucking";
import Concrete from "./goa-services/Concrete";
import Contact from "./goa-services/Contact";
import OurWorks from "./goa-services/OurWorks";
import PreJobSafetyForm from "./pages/forms/pre-job-safety/PreJobSafetyForm";
import PreJobSafetyFormList from "./pages/forms/pre-job-safety/PreJobSafetyFormList";
import SignatureConfirmPageSafety from "./pages/forms/pre-job-safety/SignatureConfirmPageSafety";
import Demo from "./home-page/Demo";
import EmergencyForm from "./pages/forms/emergency-form/EmergencyForm";
import HospitalForm from "./pages/forms/inventory/hospital/HospitalForm";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'forms', element: <Forms /> },
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
        { path: '', element: <SignatureConfirmPage /> },
        { path: 'safety', element: <SignatureConfirmPageSafety /> }
      ]
    },
    {
      path: '/dashboard/forms',
      element: <DashboardLayout />,
      children: [
        { path: 'newClientForm', element: <NewClientForm /> },
        { path: 'tailGateTalkForm', element: <TailGateTalkForm /> },
        { path: 'preJobSafetyForm', element: <PreJobSafetyForm /> },
        { path: 'emergencyForm', element: <EmergencyForm /> }
      ]
    },
    {
      path: '/dashboard/savedForms',
      element: <DashboardLayout />,
      children: [
        { path: 'newClientForm', element: <NewClientFormList /> },
        { path: 'tailGateTalkForm', element: <TailGateTalkFormList />},
        { path: 'preJobSafetyForm', element: <PreJobSafetyFormList />}
      ]
    },
    {
      path: '/dashboard/timeCard',
      element: <DashboardLayout />,
      children: [
        { path: 'entering', element: <TimeCard /> },
        { path: 'timeCards', element: <TimeCardList /> }
      ]
    },
    {
      path: '/dashboard/project',
      element: <DashboardLayout />,
      children: [
        { path: 'estimateTemplate', element: <ProjectEstimateTemplate /> },
        { path: 'savedEstimateTemplate', element: <ProjectEstimateTemplateList /> }
      ]
    },
    {
      path: '/dashboard/inventory',
      element: <DashboardLayout />,
      children: [
        { path: 'hospitalForm', element: <HospitalForm /> }
      ]
    },
    {
      path: '/dashboard/reports',
      element: <DashboardLayout />,
      children: [
        { path: 'timeCardReport', element: <TimeCardReport /> },
        { path: 'pavingMillingReport', element: <PavingMillingReport /> }
      ]
    },
    {
      path: '/dashboard/usermanagement',
      element: <DashboardLayout />,
      children: [
        { path: 'createUser', element: <CreateUser /> },
        { path: 'users', element: <UserList /> }
      ]
    },
    {
      path: '/dashboard/charts',
      element: <DashboardLayout />,
      children: [
        { path: 'barchart', element: <BarChartEx /> }
      ]
    },
    {
      path: '/',
      children: [
        { element: <Navigate to="/home" replace /> },
        { path: '/home', element: <HomePage/> },
        { path: '/demo', element: <Demo/> },
        { path: '/aboutUs', element: <AboutUs/> },
        { path: '/paving', element: <Paving/> },
        { path: '/coldMilling', element: <ColdMilling/> },
        { path: '/concrete', element: <Concrete/> },
        { path: '/equipmentRentals', element: <EquipmentRentals/> },
        { path: '/trucking', element: <Trucking/> },
        { path: '/contact', element: <Contact/> },
        { path: '/ourWorks', element: <OurWorks/> },
        { path: 'index.html', element: <Login /> },
        { path: 'admin', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
