export enum DroneRoutes {
  GET_AVAILABLE = '/available',
  GET_DRONES = '/',
  POST_DRONE = '/',
  GET_BATTERY = '/:droneId/battery',
  POST_ADD_ITEM = '/:droneId/items/:medicamentId',
  DELETE_UNLOAD_ITEM = '/:droneId/items/:medicamentId',
  GET_ITEMS = '/:droneId/items',
  PATCH_UPDATE_DRONE = '/:droneId',
  DELETE_DRONE = '/:droneId',
}
