#! /usr/bin/env node
import { z } from "zod";
import { config } from "dotenv";
import { validateEnv } from "./validate";

config();

const envSchema = z.object({
  API_KEY: z.string().nonempty(),
  DATABASE_URL: z.string().url(),
  PORT: z.number(),
});

export const env: z.infer<typeof envSchema> = {
  API_KEY: process.env.API_KEY!,
  DATABASE_URL: process.env.DATABASE_URL!,
  PORT: parseInt(process.env.PORT as string),
};

validateEnv(envSchema, env);
