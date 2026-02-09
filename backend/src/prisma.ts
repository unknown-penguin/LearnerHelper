import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Parse DATABASE_URL manually to ensure password is a string
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

// Create a PostgreSQL connection pool with explicit string values
const pool = new Pool({
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port),
  user: dbUrl.username,
  password: String(dbUrl.password), // Explicitly convert to string
  database: dbUrl.pathname.slice(1), // Remove leading slash
  ssl: false,
  // Set the schema search path
  options: `-c search_path=${schema}`,
});

// Create the Prisma adapter
const adapter = new PrismaPg(pool);

// Initialize Prisma Client with the adapter
export const prisma = new PrismaClient({
  adapter,
  log: ['query'],
});

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
