export class Employee {
    id:string;
    hire_date:Date;
    first_name: string;
    last_name: string;
    birth_date:Date;
    imageUrl:any;
    gender:string;
    constructor(json)
    {
       this.id=json.emp_no;
       this.hire_date=new Date(json.hire_date);
       this.first_name=json.first_name;
       this.last_name=json.last_name;
       this.imageUrl=json.image_url;
       this.birth_date=new Date(json.birth_date);
       this.gender=json.gender;
    }
    
  
    
}
