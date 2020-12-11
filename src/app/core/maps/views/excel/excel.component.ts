import { Component, OnInit } from '@angular/core';
import {MapsService} from '../../../../Services/service.index';
import { IExcel } from '../../../models/Iexcel';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {
  IExcel : IExcel[] = [];
  constructor(public _mapservice : MapsService) { }

  ngOnInit(): void {
   
  }


  cargarExcel(data:any){

    this._mapservice.cargarExcel(data).subscribe(datos=>{
      this.IExcel = datos as IExcel[];
      console.log(datos);
      
    },
    error=>{
      console.log(error);
      
    })
  }

  onFileChanges(e:Event){
    if(e.target["files"].length > 0){
      const ext = e.target["files"][0]["name"].split('.').pop();
      if(ext != "xlsx"){
        Swal.fire(
          'Ups!!',
          'Formato de archivo no puede procesaor solo xlsx',
          'error'
        );
      }else{
        const file = e.target["files"][0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>{
          const base64 : string = reader.result.toString().replace(/[^,]+,/, "");
          let data = {
            content : base64
          }

          this.cargarExcel(data);
          
        }
      }
    
    }
   
   
   
   
    
  //  let file = (<HTMLInputElement>e.target).files[0];
  //  console.log(file);
   
    
  }
}
