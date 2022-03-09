interface IDateProvider {
  compareInHorus(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  compareInDays(start_date:Date,end_date:Date): number;
  addDays(days:number):Date;
  addHours(hours:number):Date;
  compareIfBefore(start_date:Date,end_Date:Date):boolean;
}

export { IDateProvider };
