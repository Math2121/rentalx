import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}
@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("StorageProvider") private storageProvider:IStorageProvider,
    @inject("CarImagesRepository") private carsImagesRepository) {}
  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storageProvider.save(image,"cars")
    });
  }
}

export { UploadCarImageUseCase };
