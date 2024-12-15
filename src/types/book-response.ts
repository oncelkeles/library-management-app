import { BaseItemResponse } from "./base-item-response";

export interface BooksResponse extends BaseItemResponse {}

export interface BookResponse extends BooksResponse {
  score: string | number;
}
