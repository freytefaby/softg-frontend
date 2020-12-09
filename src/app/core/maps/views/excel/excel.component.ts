import { Component, OnInit } from '@angular/core';
import {MapsService} from '../../../../Services/service.index';
import { IExcel } from '../../../models/Iexcel';
@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {
  IExcel : IExcel[] = [];
  constructor(public _mapservice : MapsService) { }

  ngOnInit(): void {
    this.cargarExcel();
  }


  cargarExcel(){
    this._mapservice.cargarExcel().subscribe(datos=>{
      this.IExcel = datos as IExcel[];
      console.log(datos);
      
    },
    error=>{
      console.log(error);
      
    })
  }
}
