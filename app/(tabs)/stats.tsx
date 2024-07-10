import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, ScrollView, useColorScheme, Dimensions, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import secondsToDate from '@/lib/secondsToDate';

export default function StatsScreen() {
  const currentColor = useColorScheme()
  const [currentDate, setDate] = useState<any>(new Date())
  const options = {
    year: 'numeric',
    month: 'long',
  };
  const context = useAppContext()
  // Filter transactions based on the selected month
  const filteredTransactions = context.transactions?.filter((trans: TransactionInterface) => {
    const transactionDate = new Date(trans.createdAt.seconds * 1000);
    return transactionDate.getFullYear() === currentDate.getFullYear() && transactionDate.getMonth() === currentDate.getMonth();
  });

  const getRandomLightColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const dataPie = filteredTransactions.reduce((acc: any, curr: any) => {
    if (!acc[curr.type]) {
      const randomColor = getRandomLightColor();
      acc[curr.type] = {name: curr.type, amount: curr.amount, color: randomColor, legendFontColor: currentColor === "dark" ? "#fff" : "#000", legendFontSize: 12 };
    } else {
      acc[curr.type].amount += curr.amount;
    }
    return acc;
  }, {});


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
          data={Object.values(dataPie)}
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
        {filteredTransactions?.map((trans: TransactionInterface) => (
            <ThemedView className={`flex-row ${currentColor === "dark" ? "bg-[#222222]" : "bg-[#eee]"} py-4 px-4 rounded-lg mb-2`}>
              <View className='flex-1'>
                  <ThemedText className="font-medium">{trans.category}</ThemedText>
                  <ThemedText className={`text-sm ${currentColor === "dark" ? "text-[#A6A6A6]" : "text-[#666]"}`}>{secondsToDate(trans.createdAt.seconds)}</ThemedText>
                  <ThemedText className={`pt-2 text-sm ${currentColor === "dark" ? "text-[#A6A6A6]" : "text-[#666]"}`}>Desc: {trans.description === "" ? "-" : trans.description}</ThemedText>
              </View>
              <View>
                  <ThemedText className={`${trans.type === "Income" ? "text-green-400" : "text-red-500"}`}>
                      {trans.type === "Income" ? "+" : "-"}
                      {trans.amount}
                  </ThemedText>
              </View>
            </ThemedView>
        ))}
        
        
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