import { CrudRepository } from "./crud.repository.js";

 class UserRepository extends CrudRepository {
  constructor() {
    super("user");
  }
}

export const userRepo = new UserRepository();
