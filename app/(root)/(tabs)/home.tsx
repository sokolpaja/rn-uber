import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';

const home = () => {
  const { user } = useUser();

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/login">
          <Text>Login In</Text>
        </Link>
        <Link href="/(auth)/register-screen">
          <Text>Register</Text>
        </Link>
      </SignedOut>
    </View>
  );
};

export default home;
