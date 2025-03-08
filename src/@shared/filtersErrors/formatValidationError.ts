import { ValidationError } from 'class-validator';
import { I18nContext } from 'nestjs-i18n';
import { translations } from 'src/@shared/i18n';

// Format the validation errors
export const formatValidationError = (errors: ValidationError[]) => {
  const i18n = I18nContext.current();
  const language = i18n?.lang || process.env.FALLBACK_LANGUAGE;

  if (errors.length > 0) {
    const errorMessages = errors.map((err) => {
      const whitelistMessage = err.constraints?.whitelistValidation
        ? translations[language]?.MESSAGES?.IS_WHITELIST_MESSAGE
        : undefined;

      return {
        property: err.property,
        error: whitelistMessage || err.constraints,
        children: err.children,
      };
    });

    const errorObject = {
      info: 'Validation failed',
      errors: errorMessages,
    };

    return errorObject;
  }
};
