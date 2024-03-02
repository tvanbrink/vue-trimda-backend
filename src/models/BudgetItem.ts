export default interface BudgetItem {
  id: string;
  description: string;
  targetValue: number;
  consumedValue: number;
  consumedPercentage: number;
}
