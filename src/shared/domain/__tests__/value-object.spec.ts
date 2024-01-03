import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly value: string, readonly value2: number) {
    super();
  }
}

describe("Value Object Unit Test", () => {
  test("Should be equals", () => {
    const vo1 = new StringValueObject("test");
    const vo2 = new StringValueObject("test");
    expect(vo1.equals(vo2)).toBeTruthy();

    const vo3 = new ComplexValueObject("test", 1);
    const vo4 = new ComplexValueObject("test", 1);
    expect(vo3.equals(vo4)).toBeTruthy();
  });

  test("Should not be equals", () => {
    const vo1 = new StringValueObject("test");
    const vo2 = new StringValueObject("test2");
    expect(vo1.equals(vo2)).toBeFalsy();

    const vo3 = new ComplexValueObject("test", 1);
    const vo4 = new ComplexValueObject("test", 2);
    expect(vo3.equals(vo4)).toBeFalsy();
    expect(vo1.equals(vo3)).toBeFalsy();

    const vo5 = new StringValueObject("test");
    expect(vo5.equals(null as any)).toBeFalsy();
  });
});
