import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css']
})

export class SubmitPageComponent implements OnInit {
  submitForm:FormGroup;
  test:String;
  rd_select:boolean=false;
  devices:String;
  constructor(private router:Router,fb: FormBuilder,private http:HttpClient) { 
    this.submitForm = fb.group({
      rd_device:new FormControl(''),
      txt_rd:new FormControl(''),
      txt_des:new FormControl(''),
      rd_choices:new FormControl(''),
      department:new FormControl(''),
      txtU_Name:new FormControl('')
    })
  }
  ngOnInit() {
  }
  back_Clicked(){
    // window.alert(this.submitForm.value.txt_rd);
    this.router.navigate(['home']);
  }
  rd_changed(event:MatRadioChange){
    if(event.source.id=="rd03"){
      this.rd_select = true;
    }else{
      this.rd_select = false;
    }

  }
  submit(){
    if(this.rd_select){
      this.devices = this.submitForm.value.txt_rd;
    }else{
      this.devices = this.submitForm.value.rd_device;
    }
    let data = {"UID":"1001",
    "U_NAME":this.submitForm.value.txtU_Name,
    "DEPARTMENT":this.submitForm.value.department,
    "DEVICES":this.devices,
    "DESCRIPTION":this.submitForm.value.txt_des,
    "IMPORTANT":this.submitForm.value.rd_choices,
    "ITEM_STATUS":"1"
    }
    // window.alert(JSON.stringify(data));
    this.http.post<any>('http://localhost:8080/api/public/submit_devices',data).subscribe(data=>{
      if(data.res=="success"){
        window.alert("Successful");
      }else{
        window.alert(data.res);
      }
    },( err:HttpErrorResponse ) => {
      window.alert("canot submit data, please contact Administrator!")
    });
    
  }
}
