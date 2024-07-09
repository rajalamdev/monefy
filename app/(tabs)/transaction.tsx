import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, TextInput, useColorScheme, View } from "react-native";

export default function TransactionScreen(){
    const [currentDate, setDate] = useState<any>(new Date())
    const currentColor = useColorScheme()
    const router = useRouter()

    const options = {
        year: 'numeric',
        month: 'long',
      };
    return (
        <ThemedView style={{
            flex: 1
        }}>
            <ThemedView className="pt-10 flex-row items-center gap-4 px-4">
                <Ionicons 
                    onPress={() => setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} 
                    name="chevron-back-outline" size={25} color="white" 
                />
                <ThemedText>{currentDate.toLocaleDateString("en-US",options)}</ThemedText>
                <Ionicons 
                    onPress={() => setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} 
                    name="chevron-forward" size={25} color="white"
                />
            </ThemedView>
            <ThemedView className="px-4 mt-4">
                <TextInput placeholder="Search..." 
                    className={`h-12 px-4 ${currentColor === "dark" ? "bg-[#101010] text-white" : "text-black"} border border-[#7B7B7B] rounded`}
                    placeholderTextColor={`${currentColor == "dark" ? "white" : "black"}`}
                />
            </ThemedView>
            <ScrollView style={{
                flex: 1,
            }}
            className="mt-4 px-4"
            >
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
                
            </ScrollView>
            <View className="absolute bottom-12 right-4">
                <Ionicons onPress={() => router.navigate("createTrans")} name="add-circle" color={`${currentColor === "dark" ? "white" : "black"}`} size={60} />
            </View>
        </ThemedView>
    )
}