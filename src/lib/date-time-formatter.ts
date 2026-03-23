import { SITE } from '../config';

const locale = `${SITE.lang}-${SITE.region}`;

export const dateFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: 'long',
  timeZone: 'Asia/Tokyo',
});
