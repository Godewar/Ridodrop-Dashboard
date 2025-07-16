import AddPrice from '../../views/price/AddPrice'; 
import VehicleList from '../../views/vehicle/VehicleList';

const routes = [
  {
    path: 'vehicle/list/:vehicleType/:subType',
    element: <VehicleList />
  },
];

export default routes; 