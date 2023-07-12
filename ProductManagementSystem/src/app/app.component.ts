import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from './services/data.service';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProductManagementSystem';
  displayColumns: string[] = [
    'id',
    'title',
    'price',
    'description',
    'category',
    'image',
    'rating',
    'options',
  ];
  dataSource!: MatTableDataSource<any>;
  product: any[] = []; // product
  allProduct: any[] = []; // save products in local variable

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private dialog: MatDialog, private dataService: DataService){ }

  ngOnInit(){
    this.dataService.getProducts().subscribe((data: any)=>{
      console.log(data);
      this.allProduct = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  // filter
  filterData(event: Event){
    const filterText = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterText.trim().toLocaleLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator?.firstPage();
    }
  }

  deleteProduct(id: number){
    const index = this.allProduct.findIndex((prod: any)=>prod.id === id);
    if(index !== -1){
      this.allProduct.splice(index, 1);
    }
    this.dataSource = new MatTableDataSource(this.allProduct);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // open form for product
  openProductForm(data: any){
    const dialogRef = this.dialog.open(ProductFormComponent, {data});
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.dataService.getProducts().subscribe((item: any)=>{
            this.dataSource = new MatTableDataSource(item);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          })
        }
      }
    })
  }
  
}
