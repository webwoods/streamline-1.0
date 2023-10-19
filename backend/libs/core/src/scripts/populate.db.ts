import * as pgPromise from 'pg-promise';
import * as mysql from 'mysql2/promise';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { getDbConfig } from '../config/orm.config';
import { UserRoles } from '../roles/enum/role';

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

const getRandomRole = (): UserRoles => {
  const roles = Object.values(UserRoles);
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
};

const generateScript = async (): Promise<string> => {
  return `
    -- Insert users
    INSERT INTO public.user (id, "createdAt", "updatedAt", username, email, password, name, "roleId", verified)
    VALUES
    (${uuidv4()}, NOW(), NOW(), 'superadmin', 'superadmin@streamline.org', '${await hashedPassword()}', 'Will Ferrel', (SELECT id FROM public.role WHERE name = ${UserRoles.SUPERADMIN}), true),
    (${uuidv4()}, NOW(), NOW(), 'admin', 'superadmin@streamline.org', '${await hashedPassword()}', 'Dennis Berckham', (SELECT id FROM public.role WHERE name = ${UserRoles.ADMIN}), true),
    (${uuidv4()}, NOW(), NOW(), 'john_doe', 'john_doe@streamline.org', '${await hashedPassword()}', 'John Doe', (SELECT id FROM public.role WHERE name = ${getRandomRole()}), true),
    (${uuidv4()}, NOW(), NOW(), 'jane_smith', 'jane_smith@streamline.org', '${await hashedPassword()}', 'Jane Smith', (SELECT id FROM public.role WHERE name = ${getRandomRole()}), false),
    (${uuidv4()}, NOW(), NOW(), 'alice_wonderland', 'alice_wonderland@streamline.org', '${await hashedPassword()}', 'Alice Wonderland', (SELECT id FROM public.role WHERE name = ${getRandomRole()}), false),
    (${uuidv4()}, NOW(), NOW(), 'bob_marley', 'bob_marley@streamline.org', '${await hashedPassword()}', 'Bob Marley', (SELECT id FROM public.role WHERE name = ${getRandomRole()}), false),
    (${uuidv4()}, NOW(), NOW(), 'emma_watson', 'emma_watson@streamline.org', '${await hashedPassword()}', 'Emma Watson', (SELECT id FROM public.role WHERE name = ${getRandomRole()}), false),
    (${uuidv4()}, NOW(), NOW(), 'john_smith', 'john_smith@streamline.org', '${await hashedPassword()}', 'John Smith', (SELECT id FROM public.role WHERE name = ${getRandomRole()}), false),
    (${uuidv4()}, NOW(), NOW(), 'jane_doe', 'jane_doe@streamline.org', '${await hashedPassword()}', 'Jane Doe', (SELECT id FROM public.role WHERE name = ${getRandomRole()}), false),
    (${uuidv4()}, NOW(), NOW(), 'bob_wonderland', 'bob_wonderland@streamline.org', '${await hashedPassword()}', 'Bob Wonderland', (SELECT id FROM public.role WHERE name = ${getRandomRole()}), false),
    (${uuidv4()}, NOW(), NOW(), 'alice_marley', 'alice_marley@streamline.org', '${await hashedPassword()}', 'Alice Marley', (SELECT id FROM public.role WHERE name = ${getRandomRole()}), false),
    (${uuidv4()}, NOW(), NOW(), 'emma_doe', 'emma_doe@streamline.org', '${await hashedPassword()}', 'Emma Doe', (SELECT id FROM public.role WHERE name = ${getRandomRole()}), false);

    -- Insert roles
    INSERT INTO public.role (id, "createdAt", "updatedAt", name)
    VALUES
    (${uuidv4()}, NOW(), NOW(),'${UserRoles.SUPERADMIN}'),
    (${uuidv4()}, NOW(), NOW(),'${UserRoles.ADMIN}'),
    (${uuidv4()}, NOW(), NOW(),'${UserRoles.DIRECTOR}'),
    (${uuidv4()}, NOW(), NOW(),'${UserRoles.EMPLOYEE}'),
    (${uuidv4()}, NOW(), NOW(),'${UserRoles.PROCUREMENT_STAFF}'),
    (${uuidv4()}, NOW(), NOW(),'${UserRoles.STORE_STAFF}');

    -- Insert verification codes
    INSERT INTO public.verification_code (id, "createdAt", "updatedAt", user_id, code)
    VALUES
    (${uuidv4()}, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'superadmin'), '${await hashedVerificationCode()}'),
    (${uuidv4()}, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'admin'), '${await hashedVerificationCode()}'),
    (${uuidv4()}, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'john_doe'), '${await hashedVerificationCode()}'),
    (${uuidv4()}, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'jane_smith'), '${await hashedVerificationCode()}'),
    (${uuidv4()}, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'alice_wonderland'), '${await hashedVerificationCode()}'),
    (${uuidv4()}, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'bob_marley'), '${await hashedVerificationCode()}'),
    (${uuidv4()}, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'emma_watson'), '${await hashedVerificationCode()}'),
    (${uuidv4()}, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'john_smith'), '${await hashedVerificationCode()}'),
    (${uuidv4()}, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'jane_doe'), '${await hashedVerificationCode()}'),
    (${uuidv4()}, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'bob_wonderland'), '${await hashedVerificationCode()}'),
    (${uuidv4()}, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'alice_marley'), '${await hashedVerificationCode()}'),
    (${uuidv4()}, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'emma_doe'), '${await hashedVerificationCode()}');
  `;
};

const printScript = async () => {
  try {
    const script = await generateScript();

    await fs.writeFile('libs/core/src/sql/script.sql', script, 'utf-8');

    console.log('Script generated successfully');
  } catch (error) {
    console.error('Error generating script:', error);
  }
};

const runScript = async () => {
  try {
    const script = await generateScript();

    // Write script to a file
    await fs.writeFile('script.sql', script, 'utf-8');

    if (db.type === 'postgres') {
      const pgp = pgPromise();
      connection = pgp(pgConnectionConfig);
    } else if (db.type === 'mysql') {
      connection = await mysql.createConnection(mysqlConnectionConfig);
    } else {
      throw new Error('Invalid database type. Use DB=postgres or DB=mysql');
    }

    // Run the SQL script
    await connection.none(script);

    console.log('Script executed successfully');
  } catch (error) {
    console.error('Error executing script:', error);
  } finally {
    await connection.end();
  }
};

// Run the script
// runScript();
printScript();
