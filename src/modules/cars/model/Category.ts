import { randomUUID } from "node:crypto";

export default class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
