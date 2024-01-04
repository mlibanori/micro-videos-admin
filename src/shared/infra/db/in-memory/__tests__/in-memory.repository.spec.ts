import { Entity } from "../../../../domain/entity";
import { NotFoundError } from "../../../../domain/errors/not-found.error";
import { Uuid } from "../../../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "../in-memory.repository";

class StubEntity extends Entity {
  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      age: this.age,
    };
  }
  constructor(public entity_id: Uuid, public name: string, public age: number) {
    super();
  }
}
class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
  constructor() {
    super();
  }
}
describe("InMemory Repository Unit Test", () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  test("Should insert a new entity", async () => {
    const entity = new StubEntity(new Uuid(), "John Doe", 30);
    await repository.insert(entity);
    expect(repository.items.length).toBe(1);
    expect(repository.items[0]).toBe(entity);
  });

  test("Should bulk insert entities", async () => {
    const entities = [
      new StubEntity(new Uuid(), "John Doe", 30),
      new StubEntity(new Uuid(), "Jane Doe", 25),
    ];
    await repository.bulkInsert(entities);
    expect(repository.items.length).toBe(2);
    expect(repository.items[0]).toBe(entities[0]);
    expect(repository.items[1]).toBe(entities[1]);
  });

  test("Should update an entity", async () => {
    const entity = new StubEntity(new Uuid(), "John Doe", 30);
    await repository.insert(entity);
    entity.name = "Jane Doe";
    await repository.update(entity);
    expect(repository.items.length).toBe(1);
    expect(repository.items[0]).toBe(entity);
  });

  test("Should delete an entity", async () => {
    const entity = new StubEntity(new Uuid(), "John Doe", 30);
    await repository.insert(entity);
    await repository.delete(entity.entity_id);
    expect(repository.items.length).toBe(0);
  });

  test("Should find an entity by id", async () => {
    const entity = new StubEntity(new Uuid(), "John Doe", 30);
    await repository.insert(entity);
    const entityFound = await repository.findById(entity.entity_id);
    expect(entityFound).toBe(entity);
  });

  test("Should find all entities", async () => {
    const entities = [
      new StubEntity(new Uuid(), "John Doe", 30),
      new StubEntity(new Uuid(), "Jane Doe", 25),
    ];
    await repository.bulkInsert(entities);
    const entitiesFound = await repository.findAll();
    expect(entitiesFound).toEqual(entities);
  });

  test("Should throw an error if entity is not found", async () => {
    const invalidUuid = new Uuid();
    await expect(repository.findById(invalidUuid)).rejects.toThrow(
      new NotFoundError(invalidUuid, StubEntity)
    );
  });
});
