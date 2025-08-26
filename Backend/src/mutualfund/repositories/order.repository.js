import { CrudRepository } from "../../shared/repositories/crud.repository.js";

class OrderRepository extends CrudRepository {
  constructor() {
    super("mfOrder");
  }
}

export const orderRepo = new OrderRepository();
