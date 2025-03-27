export const sqliteConfig = () => ({
  sqlite: {
    host: process.env.DB_HOST || '',
    port: parseInt(process.env.DB_PORT || '5432', 10),
  },
});
