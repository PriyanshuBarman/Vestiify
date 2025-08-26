import { CrudRepository } from "../../shared/repositories/crud.repository.js";

class WatchlistRepository extends CrudRepository {
  constructor() {
    super("mfWatchlist");
  }
}

export const watchlistRepo = new WatchlistRepository();
