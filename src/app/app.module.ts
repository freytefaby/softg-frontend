import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExcelComponent } from './core/maps/views/excel/excel.component';
import { Interceptors } from './Services/Interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ExcelComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS,useClass : Interceptors, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
