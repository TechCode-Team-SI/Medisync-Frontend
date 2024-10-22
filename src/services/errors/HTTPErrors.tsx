export interface httpErrorProps {
  error: string;
  message: string;
  status: number;
}
const defaultProps: httpErrorProps = {
  error: 'default_error',
  message: 'Error',
  status: 10,
};

export class HTTPError extends Error {
  error: string;
  message: string;
  status: number;
  constructor(props?: httpErrorProps) {
    super();
    const data = { ...defaultProps, ...props };
    this.error = data.error;
    this.message = data.message;
    this.status = data.status;
  }
}
