import joi from "joi";

export const borrowReturnSchema = joi.object({
  score: joi.number().required().min(0).max(10),
});
