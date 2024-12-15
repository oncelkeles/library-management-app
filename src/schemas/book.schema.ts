import joi from "joi";

export const bookSchema = joi.object({
  name: joi.string().required(),
});
