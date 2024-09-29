export abstract class Connection {
  abstract get: (url: string, token: string) => unknown;
  abstract post: (url: string, body: object, token: string) => unknown;
  abstract put: (url: string, body: object, token: string) => unknown;
  abstract delete: (url: string, token: string) => unknown;
}
