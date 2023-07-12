import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  api: string = 'https://fakestoreapi.com/products';
  productData!: any[]; // to save all products data
  productSubject = new BehaviorSubject<any[]>([]);
  
  constructor(private httpReq: HttpClient) {
    this.allData()
   }

  // to get all products
  allData(){
    this.httpReq.get(this.api).subscribe((data: any)=>{
      this.productData = data;
      this.productSubject.next(this.productData);
    })
  }
  
  getProducts(){
    return this.productSubject.asObservable();
  }
  // to get product by id
  getProductById(id: number): Observable<any>{
    const product = this.productData.find(item => item.id === id);
    return product ? of(product) : throwError('Product Not Found');
  }
  // to create product
  addProduct(product: any): Observable<any>{
    const newProduct = {...product, id: this.generateId()};
    this.productData.push(newProduct);
    this.productSubject.next(this.productData);
    return of(newProduct);
  }
  // to update product
  updateProduct(data: any, product: any): Observable<any>{
    const index = this.productData.findIndex(item => item.id === data);
    if(index !== -1){
      this.productData[index] = {...this.productData[index], ...product}
      return of(this.productData[index])
    }else{
      return throwError('Product Not Found')
    }
  }
  // delete product
  deleteProduct(id: number): Observable<any>{
    const index = this.productData.findIndex(item => item.id === id);
    if(index !== -1){
      this.productData.splice(index, 1);
      this.productSubject.next(this.productData);
      return of(undefined);
    }else{
      return throwError('Product Not Found')
    }
  }

  // generate id for new product
  generateId(){
    const maxId = this.productData.reduce((max, item)=>(item.id > max ? item.id : max), 0);
    return maxId +1
  }

}
