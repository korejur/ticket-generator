import { Client } from "pg";

export const dbConfig = {
  user: 'qr_code_user',
  password: 'Qw7VIRT74ZLdtCgP20ewB0BRMB5b3i9t',
  host: 'dpg-csod2oe8ii6s73948vp0-a.frankfurt-postgres.render.com',
  port: 5432,
  database: 'qr_code',
  ssl: {
      rejectUnauthorized: false
  }
};

export const getClient = async (): Promise<Client> => {
  const client = new Client(dbConfig);
  await client.connect();
  return client;
};
