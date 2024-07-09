import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

export default function WelcomeScreen(){
    const router = useRouter()

    return (
        <ThemedView>
            <ThemedView style={{
                position: "relative",
                zIndex: 10,
            }}>
                <Image source={require("@/assets/images/welcome-blur.png")} style={{
                    position: "absolute",
                    top: -120,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    width: "auto",
                }} />
                <Image source={require("@/assets/images/debit-cards.png")} style={{
                    position: "absolute",
                    right: 0,
                    left: 0,
                    bottom: 0,
                    top: 60,
                    width: "auto",
                }} />
            </ThemedView>
            <ThemedView style={{
                alignItems: "flex-start",
                justifyContent: "flex-end",
                width: "100%",
                height: "100%"
            }}>
                <ThemedText className="text-4xl font-bold px-4 mb-2">Manage your money with us.</ThemedText>
                <ThemedText className="text-[#A6A6A6] px-4 mb-4">Spending methods and financial management through digital banks</ThemedText>
                <TouchableOpacity 
                    onPress={() => router.navigate("/login")}
                    className="bg-green-400 items-center justify-center h-12 rounded w-[90%] mx-auto mt-4 mb-10"
                >
                    <Text className="font-semibold">Get Started</Text>
                </TouchableOpacity>
            </ThemedView>
        </ThemedView>
    )
}