import { Request, Response } from "express";
import { UserDTO } from "../model/DTO/UserDTO";
import { UserRepository } from "../repository/UserRepository";
import { UserService } from "../service/UserService";

export default {
  async post(req: Request, resp: Response) {
    const userServ = new UserService(new UserRepository());
    const { name, lastName, password, phone } = req.body as UserDTO;

    await userServ.postCreateUser({
      name,
      lastName,
      password,
      phone,
    });
    return resp.json();
  },
};
