export const generateBooleanValue = (value: string | boolean | undefined) => {
  if (value === 'false' || value === '0' || value === false) return false;
  if (value === 'true' || value === '1' || value === true) return true;
  return undefined;
};
