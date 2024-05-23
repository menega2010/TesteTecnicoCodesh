import { v4 as uuid } from "uuid";

export class TabUserEntitie {
  public id!: string;
  public name!: string;
  public lastName!: string;
  public password!: string;
  public phone!: string;
  public created_at!: string;
  public updated_at!: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
