import { ReportItem } from '../interfaces/interface';

export const cleanReportItems = (items: ReportItem[] | undefined | null) => {
  if (!items) return [];
  return items.map((item) => {
    if ('__typename' in item) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { __typename, ...rest } = item;
      return rest;
    }
    return item;
  });
};

export const getImageType = (base64Data: string): string | null => {
  const magicNumber = base64Data.slice(0, 4);
  if (magicNumber.startsWith('/9j/')) {
    return 'jpeg';
  } else if (magicNumber.startsWith('iVBOR')) {
    return 'png';
  }
  return null;
};

export const getSanitizedImageSrc = (
  base64Data: string | null,
): string | null => {
  if (!base64Data) return null;
  const imageType = getImageType(base64Data);
  if (imageType) {
    return `data:image/${imageType};base64,${base64Data}`;
  }
  console.error('Unsupported image type.');
  return null;
};
