import { View, Text, Image } from 'react-native';
import React from 'react';
import CustomButton from './CustomBtn';
import { icons } from '@/constants';

const OAuth = () => {
  const handleGoogleLogin = async () => {
    try {
    } catch (error) {
      console.log('🚀 ~ handleGoogleLogin ~ error:', error);
    }
  };
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-0.5 bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-0.5 bg-general-100" />
      </View>

      <CustomButton
        title="Log in with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mr-1"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleLogin}
      />
    </View>
  );
};

export default OAuth;
