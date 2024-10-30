import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

const RootPage = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={'/(root)/(tabs)/home'} />;
  }
  return <Redirect href={'/(auth)/welcome'} />;
};

export default RootPage;
