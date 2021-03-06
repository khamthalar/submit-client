import { Injectable } from '@angular/core';
import { Submit_device, userLogin } from './submitDevices';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

// import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { AngularFirestore } from "angularfire2/firestore";



@Injectable({
  providedIn: 'root'
})
export class FirbaseServiceService {

  private devicePath = '/DevicesSubmitted';
  private userPath = '/user';
  submitDeviceRef:AngularFireList<Submit_device>=null;
  submitUserRef:AngularFireList<userLogin>=null;
  constructor(private db:AngularFireDatabase, private ags:AngularFirestore) { 
    this.submitDeviceRef = db.list(this.devicePath);
    this.submitUserRef = db.list(this.userPath);
  }
  // createSubmitDevice(device:Submit_device){
  //   this.submitDeviceRef.push(device);
  // }

  // getSubmitDeviceList():AngularFireList<Submit_device>{
  //   return this.db.list(this.devicePath,ref=>ref.orderByChild('success').equalTo(0));
  // }
  // createUser(user:userLogin){
  //   this.submitUserRef.push(user);
  // }
  // getUserDetial(username:string):AngularFireList<userLogin>{
  //   return this.db.list(this.userPath,ref=>ref.orderByChild('username').equalTo(username));
  // }
  // getUserList():AngularFireList<userLogin>{
  //   return this.submitUserRef;
  // }
  // getActiveUser():AngularFireList<userLogin>{
  //   return this.db.list(this.userPath,ref=>ref.orderByChild('active').equalTo(1));
  // }

  // setUserStatus(key:string,status:string,active:number){
  //   this.db.object<userLogin>(this.userPath+'/'+key).update({'status':status,'active':active});
  // }
  updateSubmitItem(key:string,data:any){
    this.db.object<Submit_device>(this.devicePath+'/'+key).update(data);
  }

  // fire store
  getUser(username:string){
    return this.ags.collection("user",ref=>ref.where("username","==",username));
  }
  createUsers(user:userLogin){
    this.ags.collection("user").add(JSON.parse(JSON.stringify(user)));
  }
  getActiveUsers(){
    return this.ags.collection("user",ref=>ref.where("active","==",1).orderBy('department.name',"asc"));
  }
  changeUserStatus(key:string,status:string,active:number){
    this.ags.collection("user").doc(key).update({'status':status,'active':active})
  }

  createSubmitDevices(device:Submit_device){
    this.ags.collection("DevicesSubmitted").add(JSON.parse(JSON.stringify(device)));
  }

  getSubmitDevice_list(){
    return this.ags.collection("DevicesSubmitted",ref=>ref.where('success','==',0).orderBy('priotity','desc'));
  }
  getSubmitDevice_list_by_user(){
    return this.ags.collection("DevicesSubmitted",ref=>ref
                .where("success","==",0)
                .orderBy('priotity','desc')
    );
  }

  updateItem(key:string,data:any){
    this.ags.collection("DevicesSubmitted").doc(key).update(JSON.parse(JSON.stringify(data)));
    
  }

  getDeviceItem(key:string){
    return this.ags.collection("DevicesSubmitted").doc(key);
  }

  getAllFixedDevices(startdate:number,enddate:number){
    return this.ags.collection("DevicesSubmitted",ref=>ref
                .where("success","==",1)
                .where("submit_date",">=",startdate)
                .where("submit_date","<=",enddate).orderBy('submit_date','desc'));
  }
  getFixedDevices(startdate:number,enddate:number,Depart:string){
    if(startdate==null || enddate == null){
      if(Depart == null){
        return this.ags.collection("DevicesSubmitted",ref=>ref
                .where("success","==",1).orderBy('submit_date','desc'));
      }else{
        return this.ags.collection("DevicesSubmitted",ref=>ref
                .where("success","==",1)
                .where("request_em.department.name","==",Depart).orderBy('submit_date','desc'));
      }
    }else{
      if(Depart==null){
        return this.ags.collection("DevicesSubmitted",ref=>ref
                .where("success","==",1)
                .where("submit_date",">=",startdate)
                .where("submit_date","<=",enddate).orderBy('submit_date','desc'));
      }else{
        return this.ags.collection("DevicesSubmitted",ref=>ref
                .where("success","==",1)
                .where("submit_date",">=",startdate)
                .where("submit_date","<=",enddate)
                .where("request_em.department.name","==",Depart).orderBy('submit_date','desc'));
      }
    }
  }
  getAllFixedDevicesNoDate(){
    return this.ags.collection("DevicesSubmitted",ref=>ref
                .where("success","==",1).orderBy('submit_date','desc'));
  }
  getDepart(){
    return this.ags.collection("department",ref=>ref.orderBy('name','desc'));
  }
 
}
