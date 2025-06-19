import { db } from "../../config/db.config.js";

export class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const user = await db[this.model].create({ data });
      return user;
    } catch (error) {
      console.log(
        `♾️Error occurred at CrudRepository repository - create method: ${error.message}`
      );
      throw error;
    }
  }

  async findUnique(where, options = {}) {
    try {
      const result = await db[this.model].findUnique({ where, ...options });
      return result;
    } catch (error) {
      console.log(
        `♾️Error occurred at CrudRepository repository - findUnique method: ${error.message}`
      );
      throw error;
    }
  }

  async findFirst(where) {
    try {
      const result = await db[this.model].findFirst({ where });
      return result;
    } catch (error) {
      console.log(
        `♾️Error occurred at CrudRepository repository - findUnique method: ${error.message}`
      );
      throw error;
    }
  }

  async findMany(where, options = {}) {
    try {
      const result = await db[this.model].findMany({
        where,
        orderBy: options.orderBy || undefined,
        take: options.take || undefined,
        skip: options.skip || undefined,
      });
      return result;
    } catch (error) {
      console.log(
        `♾️Error occurred at CrudRepository repository - findMany method: ${error.message}`
      );
      throw error;
    }
  }

  async update(where, data) {
    try {
      await db[this.model].update({ where, data });
    } catch (error) {
      console.log(
        `♾️Error occurred at CrudRepository repository - update method: ${error.message}`
      );
      throw error;
    }
  }
  async updateMany(where, data) {
    try {
      await db[this.model].updateMany({ where, data });
    } catch (error) {
      console.log(
        `♾️Error occurred at CrudRepository repository - updateMany method: ${error.message}`
      );
      throw error;
    }
  }

  async delete(where) {
    try {
      await db[this.model].delete({ where });
    } catch (error) {
      console.log(
        `♾️Error occurred at CrudRepository repository - delete method: ${error.message}`
      );
      throw error;
    }
  }

  async deleteMany(where) {
    try {
      await db[this.model].deleteMany({ where });
    } catch (error) {
      console.log(
        `♾️Error occurred at CrudRepository repository - deleteMany method: ${error.message}`
      );
      throw error;
    }
  }
}
