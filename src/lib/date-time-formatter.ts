import config from '../config';

const locale = `${config.lang}-${config.region}`;

export const dateFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: 'long',
  timeZone: 'Asia/Tokyo',
});
