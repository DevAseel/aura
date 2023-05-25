import { ZodObject } from "zod";

export function validateEnv<T extends ZodObject<any>>(
  schema: T,
  env: any
): void {
  for (const variableName in schema._def.shape) {
    if (!process.env[variableName]) {
      throw new Error(`Missing required environment variable: ${variableName}`);
    }
  }
  const validationResult = schema.safeParse(env);

  if (validationResult.success) {
    console.log("✅ Environment variables are valid!");
  } else {
    const errorMessages = validationResult.error.issues.map((issue) => {
      const path = issue.path.join(".");
      const message = issue.message;
      return `${path}: ${message}`;
    });

    console.error("❌ Invalid environment variables:");
    console.error(errorMessages.join("\n"));
  }
}
