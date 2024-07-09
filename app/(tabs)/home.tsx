import { Image, StyleSheet, Platform, ScrollView, Appearance, useColorScheme,ImageBackground, View, Text, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function HomeScreen() {
  const currentColor = useColorScheme()
  const filter = ["No Filter", "Monthly", "Yearly"]
  const [currentFilter, setCurrentFilter] = useState(filter[0])

  return (
    <ThemedView style={{
      flex: 1,
      justifyContent: "center",
    }}>
      <ScrollView style={{
        // height: "100%",
        flex: 1,
      }}>
        <ThemedView className='flex-row justify-between px-4 pt-12 pb-8  items-center' style={{
          flex: 1
        }}>
          <Ionicons onPress={() => Appearance.setColorScheme(currentColor === "dark" ? "light" : "dark")} name='apps-outline' size={25} color={currentColor === "dark" ? "white" : "black"} />
          <ThemedText>Hello, Raj Alam!</ThemedText>
          <Ionicons name='notifications-outline' size={25} color={currentColor === "dark" ? "white" : "black"} />
        </ThemedView>
        <ThemedView className='flex-row px-4 pb-4 gap-2'>
          {filter.map(item => (
            <TouchableOpacity onPress={() => setCurrentFilter(item)} className={`${item === currentFilter ? "bg-green-400" : "border border-green-400"} py-2 px-4 flex-1 items-center rounded-lg`}>
              <ThemedText className={`${item === currentFilter && "text-black"} text-sm`}>{item}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
        <ThemedView className='px-4 pb-4'>
          <ImageBackground source={require("@/assets/images/cards.png")}
            resizeMode="cover"
            className='rounded-lg overflow-hidden p-3'
            style={{flex: 1, height: 180}}
          >
            <View>
              <ThemedText className='font-medium'>Total</ThemedText>
              <ThemedText className='text-2xl font-bold '>Rp. 123.000.000</ThemedText>
            </View>
            <View className='flex-1 items-end flex-row justify-between'>
              <View>
                <ThemedText className='font-medium'>Number</ThemedText>
                <ThemedText className='font-medium'>115 22 000 03</ThemedText>
              </View>
              <View className='items-end'>
                <ThemedText className='font-medium'>Exp</ThemedText>
                <ThemedText className='font-medium'>24/84</ThemedText>
              </View>
            </View>
          </ImageBackground>
        </ThemedView>
        <ThemedView className='px-4 flex-row gap-4'>
          <ThemedView className={`${currentColor === "dark" ? "bg-[#141414]" : "bg-[#eee]"} rounded-lg p-4 flex-1`}>
            <ThemedText className='text-green-400'>Income</ThemedText>
            <ThemedText>Rp. 20.000.000</ThemedText>          
          </ThemedView>
          <ThemedView className={`${currentColor === "dark" ? "bg-[#141414]" : "bg-[#eee]"} rounded-lg p-4 flex-1`}>
            <ThemedText className='text-red-400'>Expenses</ThemedText>
            <ThemedText>Rp. 20.000.000</ThemedText>          
          </ThemedView>
        </ThemedView>
        <ThemedView className='px-4 pt-8'>
          <ThemedText className='font-medium mb-2'>Recent Activity</ThemedText>
          <ThemedView className={`flex-row ${currentColor === "dark" ? "bg-[#141414]" : "bg-[#eee]"} px-4 py-4 rounded-lg mb-2`}>
              <View className='flex-1'>
                  <ThemedText className="font-medium">Grocery</ThemedText>
                  <ThemedText className={`text-sm ${currentColor === "dark" ? "text-[#A6A6A6]" : "text-[#666]"}`}>24 August 2004</ThemedText>
                  <ThemedText className={`pt-2 text-sm ${currentColor === "dark" ? "text-[#A6A6A6]" : "text-[#666]"}`}>Desc: lorem lorem ipsum dolor amet dulur wkwkwkkw</ThemedText>
              </View>
              <View>
                  <ThemedText className='text-green-400'>+25.000</ThemedText>
              </View>
          </ThemedView>
          <ThemedView className={`flex-row ${currentColor === "dark" ? "bg-[#141414]" : "bg-[#eee]"} px-4 py-4 rounded-lg mb-2`}>
                <View className='flex-1'>
                    <ThemedText className="font-medium">Grocery</ThemedText>
                    <ThemedText className={`text-sm ${currentColor === "dark" ? "text-[#A6A6A6]" : "text-[#666]"}`}>24 August 2004</ThemedText>
                    <ThemedText className={`pt-2 text-sm ${currentColor === "dark" ? "text-[#A6A6A6]" : "text-[#666]"}`}>Desc: lorem lorem ipsum dolor amet dulur wkwkwkkw</ThemedText>
                </View>
                <View>
                    <ThemedText className='text-green-400'>+25.000</ThemedText>
                </View>
            </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
