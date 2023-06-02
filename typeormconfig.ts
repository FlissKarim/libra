import * as config from 'config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const DEFAULT_TYPEORM_CONFIG: object = config.get('typeorm');

export const connectionSource = new DataSource({
  ...DEFAULT_TYPEORM_CONFIG,
  host: 'localhost',
  cli: {
    migrationsDir: 'src/migration',
  },
  entities: [
    __dirname + '/src/**/entity/*{.js,.ts}',
    __dirname + '/src/entity/*{.js,.ts}',

  ],
  migrations: [
    __dirname + '/src/migration/*{.js,.ts}',
  ],
  seeds: ['./src/seed/*.seed{.js,.ts}'],
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
} as any);
