import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import {
  GestureHandlerRootView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import CustomButton from './CustomBtn';

type Props = {
  label?: string;
  labelStyle?: string;
  placeHolder?: string;
  inputStyle?: string;
  containerStyle?: string;
  iconStyle?: string;
  value?: string;
  icon?: any;
  secureTextEntry?: boolean;
} & React.ComponentProps<typeof TextInput>;

const InputField = ({
  label,
  labelStyle,
  secureTextEntry = false,
  icon,
  onChange,
  value,
  inputStyle,
  iconStyle,
  containerStyle,
  placeHolder,
  ...props
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="my-2 w-full ">
            <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
              {label}
            </Text>

            <View
              className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border ${
                isFocused ? 'border-primary-500' : 'border-neutral-100'
              }  ${containerStyle} `}>
              {icon && (
                <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
              )}
              <TextInput
                className={`rounded-full p-4 font-JakartaSemiBold text-sm flex-1 ${inputStyle} text-left `}
                secureTextEntry={secureTextEntry}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeHolder}
                placeholderTextColor="#A0A0A0"
                {...props}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default InputField;
