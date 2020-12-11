import { AfterViewInit, Component,OnInit,TemplateRef, ViewChild  } from '@angular/core';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import * as L from 'leaflet';
import { IMarker } from '../../models/Marker';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MapsService} from '../../../Services/Maps/maps.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements AfterViewInit, OnInit {
  @ViewChild('childModal', { static: false }) childModal: ModalDirective;
  Imarkers : IMarker[] = [];
  coordinates: Array<any> = [];
  coordenadasUsuario  = {
    latitud:0,
    longitud:-0
  };
  rutas : any = [];
  /*FUNCIONES DE MAPA*/
  map: L.Map;
  polyline : L.Polyline = L.polyline(this.coordinates,{color:'red'});
  markers = L.layerGroup();


  /*FORMULARIOS*/
  MarkerForm : FormGroup;
  selectRuta : any = 0;
  nombreruta : string = null;
  constructor(private FormBuilder : FormBuilder,
              private _MapService : MapsService) { }

  ngAfterViewInit(): void{
    this.createMap();
  }

  ngOnInit(){
    this.cargarRutas();
    this.obtenerCordenadas();
    this.markerControl();
  }


  createMap(){
    
    const option = {
      lat : this.coordenadasUsuario.latitud,
      lng : this.coordenadasUsuario.longitud
    };
    console.log(option);
    
    const zoomLevel = 17;
    this.map = L.map('map',{
      center : [option.lat, option.lng],
      zoom : zoomLevel
    });

    const mainLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      minZoom:9,
      maxZoom:20,
      attribution : '...'
    });

    mainLayer.addTo(this.map);

    this.map.on('click', (e)=>{
      this.childModal.show();
     console.log(e['latlng']);
     this.MarkerForm.get('latitud').setValue(e['latlng']["lat"]);
     this.MarkerForm.get('longitud').setValue(e['latlng']["lng"])
     
      });
    
  }


  private markerControl(){
    this.MarkerForm = this.FormBuilder.group({
      nombre : ['',[Validators.required]],
      latitud : [null,[Validators.required]],
      longitud : [null,[Validators.required]]
    });
  }
  agregarmarcador(){
    if(this.MarkerForm.valid){
      let id = "R"+Math.floor(Math.random()*999999);
      let marker = L.marker([this.MarkerForm.get('latitud').value,this.MarkerForm.get('longitud').value],{title:this.MarkerForm.get('nombre').value,draggable:true}); //creando un marcador ubicandolo en un sitio
      marker['id'] = id;   
      this.markers.addLayer(marker); //agregamos la capa en un grupo de capas 
      marker.bindPopup(this.MarkerForm.get('nombre').value); //poniendole una descripcion al marcador
      this.map.addLayer(marker); //agregando una capa al mapa para que aparezca el marcador.
      
      /*Creamos un objeto que implemente la interfaz del marcador*/ 
      let Imarker : IMarker = {
        codigo : id,
        lng : this.MarkerForm.get('longitud').value,
        ltn : this.MarkerForm.get('latitud').value,
        title : this.MarkerForm.get('nombre').value
      } ;    
  
      /*Agregamos coordenadas para que traze la linea*/
      this.addCoordenadas(Imarker,false);
  
     // actualizar el marcador cuando se mueva
       marker.on('dragend',()=>{
        let posiciondinamica = marker.getLatLng();
        console.log(posiciondinamica);
        
        Imarker.codigo = marker['id'],
        Imarker.lng = posiciondinamica.lng,
        Imarker.ltn = posiciondinamica.lat,
        Imarker.title = marker.options.title;
        this.addCoordenadas(Imarker,true)       
        });
    
        this.MarkerForm.reset();
        this.childModal.hide();
    }   
  }
  
  addCoordenadas(marcador : IMarker, isexist: boolean): void{
    /*los puntos son un arreglo numerico que nos guiaran para enviar las 
      coordenadas de los puntos para poder trazar una linea entre los puntos */
    const puntos : Array<number> = [];
    puntos.push(marcador.ltn,marcador.lng);

    /*Si la variable isExist es falso, el marcador no existe y se inserta dentro del arreglo de marcadores
      de lo contrario se actualiza su ubicacion ya que el marcador es draggable*/

    if(!isexist){
      //Insertamos en los marcadores  
      this.Imarkers.push(marcador);
     
      
      //crear union de los puntos, coordinates es el arreglo total de latitudes y longitudes dentro de los puntos.
      this.coordinates.push(puntos); 

      
    }else{
      //buscamos la posicion y lo actualizamos en el arreglo de marcadores.
      const pos = this.Imarkers.findIndex(element => element.codigo == marcador.codigo);
      console.log("marker encontrado ->",this.Imarkers[pos]);
      
     // this.Imarkers[pos] = marcador;
      
      //actualizamos el punto
      this.coordinates[pos] = puntos;
    }
  
    
    this.trazarLinea(this.coordinates);
    
    

    
  }

 
  trazarLinea(array:Array<any>){
    this.polyline.setLatLngs(array).addTo(this.map);
 
   
  }

  borrarRuta(id: string = null){
    /*Recorremos los marcadores y si el id de un marcador que nos mandan es nulo
      borramos todos los marcadores, si nos mandan un id buscamos el marcador 
      y lo eliminamos directamente y recalculamos las trazas de las lineas.*/
    var pos = null;
    this.markers.eachLayer((layer)=>{
      if(id != null)
      {
        if(layer["id"] == id)
        {
          pos = this.Imarkers.findIndex(element => element.codigo == id);
          this.map.removeLayer(layer);
          this.markers.removeLayer(layer); 
          if(pos != null)
          {
            this.Imarkers.splice(pos,1);
            this.coordinates.splice(pos,1);
             
          }
        }
      }
      else
      {
          console.log("Elimino todos los elementos");  
          this.markers.removeLayer(layer);
          layer.remove();
      }
    });
      /*Si no recibo ningun id de un marcador limpiamos las coordenadas y los marcadores para reiniciar el mapa.*/
      if(id == null)
      {
        this.coordinates = [];
        this.Imarkers = [];
      }
      this.trazarLinea(this.coordinates);

  }


  obtenerCordenadas(){
    navigator.geolocation.getCurrentPosition(posicion =>{
      this.coordenadasUsuario.latitud = posicion.coords.latitude;
      this.coordenadasUsuario.longitud = posicion.coords.longitude;
      this.map.panTo(new L.LatLng(posicion.coords.latitude, posicion.coords.longitude))

    },error=>{
      console.log("ENTRO EN EL ERROR");
      this.map.panTo(new L.LatLng(10.9227327, -74.7922199))
      this.coordenadasUsuario.latitud = 10.9227327;
      this.coordenadasUsuario.longitud = -74.7922199;
    })
  }

  cambiaruta(){
   this.borrarRuta();
    
  if(this.selectRuta != null && this.selectRuta != 0){
      this._MapService.cargarDetalleRuta(this.selectRuta).subscribe(data=>{
        this.Imarkers = data as IMarker[];
        console.log("Nuevo marcador->",this.Imarkers);
         
        //this.borrarRuta();
        this.montarRutaNueva(this.Imarkers);
      })
    }
   
  }

  cargarRutas(){
    this._MapService.cargarRutas().subscribe(success=>{
      console.log(success);
      this.rutas = success;
    },
    error=>{
      console.log(error);
      
    });
  }

  montarRutaNueva(marcadores:IMarker[]){
      marcadores.forEach(element => {
         let marker = L.marker([element.ltn,element.lng],{title:element.title,draggable:true});
         marker['id'] = element.codigo;
         this.markers.addLayer(marker);
         marker.bindPopup(element.title);
         this.map.addLayer(marker);
         const puntos : Array<number> = [];
         puntos.push(element.ltn,element.lng);
         this.coordinates.push(puntos);

         marker.on('dragend',()=>{
          let posiciondinamica = marker.getLatLng();
          element.codigo = marker['id'],
          element.lng = posiciondinamica.lng,
          element.ltn = posiciondinamica.lat,
          element.title = marker.options.title;
          this.addCoordenadas(element,true)       
          });
      });

        
      this.trazarLinea(this.coordinates);
  }

  agregarRuta(){
    let ruta = {
      nombre : this.nombreruta,
      puntos : this.Imarkers
    }

    console.log("ruta a guardar->",ruta);
    this._MapService.crearRuta(ruta).subscribe(success=>{
      this.rutas.push({
        id:success,
        descripcion: this.nombreruta
      });

      this.nombreruta = null;
      Swal.fire(
        'Excelente',
        'Tu nueva ruta se ha creado.',
        'success'
      )
      
    },
    error=>{
      console.log(error);
      
    })
    
  }
}
