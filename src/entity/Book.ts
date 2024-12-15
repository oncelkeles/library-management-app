import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ default: 0 })
  total_score: number;

  @Column({ default: 0 })
  users_read: number;
}
