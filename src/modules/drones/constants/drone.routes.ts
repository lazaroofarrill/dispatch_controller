export enum DroneRoutes {
  GET_AVAILABLE = '/',
  POST_REGISTER = '/',
  GET_BATTERY = '/:droneId/battery',
  POST_LOAD_ITEM = '/:droneId/items/:medicamentId',
  GET_ITEMS = '/:droneId/items',
}
