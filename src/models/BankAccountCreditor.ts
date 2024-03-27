import BankAccountCategory from "./BankAccountCategory";

export default class BankAccountCreditor {
  id: string;
  name: string;
  defaultCategory: BankAccountCategory;

  constructor(id: string, name: string, defaultCategory: BankAccountCategory) {
    this.id = id;
    this.name = name;
    this.defaultCategory = defaultCategory;
  }
}
