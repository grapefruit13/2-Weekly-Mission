export function calCreatedDates(createdAt: string) {
  const splited: string[] = createdAt.split('T').slice(0, 1);
  const yearMonthDay: string[] = splited[0].split('-');

  return yearMonthDay;
}

export function calCreatedAt(year: string, month: string, day: string) {
  const now = new Date();

  const createdDate = new Date(
    Number(year),
    Number(month) * 1 - 1,
    Number(day),
  );

  const diffMSec = now.getTime() - createdDate.getTime();
  const MIN = 1000 * 60;
  const HOUR = MIN * 60;
  const DAY = HOUR * 24;
  const MONTH = DAY * 30;

  const calTime = (diffMSec: any, time: number) => Math.floor(diffMSec / time);

  const minutes = calTime(diffMSec, MIN);
  const hours = calTime(diffMSec, HOUR);
  const days = calTime(diffMSec, DAY);
  const months = calTime(diffMSec, MONTH);

  if (months > 23) {
    return `${Math.floor(months / 12)} years ago`;
  } else if (months >= 12) {
    return '1 year ago';
  } else if (days > 30) {
    return `${months} month ago`;
  } else if (days <= 30) {
    return `${days} days ago`;
  } else if (hours >= 24) {
    return '1 day ago';
  } else if (hours <= 23) {
    return `${hours} hours ago`;
  } else if (minutes >= 60) {
    return '1 hour ago';
  } else if (minutes <= 59) {
    return `${minutes} minutes ago`;
  } else if (minutes < 2) {
    return '1 minute ago';
  }
  return '';
}
