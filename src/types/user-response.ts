import { BaseItemResponse } from "./base-item-response";

export interface UsersResponse extends BaseItemResponse {}

export interface UserResponse extends UsersResponse {
  books: {
    past: { title: string; userScore: number }[];
    present: { title: string }[];
  };
}
