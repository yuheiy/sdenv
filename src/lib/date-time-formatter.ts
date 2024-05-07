import { siteLang, siteRegion } from '../consts';

const locale = `${siteLang}-${siteRegion}`;

export const dateFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: 'long',
  timeZone: 'Asia/Tokyo',
});
