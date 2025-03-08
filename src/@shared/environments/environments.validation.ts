import { Logger } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

enum NODE_ENV_ENUM {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  QAS = 'qas',
}

class EnvironmentVariables {
  @IsNotEmpty()
  @IsEnum(NODE_ENV_ENUM)
  NODE_ENV: NODE_ENV_ENUM;

  @IsNotEmpty()
  @IsNumber()
  PORT: number;

  @IsOptional()
  @IsString()
  TZ: string = 'utc';

  @IsOptional()
  @IsBoolean()
  NEST_DEBUG: boolean;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @IsNotEmpty()
  @IsString()
  JWT_EXPIRES_IN: string;

  @IsNotEmpty()
  @IsString()
  DEFAULT_USER: string;

  @IsNotEmpty()
  @IsString()
  DEFAULT_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  DEFAULT_EMAIL: string;

  @IsOptional()
  @IsString()
  FRONTEND_URL: string = 'http://localhost:3000';

  @IsOptional()
  @IsString()
  FALLBACK_LANGUAGE: string = 'pt-BR';
}

export function validate(config: Record<string, unknown>) {
  const logger = new Logger('EnvironmentVariables');

  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorMessages = errors.map((error) => {
      const constraints = Object.values(error.constraints || {});
      return `- ${error.property}: ${constraints.join(', ')}`;
    });

    const formattedErrorMessage = errorMessages.join('\n');

    logger.error(
      `Environment variables validation failed:\n${formattedErrorMessage}`,
    );

    process.exit(1);
  }

  return validatedConfig;
}
