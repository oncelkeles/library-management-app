import joi from "joi";

export const userSchema = joi.object({
  name: joi.string().required(),
});
