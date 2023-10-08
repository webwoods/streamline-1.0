import { File } from 'src/files/file.entity';
import { Request } from 'src/request/request.entity';
import { Role } from 'src/roles/role.entity';
import { User } from 'src/users/user.entity';
import { DataSourceOptions } from 'typeorm';

export function getDbConfig(db: string): DataSourceOptions {
  const dbType = db || process.env.DB || 'postgres';
  const entities = [User, Role, File, Request];

  const commonConfig: DataSourceOptions = {
    synchronize: false,
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5342,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'streamline',
    migrationsRun: false,
    migrations: [__dirname + '/migrations/*{.js,.ts}'],
    subscribers: [],
    entities: entities,
  };

  switch (dbType) {
    case 'postgres':
      console.log('Using postgres connection');
      return {
        ...commonConfig,
        synchronize: true,
        type: 'postgres',
        migrationsRun: true,
        port: Number(process.env.DB_PORT) || 5432,
        schema: process.env.DB_SCHEMA || 'public',
      };
    case 'mysql':
      console.log('Using mysql connection');
      return {
        ...commonConfig,
        synchronize: true,
        type: 'mysql',
        port: Number(process.env.DB_PORT) || 3306,
      };
    default:
      console.log('Using mysql connection');
      return commonConfig;
  }
}
