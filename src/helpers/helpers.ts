import XLSX from "xlsx";
import Mutation from "@/models/Mutation";
import { Ref } from "vue";
import moment from "moment";

const env = process.env.VUE_APP_ENVIRONMENT;

export namespace helper {
  export namespace utils {
    export function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  }

  // const dateTime = (date: Date): string => {
  //   return moment(date).locale("nl").format("ddd D MMMM").replace(".", "");
  // };

  export namespace format {
    export function dateTime(date: Date, format: string): string {
      return moment(date).locale("nl").format(format).replace(".", "");
    }
    export function toCurrency(number: Number, symbol: boolean): string {
      let response: string = number
        .toLocaleString(undefined, {
          currency: "EUR",
          useGrouping: true,
          // style: "currency",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        .replace("-", "- ");

      if (symbol) {
        response = "€ " + response;
      }

      return response;
    }
  }
  export namespace environment {
    export function isProduction(): boolean {
      return env === "production";
    }
  }

  export namespace convert {
    export async function xlsToJson(mutations: Mutation[], file: File) {
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result instanceof ArrayBuffer) {
            /* Parse data */
            const bstr = e.target.result;

            const wb = XLSX.read(bstr, { type: "binary" });

            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];

            /* Convert array of arrays */
            const data: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

            data.forEach((item, i) => {
              if (i !== 0) {
                const mutation = new Mutation();

                mutation.fromArray(i, item);

                mutations.push(mutation as never);
              }
            });
          }
        };

        reader.readAsArrayBuffer(file);
      }
    }
  }
}
