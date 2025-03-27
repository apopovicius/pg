import * as path from 'path';

export function resolveEnvFile(): string {
  const env = process.env.NODE_ENV || 'dev';
  return path.resolve(
    process.cwd(),
    'libs/config/src/environments',
    `.env.${env}`,
  );
}
