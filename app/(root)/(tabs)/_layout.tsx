import { icons } from '@/constants';
import { Stack, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Image, ImageSourcePropType, View } from 'react-native';
import 'react-native-reanimated';

const TabIcon = ({
  focused,
  source,
}: {
  focused: boolean;
  source: ImageSourcePropType;
}) => (
  <View
    className={`flex flex-row justify-center items-center rounded-full ${
      focused ? ' bg-general-400 ' : ''
    }`}>
    <View
      className={`rounded-full w-12 h-12 items-center justify-center ${
        focused ? ' bg-general-400' : ''
      }`}>
      <Image
        className={`${focused ? 'w-8 h-8 ' : 'w-7 h-7 '}`}
        source={source}
        resizeMode="contain"
      />
    </View>
  </View>
);

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#333333',
          borderRadius: 50,
          paddingBottom: 0,
          overflow: 'hidden',
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          position: 'absolute',
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: 'Rides',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
}
