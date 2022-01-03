import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";

class CarImageRepository implements ICarImagesRepository {
    private repository:Repository<CarImage>
    constructor(){
        this.repository = getRepository(CarImage)
    }
    create(car_id: string, image_name: string): Promise<CarImage> {
        throw new Error("Method not implemented.");
    }
}

export { CarImageRepository };
