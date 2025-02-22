export const isValidDateTimeRange = (
  startDateStr: string,
  endDateStr: string,
  startTime: string,
  endTime: string,
): { valid: boolean; error: string } => {
  const [startDayStr, startMonthStr] = startDateStr.split('/');
  const [endDayStr, endMonthStr] = endDateStr.split('/');

  const startDayNum = Number(startDayStr);
  const startMonthNum = Number(startMonthStr);
  const endDayNum = Number(endDayStr);
  const endMonthNum = Number(endMonthStr);

  if (!startDayNum || !startMonthNum || !endDayNum || !endMonthNum) {
    return { valid: false, error: 'no date or time of event specified' };
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const startDate = new Date(currentYear, startMonthNum - 1, startDayNum);
  const endDate = new Date(currentYear, endMonthNum - 1, endDayNum);

  if (startDate < currentDate) {
    return { valid: false, error: 'The date has already passed' };
  }

  if (endDate < startDate) {
    return { valid: false, error: 'End date is less than start date' };
  }

  const timeRegex = /^(\d{1,2}):(\d{2})\s*(am|pm)$/i;
  const startMatch = startTime.match(timeRegex);
  const endMatch = endTime.match(timeRegex);

  if (!startMatch || !endMatch) {
    return {
      valid: false,
      error: 'Invalid time format. Expected format "HH:MM am/pm".',
    };
  }

  const startHour = Number(startMatch[1]);
  const startMinute = Number(startMatch[2]);
  const startPeriod = startMatch[3].toLowerCase();

  const endHour = Number(endMatch[1]);
  const endMinute = Number(endMatch[2]);
  const endPeriod = endMatch[3].toLowerCase();

  const startHour24 =
    startPeriod === 'pm'
      ? startHour === 12
        ? 12
        : startHour + 12
      : startHour === 12
        ? 0
        : startHour;
  const endHour24 =
    endPeriod === 'pm'
      ? endHour === 12
        ? 12
        : endHour + 12
      : endHour === 12
        ? 0
        : endHour;

  if (
    startHour24 > endHour24 ||
    (startHour24 === endHour24 && startMinute >= endMinute)
  ) {
    return { valid: false, error: 'Start time must be less than end time' };
  }

  return { valid: true, error: '' };
};
