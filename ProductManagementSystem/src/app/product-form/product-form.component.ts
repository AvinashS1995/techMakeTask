import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  form!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private dialog: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){ 
    this.createForm()
  }
  
  createForm(){
    this.form = this.fb.group({
      title: '',
      category: '',
      image: '',
      price: '',
      description: ''
    })
  }

  ngOnInit(){
    this.form.patchValue(this.data)
  }
  
  addProduct(){
    if(this.form.valid){
      if(this.data){
        this.dataService.updateProduct(this.data.id, this.form.value).subscribe({
          next: (val: any)=>{
            this.dialog.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      } else {
        console.log(this.form.value)
        this.dataService.addProduct(this.form.value).subscribe({
          next: (val: any) => {
            console.log('Product Added');
            this.dialog.close(true)
          },
          error: (err: any) => {
            console.log('Got an Error')
          }
        })
        
      }
    }
  }


}
