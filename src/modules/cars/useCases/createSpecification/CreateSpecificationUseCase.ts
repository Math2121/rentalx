import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
interface IRequest {
  name: string;
  description: string;
}
class CreateSpecificationUseCase {
  constructor(private categoriesRepository: ISpecificationsRepository) {}
  
  execute({ name, description }: IRequest):void {

    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
