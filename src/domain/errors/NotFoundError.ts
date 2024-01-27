import { SerializebleStatic } from "../types.js";
import { DomainError } from "./DomainError.js";

export class NotFoundError extends DomainError {
  constructor(locator: any, entity: SerializebleStatic) {
    super(`Could not find ${entity.name} with id ${JSON.stringify(locator)}`, entity, {
      code: "NOT_FOUND",
      status: 404,
    });
  }
}
