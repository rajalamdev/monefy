import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Image, TextInput, TouchableOpacity, View, useColorScheme } from "react-native"

export default function RegisterScreen(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const currentColor = useColorScheme()
    const router = useRouter()

    return (
        <ThemedView className="py-8 px-6 justify-center flex-1 items-center">
            <Image source={require("@/assets/images/blur.png")} className="absolute top-0 left-0" />
            <View className="flex-row gap-2 mb-8">
                <ThemedText type="title">Register to</ThemedText>
                <ThemedText type="title" className="text-green-400">Monefy</ThemedText>
            </View>
            <View>
                <ThemedText className='mb-1'>Username</ThemedText>
                <ThemedView className={`flex-row w-full items-center h-12 mb-4 px-4 ${currentColor === "dark" && "bg-[#222]"} border border-[#7B7B7B] rounded`}>
                    <TextInput 
                        value={username}
                        onChangeText={(name: string) => setUsername(name)}
                        keyboardType="default"
                        placeholder="e.g rajalamdev" 
                        className={`flex-1 ${currentColor === "dark" ? "text-white" : "text-black"}`}
                        placeholderTextColor={`${currentColor == "dark" ? "#A6A6A6" : "#A6A6A6"}`}
                    />
                </ThemedView>
            </View>
            <View>
                <ThemedText className='mb-1'>Password</ThemedText>
                <ThemedView className={`flex-row w-full items-center h-12 mb-4 px-4 ${currentColor === "dark" && "bg-[#222]"} border border-[#7B7B7B] rounded`}>
                    <TextInput 
                        value={password}
                        onChangeText={(pass: string) => setPassword(pass)}
                        keyboardType="default"
                        placeholder="*****" 
                        className={`flex-1 ${currentColor === "dark" ? "text-white" : "text-black"}`}
                        placeholderTextColor={`${currentColor == "dark" ? "#A6A6A6" : "#A6A6A6"}`}
                    />
                </ThemedView>
            </View>
            <ThemedView className="flex-row gap-2">
                <ThemedText className={`${currentColor === "dark" ? "text-[#A6A6A6]" : "text-[#666]"}`}>Already have an account?</ThemedText>
                <TouchableOpacity onPress={() => router.navigate("login")}>
                    <ThemedText className="border-b border-green-400">Login</ThemedText>
                </TouchableOpacity>
            </ThemedView>
            <TouchableOpacity onPress={() => router.replace("home")} className="bg-green-400 w-full py-3 rounded-lg mt-4">
                <ThemedText className="text-center text-black font-medium">Register</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    )
}