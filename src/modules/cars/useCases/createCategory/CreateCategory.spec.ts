import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe("Create Category", () => {
  // instanciar classes necessárias para os testes
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "description test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryExists = await categoriesRepositoryInMemory.findByName(
      category.name
    );
    //Espero que a categoria tenha o id
    expect(categoryExists).toHaveProperty("id");
  });

  it("Should not be able to create a new category with same name", async () => {
    const category = {
      name: "Category Test",
      description: "description test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });
    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError("Category already exists!"));
  });
});
