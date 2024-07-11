import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FIREBASE_APP } from "@/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, ScrollView, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { fetchOnlyMyTransaction } from "../firebase/read";
import { useAppContext } from "@/context/AppContext";
import secondsToDate from "@/lib/secondsToDate";
import { deleteMyTodoItem } from "../firebase/delete";
import { formatId } from "@/lib/formatIdr";

export default function TransactionScreen(){
    const [currentDate, setDate] = useState<any>(new Date())
    const currentColor = useColorScheme()
    const router = useRouter()
    const user = getAuth(FIREBASE_APP).currentUser
    const context = useAppContext()

    const options = {
        year: 'numeric',
        month: 'long',
      };

      const [searchQuery, setSearchQuery] = useState("");

       // Filter transactions based on the selected month
    const filteredTransactions = context.transactions?.filter((trans: TransactionInterface) => {
        const transactionDate = new Date(trans.createdAt.seconds * 1000);
        return (
            transactionDate.getFullYear() === currentDate.getFullYear() && 
            transactionDate.getMonth() === currentDate.getMonth() && 
            (trans.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
            trans.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    const deleteMyTodo = async (docId: any) => {
        try {
          const updatedTasks = context.transactions.filter((t: any) => t.docId !== docId);
          context.setTransactions(updatedTasks);
          await deleteMyTodoItem(docId);
        } catch (error: any) {
          Alert.alert('Something went wrong', error.message);
        }
      };

    return (
        <ThemedView style={{
            flex: 1
        }}>
            <ThemedView className={`pt-10 flex-row items-center gap-4 px-4 pb-4 ${currentColor === "dark" ? "bg-[#181818]" : "bg-white"}`}>
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
            <ThemedView className="px-4 mt-4">
                <TextInput placeholder="Search..." 
                    className={`h-12 px-4 ${currentColor === "dark" ? "bg-[#101010] text-white" : "text-black"} border border-[#7B7B7B] rounded`}
                    placeholderTextColor={`${currentColor == "dark" ? "white" : "black"}`}
                    onChangeText={setSearchQuery}
                />
            </ThemedView>
            <ScrollView style={{
                flex: 1,
            }}
            className="mt-4 px-4"
            >
                {filteredTransactions?.length === 0 && (
                    <ThemedView className='px-4 py-14 items-center'>
                        <Ionicons name='folder-open-outline' size={30} color={currentColor === "dark" ? "white" : "black"} />
                        <ThemedText className='text-center font-medium mt-2'>No data yet</ThemedText>
                    </ThemedView>
                )}
                {filteredTransactions?.map((trans: TransactionInterface) => (
                    <TouchableOpacity
                        onLongPress={() => {
                            Alert.alert(
                            'Alert',
                            'You are trying to delete this todo, Would you like to continue?',
                            [
                                { text: 'Cancel', onPress: () => null },
                                { text: 'Delete', style: 'destructive', onPress: () => deleteMyTodo(trans.docId) },
                            ]
                            );
                        }}
                        className={`flex-row ${currentColor === "dark" ? "bg-[#1b1a1b]" : "bg-[#fff]"} px-4 py-4 rounded-lg mb-2`}
                    >
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
                    </TouchableOpacity>
                ))}
                
            </ScrollView>
            <View className="absolute bottom-12 right-4">
                <Ionicons onPress={() => router.navigate("createTrans")} name="add-circle" color={`${currentColor === "dark" ? "white" : "black"}`} size={60} />
            </View>
        </ThemedView>
    )
}