import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../services/data.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit{

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
  @Input() allProduct: any[] = []; // save products in local variable
  selectedCategory = 'all';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    private toastr: ToastrService
    ){
      this.dataSource = new MatTableDataSource(this.allProduct);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
     }
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit(){
    // this.dataService.getProducts().subscribe((data: any)=>{
    //   console.log(data);
    //   this.allProduct = data;
    console.log(this.allProduct);
    
      this.dataSource = new MatTableDataSource(this.allProduct);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    // })
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
    if(index !== -1 && confirm('Do you really want to Delete this Product ?')){
      this.allProduct.splice(index, 1);
      this.toastr.error('Product Deleted Successfully', 'Deleted')
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

  onCategorySelect(){
    if(this.selectedCategory === 'all'){
      this.dataSource = new MatTableDataSource(this.allProduct)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }else{
      let filterData = this.allProduct.filter(prod => prod.category === this.selectedCategory)
      this.dataSource = new MatTableDataSource(filterData)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  // ngAfterViewInit(){
  //   console.log(this.allProduct);
    
  //   this.dataSource = new MatTableDataSource(this.allProduct);
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['allProduct'] && changes['allProduct'].currentValue) {
  //     this.dataSource.data = changes['allProduct'].currentValue;
  //   }
  // }

  ngOnChanges(){
    this.dataSource = new MatTableDataSource(this.allProduct);

  }

}
