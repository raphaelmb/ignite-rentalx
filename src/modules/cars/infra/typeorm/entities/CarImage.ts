import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { randomUUID } from "node:crypto";

@Entity("cars_image")
export default class CarImage {
  @PrimaryColumn()
  id: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
