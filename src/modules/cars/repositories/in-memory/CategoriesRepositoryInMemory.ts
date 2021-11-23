import { getRepository } from "typeorm";
import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private repository: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.repository.find((category) => category.name === name);
    return category;
  }
  async list(): Promise<Category[]> {
    const all = this.repository;
    return all;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });
    this.repository.push(category);
  }
}
export { CategoriesRepositoryInMemory };
