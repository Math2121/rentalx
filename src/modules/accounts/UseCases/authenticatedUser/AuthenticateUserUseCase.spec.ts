import { ICreateUserDTO } from "src/modules/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticatedUseCase } from "./authenticatedUseCase"


let authenticateUserUseCase:AuthenticatedUseCase
let userRepositoryInMemory:UsersRepositoryInMemory
let createUserUseCase:CreateUserUseCase
describe("Authenticate User", () => {
    
    beforeEach(() => {
        userRepositoryInMemory  = new UsersRepositoryInMemory()
        authenticateUserUseCase = new AuthenticatedUseCase(userRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })
    
    it("should be able create an toker",async ()=>{
        const user:ICreateUserDTO = {
            driver_license:"000554",
            email:"math@21gmail.com",
            password:'1234',
            name:'User Test'
        }

        await createUserUseCase.create(user)
        const result = await authenticateUserUseCase.execute({
            email:user.email,
            password:user.password
        })
        expect(result).toHaveProperty("token")
    })
})