import path from 'path';

export default function getRootFolder(): string {
  return path.dirname(path.dirname(__dirname));
}
