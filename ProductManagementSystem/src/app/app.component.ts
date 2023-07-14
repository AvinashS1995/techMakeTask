import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProductManagementSystem';
  allProduct: any[] = []; // save products in local variable

  constructor( private dataService: DataService ){ }

  ngOnInit(){
    this.dataService.getProducts().subscribe((data: any)=>{
      console.log(data);
      this.allProduct = data;
    })
  }
    
}
