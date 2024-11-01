import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomBtn';
import { Link, useRouter } from 'expo-router';
import OAuth from '@/components/OAuth';
import { useSignIn } from '@clerk/clerk-expo';

const LoginScreen = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-72">
          <Image source={images.signUpCar} className="z-0 w-full h-72" />

          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Login to your Account
          </Text>
        </View>
      </View>

      <View className="p-5">
        <InputField
          label="Email"
          placeHolder="Enter your email"
          icon={icons.email}
          keyboardType="email-address"
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

        <CustomButton title="Login" onPress={onSignInPress} className="mt-6 " />

        <OAuth />

        <Link
          href={'/(auth)/register-screen'}
          className="text-lg text-center text-general-200 mt-10">
          <Text>Don't have an account? </Text>
          <Text className="text-primary-500">Register</Text>
        </Link>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
