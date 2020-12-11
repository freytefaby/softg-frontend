import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class MapsService {
    constructor(private _http: HttpClient){}



    cargarRutas(){
        console.log(localStorage.getItem("token"));
        
        const url = environment.CargarRutas;
        return this._http.get(url);
    }

    cargarDetalleRuta(id:number){
        const url = environment.CargarDetalleRuta+"/"+id;
        return this._http.get(url);
    }


    crearRuta(datos:any){
        const url = environment.crearRuta;
        return this._http.post(url,datos);
    }

    cargarExcel(data:any){
        const url = environment.cargarExcel;
        return this._http.post(url,data);
    }

    descargarinfo(){
        const url = environment.descargarArchivo;
        return this._http.get(url);
    }

    crearUsuarios(data:any){
        const url = environment.crearUsuario;
        return this._http.post(url,data);
    }

    login(data:any){
        const url = environment.login;
        return this._http.post(url,data);
    }
}