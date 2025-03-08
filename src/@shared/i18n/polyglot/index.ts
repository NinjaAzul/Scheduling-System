import { ValidationArguments } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

/**
 * Returns the validation message and an example of the message.
 *
 * @param translation key of the message to be returned
 * @param args optional arguments for the message
 * @returns returns the validation message and an example of the message
 */
export const polyglot = (
  translation: {
    KEY: string;
    message: string;
  },
  args?: Record<string, unknown>,
): { message: (args: ValidationArguments) => string } => {
  const messageFunction = (validationArgs: ValidationArguments): string => {
    return i18nValidationMessage(translation.KEY, args)(validationArgs);
  };

  return {
    message: messageFunction,
  };
};

export * from './i18n';
