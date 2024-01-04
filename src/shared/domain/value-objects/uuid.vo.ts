import { ValueObject } from "../value-object";
import { v4 as uuidV4, validate as uuidValidate } from "uuid";

export class Uuid extends ValueObject {
  readonly id: string;
  constructor(id?: string) {
    super();
    this.id = id || uuidV4();
    this.validate();
  }

  private validate(): boolean {
    const isValid = uuidValidate(this.id);
    if (!isValid) {
      throw new InvalidUuidError();
    }
    return isValid;
  }

  toString(): string {
    return this.id;
  }
}

export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || "ID must be a valid UUID");
    this.name = "InvalidUuidError";
  }
}
