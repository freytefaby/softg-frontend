import { Component, OnInit } from '@angular/core';
import * as JSZip from 'jszip';
import * as SaveAs from 'file-saver';
import {MapsService} from '../../../../Services/service.index';
import { element } from 'protractor';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public mapService : MapsService,private router: Router) { }

  ngOnInit(): void {
  }


  descargarZip(){
    this.mapService.descargarinfo().subscribe(data=>{
      this.construirinfo(data);
      console.log(data);
      
    },
    error=>{
      console.log(error);
      
    })
   
  }

  construirinfo(data:any){
    let body = "";
    //Unidr data de rutas
    body = this.construirRutas(data["rutas"]);
    body += this.construirdetallerutas(data["detalle"]);
    var zip = new JSZip();
    zip.file("info.txt", body);
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // see FileSaver.js
        SaveAs(content, "datos.zip");
    });
  
  }

  construirdetallerutas(data:any){
    let body = "\n\n::DETALLE DE RUTAS::\n";
    body += "Detalle   |   latitud   |   longitud   |   codigo\n";
    data.forEach(element=>{
      body += element["title"] + "   |   "+element["ltn"]+"   |   "+element["lng"]+"   |   "+element["codigo"]+"\n";
    })

    return body;
  }

  construirRutas(data:any){
    let body = "::RUTAS::\n";
    body += "descripcion\n";
    data.forEach(element => {
      body += element["descripcion"]+"\n";
    });

    return body;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
