import XLSX from "xlsx";

const env = process.env.VUE_APP_ENVIRONMENT;

export namespace helper {
  export namespace environment {
    export function isProduction(): boolean {
      return env === "production";
    }
  }

  export async function xlsToJson(file: File) {
    const mutations: any[] = [];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          /* Parse data */
          const bstr = e.target.result;

          const wb = XLSX.read(bstr, { type: "binary" });

          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];

          /* Convert array of arrays */
          const data: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

          // console.log(wsname);
          // console.log(ws);
          //   console.log(data);

          data.forEach((mutation, i) => {
            if (i !== 0) {
              const _mutation = {
                accountId: null,
                currency: null,
                transactionDate: null,
                interestDate: null,
                startingSaldo: null,
                endingSaldo: null,
                ammount: null,
                description: null,
              };
              _mutation.accountId = mutation[0];
              _mutation.currency = mutation[1];
              _mutation.transactionDate = mutation[2];
              _mutation.interestDate = mutation[3];
              _mutation.startingSaldo = mutation[4];
              _mutation.endingSaldo = mutation[5];
              _mutation.ammount = mutation[6];
              _mutation.description = mutation[7];

              mutations.push(_mutation as never);
            }
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
    return mutations;
  }
}
