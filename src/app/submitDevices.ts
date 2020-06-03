import { DeprecatedCurrencyPipe } from '@angular/common';


export class ContactInfo {
    phone_number: string;
    email_address: string;
    line_id: string;
}

export class EmLog {
    em_id: string;
    em_name: string;
    action:string;
    issus_time:number;
}

export class Fixnote {
    description: string;
    start_time:number;
    end_time: number;
}

export class FixInfo {
    status: string;
    em_log: EmLog[];
    device_status: string;
    fix_note: Fixnote ;
}
export class fix_em{
    em_id: string;
    em_name: string;
    contact_info: ContactInfo;
}
export class Submit_device {
    key: string;
    request_em:userLogin;
    // u_id: string;
    // u_name: string;
    // department: string;
    device: string;
    description: string;
    priotity: string;
    fix_info: FixInfo;
    fix_em:fix_em;
    submit_date: number;
    item_status: string;
    success:number;
}




export class userContact{
    phonenumber:string;
    email:string;
    lineID:string;
}
export class Depart{
    key:string;
    name:string;
    des:string;
}
export class userLogin{
    key:string;
    name:string;
    surname:string;
    fullname:string;
    contactInfo:userContact;
    department:Depart;
    status:string;
    username:string;
    password:string;
    active:number;
}