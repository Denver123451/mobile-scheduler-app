export interface ICustomFormProps {
  props: {
    eventName: string;
    startDay: string;
    startTime: string;
    endDay: string;
    endTime: string;
    id?: number;
  };
  isEdit?: boolean;
}

export interface ICustomButtonProps {
  buttonText: string;
  onPress: () => void;
}

export interface ICustomDatePickerProps {
  value: string;
  onChange: (maskedValue: string) => void;
}

export interface ICustomTimePickerProps {
  value: string;
  onChange: (maskedValue: string) => void;
  pickerItems: {
    label: string;
    value: string;
  }[];
}

export interface IEvent {
  id: any;
  eventName: string;
  startDay: string;
  startTime: string;
  endDay: string;
  endTime: string;
  repeat?: string;
  targetDate?: number;
}

export interface IEventState {
  events: IEvent[];
  date: any;
}

export interface IStoreEventState {
  events: IEvent[];
}
