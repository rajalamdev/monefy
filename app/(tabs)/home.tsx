import { Image, StyleSheet, Platform, ScrollView, Appearance, useColorScheme,ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import secondsToDate from '@/lib/secondsToDate';
import { formatId } from '@/lib/formatIdr';

export default function HomeScreen() {
  const currentColor = useColorScheme()
  const filter = ["Day", "Month", "Year", "None"]
  const [currentFilter, setCurrentFilter] = useState(filter[0])
  const [loading, setLoading] = useState(false)
  const context = useAppContext()
  const sortedTransactions = context.transactions?.sort((a: any, b: any) => {
    return Number(new Date(b.createdAt.toDate().getTime())) - Number(new Date(a.createdAt.toDate().getTime()));
  }).slice(0, 3)

  const getFilteredTransactions = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    switch (currentFilter) {
      case "Day":
        return context.transactions?.filter((trans: any) => {
          const transDate = new Date(trans.createdAt.toDate().getTime());
          return transDate.getFullYear() === currentYear && transDate.getMonth() === currentMonth && transDate.getDate() === currentDay;
        });
      case "Month":
        return context.transactions?.filter((trans: any) => {
          const transDate = new Date(trans.createdAt.toDate().getTime());
          return transDate.getFullYear() === currentYear && transDate.getMonth() === currentMonth;
        });
      case "Year":
        return context.transactions?.filter((trans: any) => {
          const transDate = new Date(trans.createdAt.toDate().getTime());
          return transDate.getFullYear() === currentYear;
        });
      default:
        return context.transactions;
    }
  };

  const filteredTransactions = getFilteredTransactions();

  return (
    <ThemedView style={{
      flex: 1
    }}
    className='pb-4'
    >
      <ScrollView style={{
      // height: "100%",
      flex: 1,
    }}
    >
      <ThemedView className={`flex-row justify-between px-4 pt-10 pb-6 items-center ${currentColor === "dark" ? "bg-[#181818]" : "bg-white"}`} style={{
        flex: 1
      }}>
        {loading ? (
          <ThemedText>Log Out...</ThemedText>
        ) : (
          <>
            <Ionicons onPress={() => Appearance.setColorScheme(currentColor === "dark" ? "light" : "dark")} name='moon-outline' size={25} color={currentColor === "dark" ? "white" : "black"} />
            <ThemedText>{context.currentUser?.email}</ThemedText>
            <Ionicons onPress={() => {
              try {
                setLoading(true)
                FIREBASE_AUTH.signOut()
              } catch (error) {
                console.log(error)
              } finally {
                setLoading(false)
              }}} 
              name='log-out-outline' size={30} color={currentColor === "dark" ? "red" : "red"} 
            />
          </>
        )}
      </ThemedView>
      <ThemedView className='flex-row px-4 pt-2 pb-4 gap-2'>
        {filter.map(item => (
          <TouchableOpacity onPress={() => setCurrentFilter(item)} className={`${item === currentFilter ? "bg-green-400" : currentColor === "dark" ? "bg-[#1b1a1b]" : "bg-[#fff]"} py-2 px-4 flex-1 items-center rounded-lg`}>
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
            <ThemedText className={`font-medium ${currentColor === "dark" ? "text-white" : "text-[#333]"}`}>Total</ThemedText>
            <ThemedText className={`text-2xl font-bold ${currentColor === "dark" ? "text-white" : "text-[#333]"}`}>{formatId(filteredTransactions?.reduce((total: any, trans: any) => total + (trans.type === "Income" ? trans.amount : -trans.amount), 0))}</ThemedText>
          </View>
          <View className='flex-1 items-end flex-row justify-between'>
            <View>
              <ThemedText className={`font-medium ${currentColor === "dark" ? "text-white" : "text-[#333]"}`}>Number</ThemedText>
              <ThemedText className={`font-medium ${currentColor === "dark" ? "text-white" : "text-[#333]"}`}>1152200003</ThemedText>
            </View>
            <View className='items-end'>
              <ThemedText className={`font-medium ${currentColor === "dark" ? "text-white" : "text-[#333]"}`}>Exp</ThemedText>
              <ThemedText className={`font-medium ${currentColor === "dark" ? "text-white" : "text-[#333]"}`}>24/84</ThemedText>
            </View>
          </View>
        </ImageBackground>
      </ThemedView>
      <ThemedView className='px-4 flex-row gap-4'>
        <ThemedView className={`${currentColor === "dark" ? "bg-[#1b1a1b]" : "bg-[#fff]"} rounded-lg p-4 flex-1 flex-row items-center`}>
          <Ionicons name='card-outline' size={25} color={currentColor === "dark" ? "#4ade80" : "#4ade80"} />
          <View className='pl-2'>
            <ThemedText className='font-medium'>Income</ThemedText>
            <ThemedText className={`text-sm ${currentColor === "dark" ? "text-[#A6A6A6]" : "text-[#666]"}`}>{formatId(filteredTransactions?.reduce((total: any, trans: any) => total + (trans.type === "Income" ? trans.amount : 0), 0))}</ThemedText>          
          </View>
        </ThemedView>
        <ThemedView className={`${currentColor === "dark" ? "bg-[#1b1a1b]" : "bg-[#fff]"} rounded-lg p-4 flex-1 flex-row items-center`}>
          <Ionicons name='wallet-outline' size={25} color={currentColor === "dark" ? "red" : "#ef4444"} />
          <View className='pl-2'>
            <ThemedText className='font-medium'>Expense</ThemedText>
            <ThemedText className={`text-sm ${currentColor === "dark" ? "text-[#A6A6A6]" : "text-[#666]"}`}>{formatId(filteredTransactions?.reduce((total: any, trans: any) => total + (trans.type === "Expense" ? trans.amount : 0), 0))}</ThemedText>          
          </View>
        </ThemedView>
      </ThemedView>
      <ThemedView className='px-4 pt-8'>
        <ThemedText className='font-medium mb-2'>Recent Activity</ThemedText>
        {sortedTransactions?.length === 0 && (
          <ThemedView className='px-4 py-14 items-center'>
            <Ionicons name='folder-open-outline' size={30} color={currentColor === "dark" ? "white" : "black"} />
            <ThemedText className='text-center font-medium mt-2'>No data yet</ThemedText>
          </ThemedView>
        )}
        {sortedTransactions?.map((trans: TransactionInterface) => (
            <ThemedView className={`flex-row ${currentColor === "dark" ? "bg-[#1b1a1b]" : "bg-[#fff]"} px-4 py-4 rounded-lg mb-2`}>
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
    </ThemedView>
  );
}