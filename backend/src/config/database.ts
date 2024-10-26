import { Client } from "pg";

export const dbConfig = {
  user: 'qr_code_page_user',
  password: 'QCGMeHVwJwVoT0dNmd0J9O7RAACGZ1fj',
  host: 'dpg-csah77o8fa8c73cojdc0-a.frankfurt-postgres.render.com',
  port: 5432,
  database: 'qr_code_page',
  ssl: {
      rejectUnauthorized: false
  }
};

export const getClient = async (): Promise<Client> => {
  const client = new Client(dbConfig);
  await client.connect();
  return client;
};
