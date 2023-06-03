export enum DroneRoutes {
  GET_AVAILABLE = '/available',
  POST_REGISTER = '/',
  GET_BATTERY = '/:droneId/battery',
  POST_ADD_ITEM = '/:droneId/items/:medicamentId',
  DELETE_UNLOAD_ITEM = '/:droneId/items/:medicamentId',
  GET_ITEMS = '/:droneId/items',
}
