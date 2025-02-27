import { IEvent } from '@/types/types';

function isValidTime(time: string): boolean {
  const timePattern = /^(0[1-9]|1[0-2]):[0-5][0-9] (am|pm)$/i;
  return timePattern.test(time);
}

export function addDays(date: Date, days?: number) {
  const result = new Date(date);
  if (days) {
    result.setDate(result.getDate() + days);
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return result.toLocaleDateString('en-US', options);
}

export function parseDateTime(date: string, time: string): Date {
  const [month, day, year] = date.split('/').map(Number);
  const [timeString, modifier] = time.split(' ');
  let [hours, minutes] = timeString.split(':').map(Number);

  if (modifier.toLowerCase() === 'pm' && hours < 12) {
    hours += 12;
  }
  if (modifier.toLowerCase() === 'am' && hours === 12) {
    hours += 0;
  }
  return new Date(year, month - 1, day, hours, minutes);
}

function isValidDate(date: string): boolean {
  const [month, day, year] = date.split('/').map(Number);
  const dateObject = new Date(year, month - 1, day);

  return (
    dateObject.getFullYear() === year &&
    dateObject.getMonth() === month - 1 &&
    dateObject.getDate() === day
  );
}

function isEventOnTargetDate(
  eventStart: Date,
  eventEnd: Date,
  targetDate: Date,
): boolean {
  const startOfDay = new Date(targetDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(targetDate);
  endOfDay.setHours(23, 59, 59, 999);

  return eventStart <= endOfDay && eventEnd >= startOfDay;
}

export function diffDates(timestamp: number, eventStartNoTime: Date): number {
  eventStartNoTime.setHours(0, 0, 0, 0);
  return Math.floor(
    (timestamp - eventStartNoTime.getTime()) / (1000 * 60 * 60 * 24),
  );
}

export function filterEventsByDate(
  timestamp: number,
  events: IEvent[],
): IEvent[] {
  const targetDate = new Date(timestamp);

  return events.filter((event) => {
    const eventStart = parseDateTime(event.startDay, event.startTime);
    const eventStartNoTime = parseDateTime(event.startDay, event.startTime);
    eventStartNoTime.setHours(0, 0, 0, 0);
    const eventEnd = parseDateTime(event.endDay, event.endTime);

    const diffDays = Math.floor(
      (targetDate.getTime() - eventStartNoTime.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    let isEventOnTargetDateFlag = false;
    switch (event.repeat) {
      case 'weekly':
        isEventOnTargetDateFlag = diffDays % 7 === 0;
        break;
      case 'bi-weekly':
        isEventOnTargetDateFlag = diffDays % 14 === 0;
        break;
      case 'monthly':
        isEventOnTargetDateFlag = eventStart.getDate() === targetDate.getDate();
        break;
      default:
        isEventOnTargetDateFlag = isEventOnTargetDate(
          eventStart,
          eventEnd,
          targetDate,
        );
        break;
    }

    return (
      isEventOnTargetDateFlag ||
      isEventOnTargetDate(eventStart, eventEnd, targetDate)
    );
  });
}

export const isValidDateTimeRange = (
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  events: IEvent[],
): { valid: boolean; error: string } => {
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return { valid: false, error: 'Invalid date' };
  }

  if (!isValidTime(startTime) || !isValidTime(endTime)) {
    return { valid: false, error: 'Invalid time' };
  }

  const start = parseDateTime(startDate, startTime);
  const end = parseDateTime(endDate, endTime);

  for (const event of events) {
    const eventStart = parseDateTime(event.startDay, event.startTime);
    const eventEnd = parseDateTime(event.endDay, event.endTime);

    if (
      (start >= eventStart && start < eventEnd) ||
      (end > eventStart && end <= eventEnd) ||
      (start <= eventStart && end >= eventEnd)
    ) {
      return { valid: false, error: 'In this range the event already exists' };
    }
  }

  if (start < end) {
    return { valid: true, error: '' };
  }

  return { valid: false, error: 'Date range is incorrect' };
};

export function parseDate(mmddyyyy: string): Date {
  const [month, day, year] = mmddyyyy.split('/');
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
