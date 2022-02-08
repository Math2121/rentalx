import { ICreateCarDTO } from "../dtos/ICreateCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository{
    create(data:ICreateCarDTO):Promise<Car>
    findByLicensePlate(license_plate:string):Promise<Car>
    findAllAvailable(brand?:string,category_id?:string,name?:string):Promise<Car[]>
    findById(id:string):Promise<Car>
    updatedAvailable(id:string,available:boolean):Promise<void>
}

export {ICarsRepository}