import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// material
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ProductFormComponent } from './product-form/product-form.component';
import {MatSelectModule} from '@angular/material/select';

// toaster
import { ToastrModule } from 'ngx-toastr';
import { ProductTableComponent } from './product-table/product-table.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // material
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    // toaster
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
