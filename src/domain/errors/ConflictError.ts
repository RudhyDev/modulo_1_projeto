import { SerializebleStatic } from "../types.js";
import { DomainError } from "./DomainError.js";

export class ConflictError extends DomainError {
  constructor(locator: any, entity: SerializebleStatic) {
    super(`Could not find ${entity.name} with locator ${JSON.stringify(locator)}`, entity, {
        code: "CONFLICT",
        status: 409,
    });
  }
}
