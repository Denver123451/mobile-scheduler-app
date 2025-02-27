import { View, Text, TextInput } from 'react-native';
import { timeOptions } from '@/constants/timeOptions';
import { repeatOptions } from '@/constants/repeatOptions';
import styles from './form.styles';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { CustomMaskInput } from '@/components/CustomMaskInput/CustomMaskInput';
import { CustomTimePicker } from '@/components/CustomTimePicker/CustomTimePicker';
import { useCustomFormLogic } from '@/hooks/useCustomFormLogic';
import { ICustomFormProps } from '@/types/types';

export const CustomForm = ({ props, isEdit }: ICustomFormProps) => {
  const {
    eventName,
    setEventName,
    startDay,
    setStartDay,
    startTime,
    setStartTime,
    endDay,
    setEndDay,
    endTime,
    setEndTime,
    repeat,
    setRepeat,
    handleSave,
    handleEdit,
  } = useCustomFormLogic({ props, isEdit });

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Event Name</Text>
      <TextInput
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
        placeholder="Event Name"
      />

      <View style={styles.rowWrapper}>
        <Text style={styles.label}>Starts</Text>
        <View style={styles.inputsWrapper}>
          <CustomMaskInput value={startDay} onChange={setStartDay} />
          <CustomTimePicker
            value={startTime}
            onChange={setStartTime}
            pickerItems={timeOptions}
          />
        </View>
      </View>

      <View style={styles.rowWrapper}>
        <Text style={styles.label}>Ends</Text>
        <View style={styles.inputsWrapper}>
          <CustomMaskInput value={endDay} onChange={setEndDay} />
          <CustomTimePicker
            value={endTime}
            onChange={setEndTime}
            pickerItems={timeOptions}
          />
        </View>
      </View>

      <View style={styles.repeatWrapper}>
        <Text style={styles.label}>Repeat</Text>
        <CustomTimePicker
          value={repeat}
          onChange={setRepeat}
          pickerItems={repeatOptions}
        />
      </View>

      {isEdit ? (
        <CustomButton buttonText="Edit" onPress={handleEdit} />
      ) : (
        <CustomButton buttonText="Save" onPress={handleSave} />
      )}
    </View>
  );
};
