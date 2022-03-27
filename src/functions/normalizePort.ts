import { DEFAULT_PORT } from '../helpers/constants';

export default function normalizePort(val: string | undefined) {
  if (!val) {
    return DEFAULT_PORT;
  }

  const port = parseInt(val, 10);

  if (port >= 0) {
    // port number
    return port;
  }

  return DEFAULT_PORT;
}
