

export class ContactInfo {
    phone_number: string;
    email_address: string;
    line_id: string;
}

export class EmLog {
    em_id: string;
    em_name: string;
    contact_info: ContactInfo;
}

export class FixLog {
    description: string;
    start_time:Date;
    end_time: Date;
}

export class FixInfo {
    status: string;
    em_log: EmLog[];
    device_status: string;
    fix_log: FixLog[];
}

export class Submit_device {
    key: string;
    u_id: string;
    u_name: string;
    department: string;
    device: string;
    description: string;
    priotity: string;
    fix_info: FixInfo;
    submit_date: number;
    item_status: string;
}
export class userContact{
    phonenumber:string;
    email:string;
    lineID:string;
}
export class userLogin{
    key:string;
    name:string;
    surname:string;
    fullname:string;
    contactInfo:userContact;
    status:string;
    username:string;
    password:string;
    active:number;
}