import { Request, Response, NextFunction } from "express";

import { userService } from "../services";
import { borrowReturnSchema, userSchema } from "../schemas";
import { validateRequestBody, TypedResponse } from "../utils";
import { UserResponse, UsersResponse } from "../types";

export const getAll = async (
  req: Request,
  res: TypedResponse<UsersResponse[]>,
  next: NextFunction
) => {
  try {
    const users = await userService.getAll(req, res);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: TypedResponse<UserResponse>,
  next: NextFunction
) => {
  try {
    const user = await userService.getOne(req, res);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateRequestBody(userSchema, req.body);

    await userService.createOne(req, res);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.deleteOne(req, res);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await userService.borrowBook(req, res);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateRequestBody(borrowReturnSchema, req.body);

    const response = await userService.returnBook(req, res);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
