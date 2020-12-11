import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MapsService } from 'src/app/Services/service.index';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm : FormGroup;
  loading: boolean = false;
  constructor(private FormBuilder : FormBuilder,
              private _MapService : MapsService,
              private router: Router) { }


  ngOnInit(): void {
    this.LoginControl();
  }

  private LoginControl(){
    this.LoginForm = this.FormBuilder.group({
      email : ['',[Validators.required, Validators.email]],
      password : [null,[Validators.required]],
    });
  }

  login(){
    this.loading = true;
    if(this.LoginForm.valid){
      const data = {
        email : this.LoginForm.get('email').value,
        password : this.LoginForm.get('password').value
      }

      this._MapService.login(data).subscribe(datos=>{
        this.loading= false;
        console.log(datos);
        localStorage.setItem("token",datos as any);
        
        this.router.navigate(['/home']);
      },error=>{
        this.loading= false;
        Swal.fire(
          'Ups!!',
          'Usuario o contraseña incorrecta',
          'error'
        );
        console.log(error);
        
      })
    }
  }

}
