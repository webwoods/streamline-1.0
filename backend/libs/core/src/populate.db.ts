import * as pgPromise from 'pg-promise';
import * as mysql from 'mysql2/promise';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { getDbConfig } from './config/orm.config';

const db = getDbConfig({
  db: {},
  entities: [],
});

const connectionConfig = {
  user: process.env['DB_USERNAME'] ?? 'postgres',
  password: process.env['DB_PASSWORD'] ?? 'pwd@kodi',
  database: process.env['DB_NAME'] ?? 'streamline',
  host: process.env['DB_HOST'] ?? 'localhost',
};

const pgConnectionConfig = {
  ...connectionConfig,
  port: Number(process.env['DB_PORT']) || 5432,
};

const mysqlConnectionConfig = {
  ...connectionConfig,
  port: Number(process.env['DB_PORT']) || 3306,
};

let connection: any;

const generateRandomValue = (length: number): string => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

const hashedPassword = async (): Promise<string> => {
  const randomPassword = generateRandomValue(12);
  return await bcrypt.hash(randomPassword, 10);
};

const hashedVerificationCode = async (): Promise<string> => {
  const randomVerificationCode = generateRandomValue(8);
  return await bcrypt.hash(randomVerificationCode, 10);
};

const runScript = async () => {
  try {
    if (db.type === 'postgres') {
      const pgp = pgPromise();
      connection = pgp(pgConnectionConfig);
    } else if (db.type === 'mysql') {
      connection = await mysql.createConnection(mysqlConnectionConfig);
    } else {
      throw new Error('Invalid database type. Use DB=postgres or DB=mysql');
    }

    // Run the SQL script with hashed values
    await connection.none(
      `
      INSERT INTO public.user (id, createdAt, updatedAt, username, email, password, name, roleId, verified)
      VALUES (uuid_generate_v4(), NOW(), NOW(), 'admin_user', 'admin@example.com', $1, 'Admin User', (SELECT id FROM public.role WHERE name = 'Admin'), true);
    `,
      [hashedPassword()],
    );

    await connection.none(
      `
      INSERT INTO public.verification_code (id, createdAt, updatedAt, user_id, code)
      VALUES (uuid_generate_v4(), NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'admin_user'), $1);
    `,
      [hashedVerificationCode()],
    );

    console.log('Script executed successfully');
  } catch (error) {
    console.error('Error executing script:', error);
  } finally {
    await connection.end();
  }
};

// Run the script
runScript();
