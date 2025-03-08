import { translations } from 'src/@shared/i18n';

const translation = translations[process.env.FALLBACK_LANGUAGE || 'pt-BR'];

type TranslationObject = {
  [key: string]: string | TranslationObject;
};

const generateI18nEnum = (
  translation: TranslationObject,
  parentKey = '',
): Record<string, string> => {
  let enumObj: Record<string, string> = {};

  Object.keys(translation).forEach((key) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof translation[key] === 'object') {
      const childEnum = generateI18nEnum(translation[key], newKey);
      enumObj = { ...enumObj, ...childEnum };
    } else {
      enumObj[newKey.toUpperCase()] = `translation.${newKey}`;
    }
  });

  return enumObj;
};

const generateI18nObject = (
  translation: TranslationObject,
  I18nEnum: Record<string, string>,
) => {
  const I18n: Record<string, any> = {};

  const traverse = (
    obj: TranslationObject,
    parentObj: Record<string, any>,
    parentKey = '',
  ) => {
    Object.keys(obj).forEach((key) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === 'object') {
        parentObj[key] = {};
        traverse(obj[key], parentObj[key], newKey);
      } else {
        parentObj[key] = {
          KEY: I18nEnum[newKey.toUpperCase()],
          message: obj[key],
        };
      }
    });
  };

  traverse(translation, I18n);
  return I18n;
};

type EnumFromTranslation<T extends TranslationObject> = {
  [K in Extract<keyof T, string> as T[K] extends TranslationObject
    ? never
    : K]: `translation.${K}`;
};

type I18nObjectFromTranslation<T extends TranslationObject> = {
  [K in keyof T]: T[K] extends TranslationObject
    ? I18nObjectFromTranslation<T[K]>
    : {
        KEY: `translation.${Extract<K, string>}`;
        message: T[K] extends string ? T[K] : never;
      };
};

type I18nEnumType = EnumFromTranslation<typeof translation>;
type I18nType = I18nObjectFromTranslation<typeof translation>;

const I18nEnum = generateI18nEnum(translation) as I18nEnumType;

export const I18n = generateI18nObject(translation, I18nEnum) as I18nType;
