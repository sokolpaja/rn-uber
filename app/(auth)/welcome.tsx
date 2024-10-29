import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { onboarding } from '@/constants';
import CustomButton from '@/components/CustomBtn';

const welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>();

  const isLastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => router.replace('/(auth)/welcome')}
        className="w-full flex justify-end items-end p-5">
        <Text className="text-stone-700 text-md font-JakartaBold hover:underline">
          Skip
        </Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-8 h-1 mx-1 bg-blue-100" />}
        activeDot={<View className="w-8 h-1 mx-1 bg-blue-500" />}
        onIndexChanged={(idx) => setActiveIndex(idx)}>
        {onboarding.map((item) => (
          <View
            key={item.id}
            className="flex justify-center items-center p-4 w-full gap-3">
            <Image
              source={item.image}
              className="w-full h-80"
              resizeMode="contain"
            />
            <View className="flex flex-row  justify-center items-center w-full mt-8 px-4">
              <Text className="text-black font-bold text-3xl mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-lg font-JakartaSemiBold text-center text-gray-400 mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        className="w-11/12 mt-10"
        title={isLastSlide ? 'Get Started' : 'Next'}
        onPress={() => {
          isLastSlide
            ? router.replace('/(auth)/register')
            : swiperRef.current?.scrollBy(1);
        }}
      />
    </SafeAreaView>
  );
};

export default welcome;
