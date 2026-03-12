// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeodataEaiError extends Error {}

class GeodataEaiError {
  message: string;

  constructor(error: unknown, message: string) {
    Object.assign(this, error, {});
    this.message = message;
  }
}

export { GeodataEaiError as default };
