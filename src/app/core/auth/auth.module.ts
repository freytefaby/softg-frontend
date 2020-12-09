import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@NgModule({

    declarations:[LoginComponent, RegisterComponent],
    imports:[
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule

    ]
})

export class AuthModule {}