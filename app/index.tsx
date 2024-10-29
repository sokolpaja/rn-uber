import React from 'react';
import { Redirect } from 'expo-router';

const RootPage = () => {
  return <Redirect href={'/(auth)/welcome'} />;
};

export default RootPage;
