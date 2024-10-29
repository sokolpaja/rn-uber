import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomBtn';
import { Link } from 'expo-router';
import OAuth from '@/components/OAuth';

const RegisterScreen = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleRegister = async () => {
    try {
      //TODO handle register with email and pass
    } catch (error) {
      console.log('🚀 ~ handleRegister ~ error:', error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-72">
          <Image source={images.signUpCar} className="z-0 w-full h-72" />

          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
      </View>

      <View className="p-5">
        <InputField
          label="Name"
          placeHolder="Enter your name"
          icon={icons.person}
          value={form.name}
          onChangeText={(value: string) => setForm({ ...form, name: value })}
        />
        <InputField
          label="Email"
          placeHolder="Enter your email"
          icon={icons.email}
          value={form.email}
          onChangeText={(value: string) => setForm({ ...form, email: value })}
        />
        <InputField
          label="Password"
          placeHolder="Enter your Password"
          icon={icons.lock}
          value={form.password}
          secureTextEntry
          onChangeText={(value: string) =>
            setForm({ ...form, password: value })
          }
        />

        <CustomButton
          title="Register"
          onPress={handleRegister}
          className="mt-6 "
        />

        <OAuth />

        <Link
          href={'/(auth)/login'}
          className="text-lg text-center text-general-200 mt-10">
          <Text>Already have an account? </Text>
          <Text className="text-primary-500">Log in</Text>
        </Link>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
