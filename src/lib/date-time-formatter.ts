import { SITE_LANG, SITE_REGION } from '../consts';

const locale = `${SITE_LANG}-${SITE_REGION}`;

export const dateFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: 'long',
  timeZone: 'Asia/Tokyo',
});
