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
    host: process.env['DB_HOST'],
    port: Number(process.env['DB_PORT']),
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
  };

  const mysqlConfig: MysqlConnectionOptions = {
    type: 'mysql',
    host: process.env['DB_HOST'],
    port: Number(process.env['DB_PORT']),
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
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
