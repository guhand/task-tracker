import { env } from 'node:process';

export const Config = {
  Port: env.PORT ?? 5000,
  SECRET_KEY: env.JWT_SECRET_KEY,

  smtp_host: env.SMTP_HOST,
  smtp_port: Number(env.SMTP_PORT),
  smtp_display: env.SMTP_DISPLAY_NAME,
  smtp_secure: false,
  smtp_user: env.SMTP_USERNAME,
  smtp_pass: env.SMTP_PASSWORD,
};
