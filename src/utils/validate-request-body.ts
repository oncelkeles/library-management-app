import joi from "joi";

import { HttpError } from "./custom-error";

export const validateRequestBody = (
  schema: joi.ObjectSchema<any>,
  reqBody: any
) => {
  const { error } = schema.validate(reqBody);
  if (error) {
    throw new HttpError("Invalid input.", 400, error.details);
  }
};
