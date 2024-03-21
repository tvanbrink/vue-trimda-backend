import BankAccountCreditor from "./BankAccountCreditor";
import BankAccountCategory from "./BankAccountCategory";

export default interface Bankaccount {
  id: string;
  description: string;
  primary: boolean;
  bankAccountCategories: BankAccountCategory[];
  bankAccountCreditors: BankAccountCreditor[];
}
