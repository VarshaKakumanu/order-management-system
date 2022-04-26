import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { OrderModel } from './orders board model';



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

  constructor(private formbuilder: FormBuilder,private service:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      orderNumber : [''],
      date : [''],
      name : [''],
      address : [''],
      phoneno : ['']
    })
    this.getAllOrder();
  }
  postOrderDetails(){
    this.OrderModelObj.ordernumber = this.formValue.value.orderNumber;
    this.OrderModelObj.Date =this.formValue.value.date;
    this.OrderModelObj.name =this.formValue.value.name;
    this.OrderModelObj.address =this.formValue.value.address;
    this.OrderModelObj.phone =this.formValue.value.phoneno;
    //console.log(this.OrderModelObj);
    //this.OrderModelObj.ordernumber = 4;
    //this.OrderModelObj.Date =new Date();
    //this.OrderModelObj.name ='98';
    //this.OrderModelObj.address ='789';
    //this.OrderModelObj.phone ="88";
  
    this.service.postOrder(this.OrderModelObj)
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
  this.service.getOrder()
  .subscribe((res: any)=>{
    this.orderData= res;   

  })
}
deleteOrder(row : any){
  console.log(row,"want")
  this.service.deleteOrder(row.id)
  .subscribe((res: any)=>{
    alert("order deleted");
    this.getAllOrder();
  })
}
onEdit(row: any){
  console.log(row,"edit")
  this.formValue.controls['orderNumber'].setValue(row.ordernumber);
  this.formValue.controls['date'].setValue(row.Date);
  this.formValue.controls['name'].setValue(row.name);
  this.formValue.controls['address'].setValue(row.address);
  this.formValue.controls['phoneno'].setValue(row.phone);
 
}
updateDetails(){
  this.OrderModelObj.ordernumber = this.formValue.value.orderNumber;
  this.OrderModelObj.Date =this.formValue.value.date;
  this.OrderModelObj.name =this.formValue.value.name;
  this.OrderModelObj.address =this.formValue.value.address;
  this.OrderModelObj.phone =this.formValue.value.phoneno;

  this.service.updateOrder(this.OrderModelObj,this.OrderModelObj.id+1).subscribe((res: any)=>{
    console.log(res);
    alert("updated successfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllOrder();
  },
      (  _err: any)=>{
    alert("something went wrong");
  })
  this.getAllOrder()
}
}
