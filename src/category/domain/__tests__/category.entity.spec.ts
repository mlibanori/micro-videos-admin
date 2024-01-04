import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category Unit Test", () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category.prototype, "validate");
  });

  test("Should create a category with name field only", () => {
    const category = new Category({
      name: "Movie",
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe("Movie");
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  test("Should throw an error if UUID is invalid", () => {
    expect(() => {
      new Category({
        category_id: new Uuid("invalid-uuid"),
        name: "Movie",
      });
    }).toThrow();
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
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("Should change name", () => {
    const category = Category.create({
      name: "Movie",
      description: "Movie description",
      is_active: false,
    });
    category.changeName("Movie 2");
    expect(category.name).toBe("Movie 2");
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test("Should change description", () => {
    const category = Category.create({
      name: "Movie",
      description: "Movie description",
      is_active: false,
    });
    category.changeDescription("Movie description 2");
    expect(category.description).toBe("Movie description 2");
    expect(validateSpy).toHaveBeenCalledTimes(2);
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
    expect(validateSpy).toHaveBeenCalledTimes(1);
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

  test("Should return entity_id", () => {
    const category = Category.create({
      name: "Movie",
      description: "Movie description",
      is_active: true,
    });
    expect(category.entity_id).toEqual(category.category_id);
  });
});

describe("Category Validator Unit Test", () => {
  describe("create command", () => {
    test.each([
      [
        null,
        [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      ],
      ["", ["name should not be empty"]],
      [
        "a".repeat(256),
        ["name must be shorter than or equal to 255 characters"],
      ],
    ])(
      "Should return invalid category with name property",
      (name, expectedErrorMessages) => {
        expect(() => Category.create({ name })).containsErrorMessages({
          name: expectedErrorMessages,
        });
      }
    );

    test("Should return invalid category with description property", () => {
      expect(() =>
        Category.create({ name: "kk", description: 123 as any })
      ).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    test.each([
      ["active", ["is_active must be a boolean value"]],
      [null, ["is_active must be a boolean value"]],
      [undefined, ["is_active must be a boolean value"]],
    ])(
      "Should return invalid category with is_active property",
      (is_active, expectedErrorMessages) => {
        expect(() =>
          Category.create({ name: "name", is_active: is_active as any })
        ).containsErrorMessages({
          is_active: expectedErrorMessages,
        });
      }
    );
  });
});
