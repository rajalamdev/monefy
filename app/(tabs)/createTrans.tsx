import React, { useEffect, useState } from 'react';
import { useColorScheme, View, Platform, TouchableOpacity } from 'react-native';
import { Button, TextInput, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Transaction = {
  date: Date;
  amount: number | string;
  category: string;
  description: string;
};

export default function CreateTransScreen() {
  const [transaction, setTransaction] = useState<Transaction>({
    date: new Date(),
    amount: 0,
    category: '',
    description: '',
  });
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const currentColor = useColorScheme()
  const isAndroid = Platform.OS === 'android';
  const categoryTrans = ["Income", "Expenses"]
  const [currentCategoryTrans, setCurrentCategoryTrans] = useState(categoryTrans[0])
  const route = useRouter()

  const handleDateChange = (event: Event, selectedDate?: Date) => {
    // setShowDateTimePicker(isAndroid ? true : false);
    setShowDateTimePicker(false); // Hide the DateTimePicker after picking a date
    if (selectedDate) {
      setTransaction((prev) => ({ ...prev, date: selectedDate }));
      setShowDateTimePicker(false);
    }
  };

  const handleSubmit = () => {
    // Perform form submission logic here
    console.log('Submitting transaction:', transaction);
  };

  useEffect(() => {
    console.log(transaction)
  }, [transaction])

  return (
    <ThemedView style={{ flex: 1 }}
      className='pb-12 pt-8 px-6'
    >
      <TouchableOpacity onPress={() => route.navigate("transaction")} className='flex-row mb-4 items-center gap-2'>
        <Ionicons name='arrow-back' color={`${currentColor === "dark" ? "white" : "black"}`} size={40} />
        <ThemedText>Add Transaction</ThemedText>
      </TouchableOpacity>
      <ThemedView className='flex-row gap-2'>
          {categoryTrans.map(item => (
            <TouchableOpacity onPress={() => setCurrentCategoryTrans(item)} className={`${item === currentCategoryTrans ? "bg-green-400" : "border border-green-400"} py-2 px-4 flex-1 items-center rounded-lg`}>
              <ThemedText className={`${item === currentCategoryTrans && "text-black"} text-sm`}>{item}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>

      {showDateTimePicker && (
        <DateTimePicker
        testID="dateTimePicker"
        value={transaction.date}
        mode="date"
        is24Hour={true}
        display={isAndroid ? 'default' : 'calendar'}
        onChange={handleDateChange}
      />
      )}
      <TouchableOpacity onPress={() => setShowDateTimePicker(true)} className='flex-row gap-2 mb-4 mt-4'>
        <Ionicons name='calendar-outline' color={`${currentColor === "dark" ? "white" : "black"}`} size={20} />
        <ThemedText>Date:</ThemedText>
          <ThemedText>{transaction.date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",  
          })}</ThemedText>
        <ThemedView className='flex-1 items-end'>
          <Ionicons name='chevron-forward' color={`${currentColor === "dark" ? "white" : "black"}`} size={20} />
        </ThemedView>
      </TouchableOpacity>
      <ThemedView>
        <ThemedText className='mb-1'>Amount</ThemedText>
        <ThemedView className={`flex-row items-center h-12 mb-4 px-4 ${currentColor === "dark" && "bg-[#242424]"} border border-[#7B7B7B] rounded`}>
          <Ionicons name='cash-outline' color={`${currentColor === "dark" ? "white" : "black"}`} size={20} />
          <TextInput 
              value={transaction.amount === "" ? "" : String(transaction.amount)}
              onChangeText={(amount) =>
                setTransaction((prev) => ({ ...prev, amount: amount.length === 0 ? "" :parseFloat(amount)}))
              }
              className={`pl-2 flex-1 ${currentColor === "dark" ? "text-white" : "text-black"}`}
              keyboardType="numeric"
              placeholder="Rp. 35.000" 
              placeholderTextColor={`${currentColor == "dark" ? "#A6A6A6" : "#A6A6A6"}`}
          />
        </ThemedView>
      </ThemedView>
      <ThemedView>
        <ThemedText className='mb-1'>Category</ThemedText>
        <ThemedView className={`flex-row items-center h-12 mb-4 px-4 ${currentColor === "dark" && "bg-[#242424]"} border border-[#7B7B7B] rounded`}>
          <Ionicons name='apps-outline' color={`${currentColor === "dark" ? "white" : "black"}`} size={20} />
          <TextInput 
          value={transaction.category}
          onChangeText={(category: string) =>
            setTransaction((prev) => ({ ...prev, category }))
          }
          keyboardType="default"
          placeholder="Category" 
          className={`pl-2 flex-1 ${currentColor === "dark" ? "text-white" : "text-black"}`}
          placeholderTextColor={`${currentColor == "dark" ? "#A6A6A6" : "#A6A6A6"}`}
      />
        </ThemedView>
      </ThemedView>
      <ThemedView>
        <ThemedText className='mb-1'>Description</ThemedText>
        <ThemedView className={`flex-row items-center h-20 mb-8 px-4 ${currentColor === "dark" && "bg-[#242424]"} border border-[#7B7B7B] rounded`}>
          <Ionicons name='create-outline' color={`${currentColor === "dark" ? "white" : "black"}`} size={20} />
          <TextInput 
          value={transaction.description}
          onChangeText={(description: string) =>
            setTransaction((prev) => ({ ...prev, description }))
          }
          keyboardType="default"
          placeholder="Description" 
          multiline
          className={`pl-2 flex-1 h-full ${currentColor === "dark" ? "text-white" : "text-black"}`}
          placeholderTextColor={`${currentColor == "dark" ? "#A6A6A6" : "#A6A6A6"}`}
        />
        </ThemedView>
      </ThemedView>
      <TouchableOpacity onPress={handleSubmit} className='bg-green-400 py-3 px-4 rounded-lg'>
        <ThemedText className='text-center text-black font-semibold'>Submit</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}