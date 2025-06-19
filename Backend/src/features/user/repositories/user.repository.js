import { CrudRepository } from "../../../shared/repositories/crud.repository.js";

 class UserRepository extends CrudRepository {
  constructor() {
    super("user");
  }
}

export const userRepo = new UserRepository();
