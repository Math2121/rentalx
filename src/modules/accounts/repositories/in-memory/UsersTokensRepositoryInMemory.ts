import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokenRepository } from "../IUsersTokenRepository";

class UsersTokensRepositoryInMemory implements IUsersTokenRepository {
  usersTokens: UserTokens[] = [];
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }
  async findByUserIdAndRefershToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (item) => item.user_id === user_id && item.refresh_token && refresh_token
    );
    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((item) => item.id === id);

    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (item) => item.refresh_token === refresh_token
    );
    return userToken;
  }
}
export {UsersTokensRepositoryInMemory}