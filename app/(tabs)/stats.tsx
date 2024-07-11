import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, ScrollView, useColorScheme, Dimensions, View, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import secondsToDate from '@/lib/secondsToDate';
import { formatId } from '@/lib/formatIdr';

export default function StatsScreen() {
  const currentColor = useColorScheme()
  const [currentDate, setDate] = useState<any>(new Date())
  const options = {
    year: 'numeric',
    month: 'long',
  };
  const context = useAppContext()
  const types = ["Income", "Expense"]
  const [type, setType] = useState(types[0])
  // Filter transactions based on the selected month
  const filteredTransactions = context.transactions?.filter((trans: TransactionInterface) => {
    const transactionDate = new Date(trans.createdAt.seconds * 1000);
    return transactionDate.getFullYear() === currentDate.getFullYear() && transactionDate.getMonth() === currentDate.getMonth() && trans.type === type;
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
    if (curr.type === type) {
      if (!acc[curr.category]) {
        const randomColor = getRandomLightColor();
        acc[curr.category] = {name: curr.category, amount: curr.amount, color: randomColor, legendFontColor: currentColor === "dark" ? "#fff" : "#000", legendFontSize: 12 };
      } else {
        acc[curr.category].amount += curr.amount;
      }
    }
    return acc;
  }, {});


  return (
    <ScrollView className={`${currentColor === "dark" ? "bg-[#111]" : "bg-white"}`}>
      <ThemedView className={`h-96 pt-10`}>
        <ThemedView className={`flex-row items-center gap-4 px-4 pb-4 ${currentColor === "dark" ? "bg-[#181818]" : "bg-white"}`}>
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
        <ThemedView className='flex-row px-4 gap-2 mt-2 mb-4'>
            {types.map(item => (
              <TouchableOpacity onPress={() => setType(item)} className={`${item === type ? "bg-green-400" : currentColor === "dark" ? "bg-[#1b1a1b]" : "bg-[#fff]"} py-2 px-4 flex-1 items-center rounded-lg`}>
                <ThemedText className={`${item === type && "text-black"} text-sm`}>{item}</ThemedText>
              </TouchableOpacity>
            ))}
        </ThemedView>

      {Object.keys(dataPie).length  > 0 && (
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
        />
      )}

        {Object.keys(dataPie).length === 0 && (
        <ThemedView className='px-4 py-14 items-center'>
          <Ionicons name='bar-chart-outline' size={30} color={currentColor === "dark" ? "white" : "black"} />
          <ThemedText className='text-center font-medium mt-2'>No stats yet</ThemedText>
        </ThemedView>
      )}
      </ThemedView>
      <ThemedView className={`px-6 pb-8  ${currentColor === "dark" ? "bg-[#1b1a1b]" : "bg-[#fff]"} rounded-3xl h-screen`}>
        <ThemedView className={`w-16 rounded-full mx-auto mt-6 mb-8 h-1 ${currentColor === "dark" ? "bg-white" : "bg-[#aaa]"}`}></ThemedView>
        <ThemedText type="title" className='mb-4'>Activity</ThemedText>
        {filteredTransactions?.length === 0 && (
          <View className='px-4 py-14 items-center'>
            <Ionicons name='folder-open-outline' size={30} color={currentColor === "dark" ? "white" : "black"} />
            <ThemedText className='text-center font-medium mt-2'>No data yet</ThemedText>
          </View>
        )}
        {filteredTransactions?.map((trans: TransactionInterface) => (
            <ThemedView className={`flex-row ${currentColor === "dark" ? "bg-[#222222]" : "bg-[#f8f8f8]"} py-4 px-4 rounded-lg mb-2`}>
              <View className='flex-1'>
                  <ThemedText className="font-medium">{trans.category}</ThemedText>
                  <ThemedText className={`text-sm ${currentColor === "dark" ? "text-[#A6A6A6]" : "text-[#666]"}`}>{secondsToDate(trans.createdAt.seconds)}</ThemedText>
                  <ThemedText className={`pt-2 text-sm ${currentColor === "dark" ? "text-[#A6A6A6]" : "text-[#666]"}`}>Desc: {trans.description === "" ? "-" : trans.description}</ThemedText>
              </View>
              <View>
                  <ThemedText className={`${trans.type === "Income" ? "text-green-400" : "text-red-500"} text-sm`}>
                      {trans.type === "Income" ? "+" : "-"}
                      {formatId(trans.amount)}
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