import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MapsService } from 'src/app/Services/service.index';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  loading: boolean = false;
  constructor(private FormBuilder : FormBuilder,
              private _MapService : MapsService,
              private router: Router) { }

  ngOnInit(): void {
    this.registerControl();
  }

  
  private registerControl(){
    this.registerForm = this.FormBuilder.group({
      email : ['',[Validators.required, Validators.email]],
      password : [null,[Validators.required]],
    });
  }

  agregarUsuario(){
    this.loading = true;
    if(this.registerForm.valid){
      
      const data = {
        email : this.registerForm.get('email').value,
        password : this.registerForm.get('password').value
      }

      this._MapService.crearUsuarios(data).subscribe(datos=>{
        Swal.fire(
          'Excelente',
          'Usuario creado correctamente, verifica en tu bandeja de mensajes',
          'success'
        );
          this.loading = false;
          this.router.navigate(['/']);
      },
      error=>{
        this.loading = false;
          console.log(error);
                  Swal.fire(
          'Ups!!',
          'No se pudo crear el usuario, parece que alguien lo tiene tomado',
          'error'
        );
        
      })
    }
  }

}
