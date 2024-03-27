import Mutation from "./Mutation";

export default class Option {
  name: string | undefined;
  code: string | undefined;

  constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }
}
