export default interface BankAccountGoal {
  id: string;
  bankAccountId: string;
  categoryId: string;
  month: string;
  name: string;
  total: number;
  goal: number;
  income: boolean;
}
