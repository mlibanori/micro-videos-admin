import { FieldsErrors } from "./validators/validator-fields-interface";

export class EntityValidationError extends Error {
  constructor(public errors: FieldsErrors, message = "Validation Error") {
    super();
  }
}
