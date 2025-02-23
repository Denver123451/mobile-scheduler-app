import { IEvent } from '@/types/types';

function isValidTime(time: string): boolean {
  const timePattern = /^(0[1-9]|1[0-2]):[0-5][0-9] (am|pm)$/i;
  return timePattern.test(time);
}

function parseDateTime(date: string, time: string): Date {
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

export function filterEventsByDate(
  timestamp: number,
  events: IEvent[],
): IEvent[] {
  const targetDate = new Date(timestamp);

  return events.filter((event) => {
    const eventStart = parseDateTime(event.startDay, event.startTime);
    const eventEnd = parseDateTime(event.endDay, event.endTime);

    // Calculate the difference in days between the target date and the event start date
    const diffDays = Math.floor(
      (targetDate.getTime() - eventStart.getTime()) / (1000 * 60 * 60 * 24),
    );

    // Check if the target date falls within the event duration or repeats on the target date
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
      isEventOnTargetDateFlag &&
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
