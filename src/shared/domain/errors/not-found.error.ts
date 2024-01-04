import { Entity } from "../entity";

export class NotFoundError extends Error {
  constructor(id: any[] | any, entityClass: new (...args: any[]) => Entity) {
    super(`${entityClass.name} with id ${id} not found`);
    this.name = "NotFoundError";
  }
}
