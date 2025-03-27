export const appConfig = () => ({
  nodeEnv: process.env.NODE_ENV ?? 'dev',
  demoAppName: process.env.DEMO_APP_NAME ?? 'default-app',
  demoPort: parseInt(process.env.DEMO_PORT ?? '3000', 10),
});
