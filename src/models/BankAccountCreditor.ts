import BankAccountCategory from "./BankAccountCategory";

export default interface BankAccountCreditor {
  id: string;
  name: string;
  defaultCategory: BankAccountCategory;
}
