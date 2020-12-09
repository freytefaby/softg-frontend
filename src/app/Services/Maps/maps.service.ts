import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class MapsService {
    constructor(private _http: HttpClient){}

    public headers: HttpHeaders = new HttpHeaders({
        'Accept':'application/json',
        'Authorization':'Bearer '+localStorage.getItem("token")
    });


    cargarRutas(){
        const url = environment.CargarRutas;
        return this._http.get(url,{headers:this.headers});
    }

    cargarDetalleRuta(id:number){
        const url = environment.CargarDetalleRuta+"/"+id;
        return this._http.get(url,{headers:this.headers});
    }


    crearRuta(datos:any){
        const url = environment.crearRuta;
        return this._http.post(url,datos,{headers:this.headers});
    }

    cargarExcel(){
        const url = environment.cargarExcel;
        return this._http.get(url,{headers:this.headers});
    }

    descargarinfo(){
        const url = environment.descargarArchivo;
        return this._http.get(url,{headers:this.headers});
    }

    crearUsuarios(data:any){
        const url = environment.crearUsuario;
        return this._http.post(url,data,{headers:this.headers});
    }

    login(data:any){
        const url = environment.login;
        return this._http.post(url,data,{headers:this.headers});
    }
}