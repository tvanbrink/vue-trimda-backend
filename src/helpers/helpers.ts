const env = process.env.VUE_APP_ENVIRONMENT;

export namespace helper {
  export namespace environment {
    export function isProduction(): boolean {
      return env === "production";
    }
  }
}
