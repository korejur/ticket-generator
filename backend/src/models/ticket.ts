import { getClient } from "../config/database";
import { v4 as uuidv4 } from "uuid";
import { Ticket } from "../types/types";

export const createTicket = async (
  vatin: string,
  firstName: string,
  lastName: string
): Promise<Ticket> => {
  const client = await getClient();
  try {
    const id = uuidv4();
    const createdAt = new Date();

    const query = `
      INSERT INTO tickets (id, vatin, first_name, last_name, created_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [id, vatin, firstName, lastName, createdAt];

    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    await client.end();
  }
};

export const getLatestTicketFromDB = async (): Promise<Ticket | null> => {
  const client = await getClient();
  try {
    const query = "SELECT * FROM tickets ORDER BY created_at DESC LIMIT 1";
    const result = await client.query(query);
    return result.rows[0] || null;
  } finally {
    await client.end();
  }
};

export const getTicketById = async (id: string): Promise<Ticket | null> => {
  const client = await getClient();
  try {
    const query = "SELECT * FROM tickets WHERE id = $1";
    const result = await client.query(query, [id]);
    return result.rows[0] || null;
  } finally {
    await client.end();
  }
};

export const getTicketCountByVatin = async (vatin: string): Promise<number> => {
  const client = await getClient();
  try {
    const query = "SELECT COUNT(*) FROM tickets WHERE vatin = $1";
    const result = await client.query(query, [vatin]);
    return parseInt(result.rows[0].count, 10);
  } finally {
    await client.end();
  }
};

export const getTotalTicketCount = async (): Promise<number> => {
  const client = await getClient();
  try {
    const query = "SELECT COUNT(*) FROM tickets";
    const result = await client.query(query);
    return parseInt(result.rows[0].count, 10);
  } finally {
    await client.end();
  }
};
