import pt_BR from 'src/@shared/i18n/pt-BR/translation.json';

type Translations = {
  [key: string]: typeof pt_BR;
};

export const translations: Translations = {
  'pt-BR': pt_BR,
} as const;

export * from './polyglot';
