import { Request, Response } from "express";
import { CreateUserService } from "../services/UserServices";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, email, phone, city, state } = request.body;

    const createUserService = new CreateUserService();

    try {
      await createUserService.create({
        username,
        email,
        phone,
        city,
        state
      }).then(() => {
        response.render("message", {
          message: "User registration succesfull"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `User registration failed: ${err.message}`
      });
    }

  }
}

import { DeleteUserService } from "../services/UserServices";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;

    const deleteUserService = new DeleteUserService();

    try {
      await deleteUserService.delete(id).then(() => {
        response.render("message", {
          message: "User delete succesfull"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `User delete failed: ${err.message}`
      });
    }
  }
}

import { GetUserDataService } from "../services/UserServices";

class GetUserDataController {
  async handle(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getUserDataService = new GetUserDataService();

    const user = await getUserDataService.getData(id);

    return response.render("edit", {
      user: user
    });
  }
}

export { GetUserDataController };

import { ListUsersService } from "../services/UserServices";

class ListUsersController {
  async handle(request: Request, response: Response) {
    const listUsersService = new ListUsersService();

    const users = await listUsersService.list();

    return response.render("index", {
      users: users
    });
  }
}

import { SearchUserService } from "../services/UserServices";

class SearchUserController {
  async handle(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchUserService = new SearchUserService();

    try {
      const users = await searchUserService.search(search);
      response.render("search", {
        users: users,
        search: search
      });
    } catch (err) {
      response.render("message", {
        message: `User search failed: ${err.message}`
      });
    }
  }
}

import { UpdateUserService } from "../services/UserServices";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id, username, email, phone, city, state } = request.body;

    const updateUserService = new UpdateUserService();

    try {
      await updateUserService.update({ id, username, email, phone, city, state }).then(() => {
        response.render("message", {
          message: "User update succefull"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `User update failed: ${err.message}`
      });
    }

  }
}
