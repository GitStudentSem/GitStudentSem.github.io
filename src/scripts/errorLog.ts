// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const logError = (error: any) => {
  if (error instanceof Error) {
    error.message && console.error(error.message);
  } else {
    console.error(error);
  }
};
