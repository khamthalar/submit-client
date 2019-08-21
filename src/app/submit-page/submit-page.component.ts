import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css']
})
export class SubmitPageComponent implements OnInit {
  submitForm:FormGroup;
  test:String;
  rd_select:boolean=false;
  constructor(private router:Router,fb: FormBuilder) { 
    this.submitForm = fb.group({
      rd_device:new FormControl(''),
      txt_rd:new FormControl(''),
      txt_des:new FormControl(''),
      rd_choices:new FormControl('')
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
}
