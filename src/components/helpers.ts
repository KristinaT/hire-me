import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const formatDate = (date: string, dateFormat: string) => 
  format(parseISO(date), dateFormat);

export const formatDateForPickupTime = (selectedTime: Date): string =>
  format(selectedTime, 'HH:mm');
  