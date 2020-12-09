import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './views/home/home.component';
import { MapsComponent } from '../maps/views/maps.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [HomeComponent,MapsComponent],
    imports:[
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot()
    ]
})

export class HomeModule {}