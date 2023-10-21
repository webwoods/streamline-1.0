import { DataSourceOptions } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

interface DbConfigOptions {
  db: {
    type?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
  };
  entities: any[];
}

export function getDbConfig({
  db,
  entities,
}: DbConfigOptions): DataSourceOptions {
  const dbType = db.type ?? process.env['DB'] ?? 'postgres';

  const commonConfig: any = {
    type: dbType,
    synchronize: true,
    migrationsRun: false,
    migrations: [__dirname + '/migrations/*{.js,.ts}'],
    subscribers: [],
    entities: entities,
  };

  const pgConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env['DB_HOST'] ?? 'localhost',
    port: Number(process.env['DB_PORT']) || 5432,
    username: process.env['DB_USERNAME'] ?? 'postgres',
    password: process.env['DB_PASSWORD'] ?? '1234',
    database: process.env['DB_NAME'] ?? 'streamline',
  };

  const mysqlConfig: MysqlConnectionOptions = {
    type: 'mysql',
    host: process.env['DB_HOST'] ?? 'localhost',
    port: Number(process.env['DB_PORT']) || 3306,
    username: process.env['DB_USERNAME'] ?? 'root',
    password: process.env['DB_PASSWORD'] ?? 'pwd@kodi',
    database: process.env['DB_NAME'] ?? 'streamline',
  };

  switch (dbType) {
    case 'postgres':
      console.log('Using postgres connection');
      return {
        ...commonConfig,
        ...pgConfig,
      };
    case 'mysql':
      console.log('Using mysql connection');
      return {
        ...commonConfig,
        ...mysqlConfig,
      };
    default:
      console.log('Using postgres connection');
      return {
        ...commonConfig,
        ...pgConfig,
      };
  }
}
