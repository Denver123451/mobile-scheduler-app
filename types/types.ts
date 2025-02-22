export interface ICustomFormProps {
  props: {
    eventName: string;
    startDay: string;
    startTime: string;
    endDay: string;
    endTime: string;
    id?: number;
  };
}

export interface ICustomButtonProps {
  buttonText: string;
  onPress: () => void;
}

export interface ICustomMaskInputProps {
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
