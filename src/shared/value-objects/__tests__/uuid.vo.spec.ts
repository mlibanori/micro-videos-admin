import { Uuid } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";

describe("UUID Value Object Unit Test", () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

  test("Should throw an error if UUID is invalid", () => {
    expect(() => new Uuid("invalid-uuid")).toThrow("ID must be a valid UUID");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("Should create a valid UUID", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("Should accept a valid UUID", () => {
    const uuid = new Uuid("a3e0c1b9-3e3b-4a4c-8a1d-1c7b7f987bd1");
    expect(uuid.id).toBe("a3e0c1b9-3e3b-4a4c-8a1d-1c7b7f987bd1");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
