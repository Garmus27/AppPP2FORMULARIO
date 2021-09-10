import { getCustomRepository } from "typeorm";
import { createQualifiedName } from "typescript";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUser {
  username: string;
  email: string;
  phone: string;
  city: string;
  state: string;
}

class CreateUserService {
  async create({ username, email, phone, city, state }: IUser) {
    if (!username || !email || !phone || !city || !state) {
      throw new Error("Por favor preencha todos os campos");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const usernameAlreadyExists = await usersRepository.findOne({ username });

    if (usernameAlreadyExists) {
      throw new Error("Username já está cadastrado");
    }

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("Email já está cadastrado");
    }

    const user = usersRepository.create({ username, email, phone, city, state });

    await usersRepository.save(user);

    return user;

  }
}
export { CreateUserService };
 
class DeleteUserService {
  async delete(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();

    return user;

  }
}
export { DeleteUserService };

class GetUserDataService {
  async getData(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    return user;
  }
}
export { GetUserDataService };

class ListUsersService {
  async list() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }
}
export { ListUsersService };

class SearchUserService {
  async search(search: string) {
    if (!search) {
      throw new Error("Por favor preencha o campo de busca");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .where("username like :search", { search: `%${search}%` })
      .orWhere("email like :search", { search: `%${search}%` })
      .orWhere("phone like :search", { search: `%${search}%` })
      .orWhere("city like :search", { search: `%${search}%` })
      .orWhere("state like :search", { search: `%${search}%` })
      .getMany();
    return user;
  }
}
export { SearchUserService };

interface IUser {
  id?: string
  username: string;
  email: string;
  phone: string;
  city: string;
  state: string;
}

class UpdateUserService {
  async update({ id, username, email, phone, city, state }: IUser) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ username, email, phone, city, state })
      .where("id = :id", { id })
      .execute();
    return user;
  }
}
export { UpdateUserService };




