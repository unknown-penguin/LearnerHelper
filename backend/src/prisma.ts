import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const dbUrl = new URL(process.env.DATABASE_URL || '');
const searchParams = new URLSearchParams(dbUrl.search);
const schema = searchParams.get('schema') || 'public';
console.log('Parsed DATABASE_URL:', {
  host: dbUrl.hostname,
  port: dbUrl.port,
  user: dbUrl.username,
  password: dbUrl.password,
    database: dbUrl.pathname.slice(1),
    schema,
});

const pool = new Pool({
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port),
  user: dbUrl.username,
  password: String(dbUrl.password),
  database: dbUrl.pathname.slice(1),
  ssl: false,
  options: `-c search_path=${schema}`,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
  log: ['query'],
});
