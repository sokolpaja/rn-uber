import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomBtn';
import { Link, router, useRouter } from 'expo-router';
import OAuth from '@/components/OAuth';
import { useSignUp } from '@clerk/clerk-expo';
import ReactNativeModal from 'react-native-modal';

const RegisterScreen = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const [pendingVerification, setPendingVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification({ ...pendingVerification, state: 'pending' });
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: pendingVerification.code,
      });

      if (completeSignUp.status === 'complete') {
        // TODO create a db user instance
        await setActive({ session: completeSignUp.createdSessionId });
        setPendingVerification({ ...pendingVerification, state: 'success' });
      } else {
        setPendingVerification({
          ...pendingVerification,
          error: 'verification failed',
          state: 'failed',
        });
      }
    } catch (err: any) {
      setPendingVerification({
        ...pendingVerification,
        error: err.errors[0].longMessage,
        state: 'failed',
      });
      console.error(JSON.stringify(err, null, 2));
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
          keyboardType="email-address"
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
          onPress={onSignUpPress}
          className="mt-6 "
        />

        <OAuth />

        <Link
          href={'/(auth)/login'}
          className="text-lg text-center text-general-200 mt-10">
          <Text>Already have an account? </Text>
          <Text className="text-primary-500">Log in</Text>
        </Link>

        {/* verification modal */}

        <ReactNativeModal
          isVisible={pendingVerification.state === 'pending'}
          onModalHide={() => {
            setPendingVerification({
              ...pendingVerification,
              state: 'success',
            });
            if (pendingVerification.state === 'success') setIsSuccess(true);
          }}
          className="flex-1 justify-center items-center">
          <View className="w-full flex  justify-center bg-white px-6 py-8 rounded-2xl h-80">
            <Text className="text-3xl font-JakartaBold text-center">
              Verification
            </Text>

            <Text className="text-base text-gray-900 font-JakartaBold text-center mt-2">
              We have sent a verification code to {form.email}
            </Text>

            <InputField
              label="Code"
              icon={icons.lock}
              placeHolder="123456"
              keyboardType="numeric"
              onChangeText={(code) => {
                setPendingVerification({ ...pendingVerification, code });
              }}
            />

            {pendingVerification.error && (
              <Text className="text-red-500 text-sm mt-2">
                {pendingVerification.error}
              </Text>
            )}

            <CustomButton
              title="Verify"
              bgVariant="success"
              onPress={onPressVerify}
              className="w-full h-fit"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal
          isVisible={isSuccess}
          className="flex-1 justify-center items-center">
          <View className="w-full bg-white px-6 py-8 rounded-2xl min-h-72 max-h-96">
            <Image source={images.check} className=" w-28 h-28 mx-auto my-5" />

            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>

            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account
            </Text>

            <CustomButton
              title="Browse Home"
              className="w-full mt-4"
              onPress={() => {
                setIsSuccess(false);
                router.push('/(root)/(tabs)/home');
              }}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
