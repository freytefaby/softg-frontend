import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { ExcelComponent } from '../maps/views/excel/excel.component';
import { MapsComponent } from '../maps/views/maps.component';
import {HomeComponent} from './views/home/home.component';


const routes : Routes =
[
    {
        path:'',component:HomeComponent,
        children:
        [
            {path:'',component:MapsComponent},
            {path:'cargarExcel',component:ExcelComponent}
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class HomeRoutingModule {}