import { CrudRepository } from "../../../shared/repositories/crud.repository.js";

class watchlistRepository extends CrudRepository {
  constructor() {
    super("mfWatchlist");
  }
}

export const watchlistRepo = new watchlistRepository();
