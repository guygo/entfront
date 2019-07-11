export class Employee {
    hireDate:string;
    firstName: string;
    lastName: string;
    birthDate:string;
    constructor(json)
    {
        var d = new Date(json.hire_date);
       this.hireDate=d.toDateString();
       this.firstName=json.first_name;
       this.lastName=json.last_name;
       var d = new Date(json.birth_date);
       this.birthDate=d.toDateString()
    }
    
  
    
}
