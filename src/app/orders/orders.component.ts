import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { OrderModel } from './orders board model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  formValue !: FormGroup;
  OrderModelObj : OrderModel = new OrderModel();
  api: any;
  orderData!:any;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      orderNumber : [''],
      date : [''],
      name : [''],
      address : [''],
      phoneno : ['']
    })
  }
  postOrderDetails(){
    this.OrderModelObj.ordernumber = this.formValue.value.ordernumber;
    this.OrderModelObj.Date =this.formValue.value.Date;
    this.OrderModelObj.name =this.formValue.value.name;
    this.OrderModelObj.address =this.formValue.value.address;
    this.OrderModelObj.phone =this.formValue.value.phone;
    //console.log(this.OrderModelObj);
    //this.OrderModelObj.ordernumber = 4;
    //this.OrderModelObj.Date =new Date();
    //this.OrderModelObj.name ='98';
    //this.OrderModelObj.address ='789';
    //this.OrderModelObj.phone ="88";
    
    this.api.postOrder(this.OrderModelObj)
    .subscribe((res: any)=>{
    console.log(res);
    alert("order added successfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllOrder();
  },
      (  _err: any)=>{
    alert("something went wrong");
  })
}
getAllOrder(){
  this.api.getOrder()
  .subscribe((res: any)=>{
    this.orderData= res;   

  })
}
deleteOrder(row : any){
  this.api.deleteOrder(row.id)
  .subscribe((res: any)=>{
    alert("order deleted");
    this.getAllOrder();
  })
}
onEdit(row: any){
  this.formValue.controls['orderNumber'].setValue(row.orderNumber);
  this.formValue.controls['Date'].setValue(row.Date);
  this.formValue.controls['Name'].setValue(row.Name);
  this.formValue.controls['address'].setValue(row.address);
  this.formValue.controls['phoneno'].setValue(row.phoneno);
 
}
}
