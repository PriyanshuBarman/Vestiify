import { CrudRepository } from "./crud.repository.js";

class ProfileRepository extends CrudRepository {
  constructor() {
    super("profile");
  }
}

export const profileRepo = new ProfileRepository();
