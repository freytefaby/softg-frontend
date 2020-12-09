// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseUrl = 'http://localhost/soft-g/backend/public/api'
export const environment = {
  base : baseUrl,

  //Maps
  CargarRutas : baseUrl + '/maps',
  CargarDetalleRuta : baseUrl + '/maps/detalle',
  crearRuta : baseUrl + '/maps/crearRuta',
  cargarExcel : baseUrl + '/excel/cargar',

  //others
  descargarArchivo : baseUrl+'/descargarDatos',
  crearUsuario : baseUrl + '/usuarios/crear',
  login : baseUrl + '/usuarios/login',
  
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
