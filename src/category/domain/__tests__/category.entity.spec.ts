import { Uuid } from "../../../shared/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category Unit Test", () => {
  test("Should create a category with name field only", () => {
    const category = new Category({
      name: "Movie",
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe("Movie");
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  test("Should create a category with name and description field", () => {
    const category = new Category({
      name: "Movie",
      description: "Movie description",
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("Movie description");
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  test("Should create a category with name, description, is_active and created_at field", () => {
    const date = new Date();
    const category = new Category({
      name: "Movie",
      description: "Movie description",
      is_active: false,
      created_at: date,
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("Movie description");
    expect(category.is_active).toBeFalsy();
    expect(category.created_at).toBe(date);
  });

  test("Should create a category with create static method", () => {
    const category = Category.create({
      name: "Movie",
      description: "Movie description",
      is_active: false,
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("Movie description");
    expect(category.is_active).toBeFalsy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  test("Should change name", () => {
    const category = Category.create({
      name: "Movie",
      description: "Movie description",
      is_active: false,
    });
    category.changeName("Movie 2");
    expect(category.name).toBe("Movie 2");
  });

  test("Should change description", () => {
    const category = Category.create({
      name: "Movie",
      description: "Movie description",
      is_active: false,
    });
    category.changeDescription("Movie description 2");
    expect(category.description).toBe("Movie description 2");
  });

  test("Should activate category", () => {
    const category = Category.create({
      name: "Movie",
      description: "Movie description",
      is_active: false,
    });
    category.activate();
    expect(category.is_active).toBeTruthy();
  });

  test("Should deactivate category", () => {
    const category = Category.create({
      name: "Movie",
      description: "Movie description",
      is_active: true,
    });
    category.deactivate();
    expect(category.is_active).toBeFalsy();
  });

  test("Should return a JSON", () => {
    const date = new Date();
    const category = Category.create({
      name: "Movie",
      description: "Movie description",
      is_active: true,
      created_at: date,
    });
    expect(category.toJSON()).toEqual({
      category_id: category.category_id.id,
      name: "Movie",
      description: "Movie description",
      is_active: true,
      created_at: date,
    });
  });
});
