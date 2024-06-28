export class Developers {


  public id: number
   public firstName: string
   public lastName: string
   public  dob: number
   public email: string
   public phone:number
   public  notes: string
   public startDate: number
   public  endDate: number
   public repeatEvery: number
   public category: number

   constructor(id:number,
     firstName: string,
               laName: string,
               dbirth: number,
               emaiil:string,
               phonee:number,
               notee:string,
               startDate:number,
               endDate:number,
               repeatEvery:number,
               category:number) {
      this.id=id
     this.firstName =firstName ;
     this.lastName = laName;
     this.dob = dbirth;
     this.email = emaiil;
     this.phone=phonee;
     this.notes=notee;
     this.startDate=startDate;
     this.endDate=endDate;
     this.repeatEvery=repeatEvery;
     this.category=category
   }
   // "address": string,
   // "city": string,
   // "zip": string,
   // "country": string,
   // "salary": number,
   // "currency": string,
   // "hireDate": number,
   // "resignDate": number,
   // "trialPeriod": number,
   // "resignPeriod": number,
   // "endTrialDate": number,
   // "effectiveResignDate": number,
   // "status": string,
   // "employeeHistoryId": number,
   // "note": string,
   // "employeeId": number,
   // "category": number,
   // "schedulerId": number,
   // "schedulerEnabled": true,
   // "startDate": number,
   // "endDate": number,
   // "repeatEvery": number
 }
