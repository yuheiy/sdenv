import { SITE } from '../config';

export const getFormattedDate = (date: Date) =>
  new Date(date).toLocaleDateString(`${SITE.lang}-${SITE.region}`, {
    dateStyle: 'long',
    timeZone: 'Asia/Tokyo',
  });
