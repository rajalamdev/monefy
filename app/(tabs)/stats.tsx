import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, ScrollView, useColorScheme, Dimensions, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function StatsScreen() {
  const currentColor = useColorScheme()
  const [currentDate, setDate] = useState<any>(new Date())
  const options = {
    year: 'numeric',
    month: 'long',
  };
  const data = [
    { name: 'Food', amount: 50, color: 'yellow', legendFontColor: currentColor === "dark" ? "#fff" : "#000", legendFontSize: 12 },
    { name: 'Transport', amount: 30, color: 'skyblue', legendFontColor: currentColor === "dark" ? "#fff" : "#000", legendFontSize: 12 },
    { name: 'Entertainment', amount: 20, color: 'lightgreen', legendFontColor: currentColor === "dark" ? "#fff" : "#000", legendFontSize: 12 },
  ];

  return (
    <ScrollView className={`${currentColor === "dark" ? "bg-black" : "bg-white"}`}>
      <ThemedView className={`h-72 pt-10`}>
        <ThemedView className="flex-row items-center gap-4 px-4">
            <Ionicons 
                onPress={() => setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} 
                name="chevron-back" size={25} color={`${currentColor === "dark" ? "white" : "black"}`} 
            />
            <ThemedText>{currentDate.toLocaleDateString("en-US",options)}</ThemedText>
            <Ionicons 
                onPress={() => setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} 
                name="chevron-forward" size={25} color={`${currentColor === "dark" ? "white" : "black"}`}
            />
        </ThemedView>
        <PieChart
          data={data}
          width={Dimensions.get('window').width}
          height={200}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="4"
          absolute
        />
      </ThemedView>
      <ThemedView className={`px-6 pb-8  ${currentColor === "dark" ? "bg-[#141414]" : "bg-[#f9f9f9]"} rounded-3xl h-screen`}>
        <ThemedView className={`w-16 rounded-full mx-auto mt-6 mb-8 h-1 ${currentColor === "dark" ? "bg-white" : "bg-[#aaa]"}`}></ThemedView>
        <ThemedText type="title" className='mb-4'>Activity</ThemedText>
        <ThemedView className={`flex-row ${currentColor === "dark" ? "bg-[#222222]" : "bg-[#eee]"} py-4 px-4 rounded-lg mb-2`}>
            <View className='flex-1'>
                <ThemedText className="font-medium">Grocery</ThemedText>
                <ThemedText className={`text-sm ${currentColor === "dark" ? "text-[#A6A6A6]" : "text-[#666]"}`}>24 August 2004</ThemedText>
                <ThemedText className={`pt-2 text-sm ${currentColor === "dark" ? "text-[#A6A6A6]" : "text-[#666]"}`}>Desc: lorem lorem ipsum dolor amet dulur wkwkwkkw</ThemedText>
            </View>
            <View>
                <ThemedText className='text-green-400'>+25.000</ThemedText>
            </View>
        </ThemedView>
        <ThemedView className={`flex-row ${currentColor === "dark" ? "bg-[#222222]" : "bg-[#eee]"} py-4 px-4 rounded-lg mb-2`}>
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
  );                                                                    
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});