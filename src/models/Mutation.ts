import moment from "moment";
import Bankaccount from "./BankAccount";
import BankAccountCategory from "./BankAccountCategory";
import BankAccountCreditor from "./BankAccountCreditor";

export default class Mutation {
  id: string;
  lineId: number;
  bankAccountId: number;
  currency: string;
  transactionDate: Date;
  interestDate: Date;
  startingSaldo: number;
  endingSaldo: number;
  ammount: number;
  description: string;
  bankAccount: Bankaccount | null;
  category: BankAccountCategory | null;
  creditor: BankAccountCreditor | null;

  constructor() {
    this.id = "";
    this.lineId = 0;
    this.bankAccountId = 0;
    this.currency = "";
    this.transactionDate = moment().toDate();
    this.interestDate = moment().toDate();
    this.startingSaldo = 0;
    this.endingSaldo = 0;
    this.ammount = 0;
    this.description = "";
    this.bankAccount = null;
    this.category = null;
    this.creditor = null;
  }

  fromArray(lineId: number, mutation: any[]) {
    this.lineId = lineId;
    this.bankAccountId = mutation[0];
    this.currency = mutation[1];
    this.transactionDate = moment(mutation[2], "YYYYMMDD").utc().toDate();
    this.interestDate = moment(mutation[2], "YYYYMMDD").utc().toDate();
    this.startingSaldo = mutation[4];
    this.endingSaldo = mutation[5];
    this.ammount = mutation[6];
    this.description = mutation[7];
  }
}
