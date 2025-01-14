import { faker } from '@faker-js/faker';

export function generateRate(min: number, max: number, factor: number) {
  const scaledMin = Math.ceil(min / factor);
  const scaledMax = Math.floor(max / factor);
  const scaledNumber = faker.number.int({ min: scaledMin, max: scaledMax });
  return scaledNumber * factor;
}

export const getRandomTime = () => {
  const hour = Math.floor(Math.random() * 12) + 8;
  const minute = Math.floor(Math.random() * 60);
  return `${hour}:${minute < 10 ? '0' + minute : minute}`;
};

export function generateCzechPhoneNumber() {
  const validPrefixes = [
    '601',
    '602',
    '603',
    '604',
    '605',
    '606',
    '607',
    '608',
    '609',
    '720',
    '721',
    '722',
    '723',
    '724',
    '725',
    '726',
    '727',
    '728',
    '729',
    '730',
    '731',
    '732',
    '733',
    '734',
    '735',
    '736',
    '737',
    '738',
    '739',
    '770',
    '771',
    '772',
    '773',
    '774',
    '775',
    '776',
    '777',
    '778',
    '779',
  ];
  const randomPrefix =
    validPrefixes[Math.floor(Math.random() * validPrefixes.length)];
  const randomNumber = String(Math.floor(Math.random() * 1000000)).padStart(
    6,
    '0',
  );
  return `+420${randomPrefix}${randomNumber}`;
}
