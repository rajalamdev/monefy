import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSegments } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { useAppContext } from '@/context/AppContext';


export default function TabLayout() {
  const segments = useSegments()
  const colorScheme = useColorScheme();
  const pagesToHideTabBarWhenFocused = ['report', 'index', undefined, "login", "register"]
  const router = useRouter();
  const context = useAppContext()

  const protectedPage = ["index", "login", "register", undefined]
  const loginResister = ["login", "register"]

  useEffect(() => {
    if (protectedPage.includes(segments[1])){
      FIREBASE_AUTH.onAuthStateChanged((user) => {
        if (!user) {
          if (!loginResister.includes(segments[1])){
            router.replace("/");
          }
        } else {
          router.replace("/home")
          context.setCurrentUser(user)
        }
      });
    }
  }, [segments])

  useEffect(() => {
    FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/");
      } else {
        router.replace("/home")
        context.setCurrentUser(user)
      }
    });
  }, [])
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          // check if the current page is in the list then hide the tab bar
          display: pagesToHideTabBarWhenFocused.includes(segments[1]) ? 'none' : 'flex',
        },
        
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Welcome',
            tabBarButton: () => null,
          }}
        />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: 'Transaction',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
            name={focused || segments[1] === "createTrans" ? 'wallet'  : 'wallet-outline'} 
            color={segments[1] === "createTrans" ? "#38EF7D" : color} 
          />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'stats-chart' : 'stats-chart-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="createTrans"
        options={{
          title: 'Create',
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Register',
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
