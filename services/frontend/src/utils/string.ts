export const capitalizeFirstLetter = (value: string | undefined | null) => {
  return value?.charAt(0).toUpperCase() + value?.slice(1);
};
