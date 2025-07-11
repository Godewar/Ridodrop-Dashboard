import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AddAdmin from './AddAdmin';
import AlllAdmins from './AlllAdmins';
import AddDriverSafety from './AddDriverSafety';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const SiteAnalytics = Loadable(lazy(() => import('views/dashboard/SiteAnalytics')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const AllDrivers = Loadable(lazy(() => import('../routes/AllDrivers')));
const DetailDriver = Loadable(lazy(() => import('../routes/DriverDetail')));
const DriverRequest = Loadable(lazy(() => import('../routes/DriverRequests')));
const DriversCaution = Loadable(lazy(() => import('../routes/DriversCaution')));
const ManageDriver = Loadable(lazy(() => import('views/driver/ManageDriver')));
const ManageVehicle = Loadable(lazy(() => import('views/vehicle/ManageVehicle')));
const ManageRate = Loadable(lazy(() => import('views/rate/ManageRate')));
const ManageUser = Loadable(lazy(() => import('views/user/ManageUser')));
const ManageService = Loadable(lazy(() => import('views/service/ManageService')));
const ManageCustomer = Loadable(lazy(() => import('views/customer/ManageCustomer')));
const CustomerDetail = Loadable(lazy(() => import('views/customer/CustomerDetail')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    // {
    //   path: 'AllDrivers',
    //   element: <AllDrivers />
    // },
    // {
    //   path: 'DriverRequest',
    //   element: <DriverRequest />
    // },
    // {
    //   path: 'driver/detail/:id',
    //   element: <DetailDriver />
    // },
    {
      path: 'add/admin',
      element: <AddAdmin />
    },
    {
      path: 'all/admin',
      element: <AlllAdmins />
    },
    // {
    //   path: 'driver/safety',
    //   element: <DriversCaution />
    // },
    // {
    //   path: 'add/safety',
    //   element: <AddDriverSafety />
    // },
    // // {
    //   path: 'analytics',
    //   element: <SiteAnalytics />
    // },
    {
      path: 'drivers',
      element: <ManageDriver />
    },
    {
      path: 'vehicles',
      element: <ManageVehicle />
    },
    {
      path: 'rates',
      element: <ManageRate />
    },
    {
      path: 'users',
      element: <ManageUser />
    },
    {
      path: 'services',
      element: <ManageService />
    },
    {
      path: 'customers',
      element: <ManageCustomer />
    },
    {
      path: 'customers/:id',
      element: <CustomerDetail />
    },
    // {
    //   path: 'typography',
    //   element: <UtilsTypography />
    // },
    // {
    //   path: 'color',
    //   element: <UtilsColor />
    // },
    // {
    //   path: 'shadow',
    //   element: <UtilsShadow />
    // },
    // {
    //   path: '/sample-page',
    //   element: <SamplePage />
    // }
  ]
};

export default MainRoutes;
