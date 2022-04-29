import { randomUUID } from "node:crypto";

export default class Category {
  constructor() {
    if (!this.id) this.id = randomUUID();
  }
  id?: string;
  name: string;
  description: string;
  created_at: Date;
}
