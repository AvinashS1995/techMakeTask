import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
    private dialog: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){ 
    this.createForm()
  }
  
  createForm(){
    this.form = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      rating: this.fb.group({
        rate: ['', [Validators.required, Validators.max(5)]],
        count: ['', Validators.required]
      }),
      description: ['', Validators.required]
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
            this.toastr.success('Product Updated Successfully', 'Product Updated')
          },
          error: (err: any) => {
            console.log(err);
            this.toastr.error('Product Not Updated', 'Error Occurred')
          }
        })
      } else {
        console.log(this.form.value)
        this.dataService.addProduct(this.form.value).subscribe({
          next: (val: any) => {
            console.log(val);
            this.toastr.success('Product Added Successfully', 'Product Added')
            this.dialog.close(true)
          },
          error: (err: any) => {
            console.log(err)
            this.toastr.error('Product Not Updated', 'Error Occurred')
          }
        })
        
      }
    }
  }


}
