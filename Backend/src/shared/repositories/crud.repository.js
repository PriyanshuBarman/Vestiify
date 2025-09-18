import { db } from "../../../config/db.config.js";

export class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data, client = db) {
    try {
      const result = await client[this.model].create({ data });
      return result;
    } catch (error) {
      console.log(`❌ Error in create: ${error.message}`);
      throw error;
    }
  }

  async createMany(data, client = db) {
    try {
      const result = await client[this.model].createMany({ data });
      return result;
    } catch (error) {
      console.log(`❌ Error in create: ${error.message}`);
      throw error;
    }
  }

  async findUnique(where, options = {}, client = db) {
    try {
      const result = await client[this.model].findUnique({ where, ...options });
      return result;
    } catch (error) {
      console.log(`❌ Error in findUnique: ${error.message}`);
      throw error;
    }
  }

  async findFirst(where, options = {}, client = db) {
    try {
      const result = await client[this.model].findFirst({ where, ...options });
      return result;
    } catch (error) {
      console.log(`❌ Error in findFirst: ${error.message}`);
      throw error;
    }
  }

  async findMany(where, options = {}, client = db) {
    try {
      const result = await client[this.model].findMany({
        where,
        ...options,
      });
      return result;
    } catch (error) {
      console.log(`❌ Error in findMany: ${error.message}`);
      throw error;
    }
  }

  async update(where, data, client = db) {
    try {
      const result = await client[this.model].update({ where, data });
      return result;
    } catch (error) {
      console.log(`❌ Error in update: ${error.message}`);
      throw error;
    }
  }

  async updateMany(where, data, client = db) {
    try {
      const result = await client[this.model].updateMany({ where, data });
      return result;
    } catch (error) {
      console.log(`❌ Error in updateMany: ${error.message}`);
      throw error;
    }
  }

  async delete(where, client = db) {
    try {
      const result = await client[this.model].delete({ where });
      return result;
    } catch (error) {
      console.log(`❌ Error in delete: ${error.message}`);
      throw error;
    }
  }

  async deleteMany(where, client = db) {
    try {
      const result = await client[this.model].deleteMany({ where });
      return result;
    } catch (error) {
      console.log(`❌ Error in deleteMany: ${error.message}`);
      throw error;
    }
  }
}
