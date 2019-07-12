export class Employee {
    hire_date:string;
    first_name: string;
    last_name: string;
    birth_date:string;
    constructor(json)
    {
        var d = new Date(json.hire_date);
       this.hire_date=d.toLocaleDateString();
       this.first_name=json.first_name;
       this.last_name=json.last_name;
       var d = new Date(json.birth_date);
       this.birth_date=d.toLocaleDateString();
    }
    
  
    
}
