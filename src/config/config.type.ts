import { UserRoleEnum } from '../modules/users/enum/role.enum';
import { UserAccountTypeEnum } from '../modules/users/enum/user-account-type.enum';

export type Config = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  sentry: SentryConfig;
  jwt: JWTConfig;
  aws: AwsConfig;
  superUser: SuperUser;
};
export type SuperUser = {
  userName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  accountType: string;
  deviceId: string;
};
export type AppConfig = {
  port: number;
  host: string;
};

export type PostgresConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  dbName: string;
};
export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};
export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};
export type JWTConfig = {
  accessSecret: string;
  accessExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: number;
};
export type AwsConfig = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  bucketUrl: string;
  endpoint: string;
};
