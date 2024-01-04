import { Entity } from "../../../domain/entity";
import { NotFoundError } from "../../../domain/errors/not-found.error";
import { IRepository } from "../../../domain/repository/repository-interface";
import { ValueObject } from "../../../domain/value-object";

export abstract class InMemoryRepository<
  E extends Entity,
  VO extends ValueObject
> implements IRepository<E, VO>
{
  items: E[] = [];
  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async bulkInsert(entities: E[]): Promise<void> {
    this.items.push(...entities);
  }
  async update(entity: E): Promise<void> {
    const index: number = this._findIndex(entity.entity_id);
    this.items[index] = entity;
  }
  async delete(entity_id: VO): Promise<void> {
    const index: number = this._findIndex(entity_id);
    this.items.splice(index, 1);
  }
  async findById(entity_id: VO): Promise<E> {
    const index: number = this._findIndex(entity_id);
    return this.items[index];
  }
  async findAll(): Promise<E[]> {
    return this.items;
  }
  protected _findIndex(entity_id: ValueObject): number {
    const indexFound = this.items.findIndex((item) =>
      item.entity_id.equals(entity_id)
    );
    if (indexFound === -1) {
      throw new NotFoundError(entity_id, this.getEntity());
    }
    return indexFound;
  }
  abstract getEntity(): new (...args: any[]) => E;
}
