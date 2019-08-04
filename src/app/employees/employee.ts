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
       this.id=json._id;
       this.hire_date=new Date(json.hireDate);
       this.first_name=json.firstName;
       this.last_name=json.lastName;
       this.imageUrl=json.imgUrl;
       this.birth_date=new Date(json.birthDate);
       this.gender=json.gender;
    }
    
  
    
}
