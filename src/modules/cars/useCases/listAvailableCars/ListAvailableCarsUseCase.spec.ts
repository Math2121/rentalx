import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
let listCarUseCase:ListAvailableCarsUseCase
let carsRepositoryInMemory:CarsRepositoryInMemory
describe("ListCars",()=>{
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listCarUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);

    })

    it("should be able list all cars available",async()=>{
       const car = await carsRepositoryInMemory.create({
            name:"Fiesta Uno",
            license_plate:"DEF-155",
            brand:"Sedan",
            daily_rate:20.00,
            description:"Carro bacana",
            category_id:"category_id",
            fine_amount:50
        })

       
        const cars = await listCarUseCase.execute({});
        expect(cars).toEqual([car])
    })
    it("should be able to list all availablke cars by brand",async()=>{
        const car = await carsRepositoryInMemory.create({
            name:"Fiesta 2",
            license_plate:"DEF-155",
            brand:"Sedan",
            daily_rate:20.00,
            description:"Carro bacana",
            category_id:"category_id",
            fine_amount:50
        })

       
        const cars = await listCarUseCase.execute({
            brand:"Sedan"
        });

        expect(cars).toEqual([car]) 
    })

    it("should be able to list all availablke cars by name",async()=>{
        const car = await carsRepositoryInMemory.create({
            name:"Fiesta 5",
            license_plate:"DEF-155",
            brand:"Sedan",
            daily_rate:20.00,
            description:"Carro bacana",
            category_id:"category_id",
            fine_amount:50
        })

       
        const cars = await listCarUseCase.execute({
            name:"Fiesta 5"
        });

        expect(cars).toEqual([car]) 
    })
    it("should be able to list all availablke cars by category_id",async()=>{
        const car = await carsRepositoryInMemory.create({
            name:"Fiesta 5",
            license_plate:"DEF-155",
            brand:"Sedan",
            daily_rate:20.00,
            description:"Carro bacana",
            category_id:"5555",
            fine_amount:50
        })

       
        const cars = await listCarUseCase.execute({
            category_id:"5555"
        });

        expect(cars).toEqual([car]) 
    })
})