import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import LottieView from 'lottie-react-native'
import { useState, useEffect } from "react";
import { getSupabase } from "@/utils/supabase"; // Import the getter function
import { loginSignupStyle } from "@/styles/styles";
import { useRouter } from "expo-router";

export default function LoginSignup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track client-side status

  const router = useRouter()

  const styles = loginSignupStyle();
  // Check if we're on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);


  const login = async () => {
    const supabase = getSupabase(); // Get client instance
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      Alert.alert(error.message);
      setEmail("");
      setPassword("");
    } else {
      Alert.alert("Login Successful");
      setEmail("");
      setPassword("");
      router.push("/(auth)/homepage")
    }
    setLoading(false);
  }

  const signup = async () => {
    const supabase = getSupabase(); // Get client instance
    setLoading(true);
    
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    
    if (error) {
      Alert.alert(error.message);
      setEmail("");
      setPassword("");
    } else {
      Alert.alert("Signup Successful");
      setEmail("");
      setPassword("");
      setIsLogin(true);
    }
    setLoading(false);
  }

  // Show loading indicator until client-side is ready
  if (!isClient || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LottieView 
        source={isLogin 
          ? require("@/assets/animations/loginAnimation.json") 
          : require("@/assets/animations/signupAnimation.json")} 
        autoPlay 
        loop
        style={styles.animation} 
      />
      
      <Text style={styles.headerText}>{isLogin ? "LOGIN" : "SIGN UP"}</Text>
      
      <Text style={styles.subHeader}>
        {isLogin ? "Login to your account" : "Create a new account"}
      </Text>
      
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
        secureTextEntry={!showPassword}
      />
      
      {!isLogin && (
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.textInput}
          secureTextEntry={!showPassword}
        />
      )}
      
      <TouchableOpacity 
        onPress={isLogin ? login : signup}
        disabled={loading}
      >
        <View style={styles.submitButton}>
          <Text style={styles.buttonText}>
            {isLogin ? "Login" : "Sign Up"}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => setIsLogin(!isLogin)} 
        style={styles.toggleButton}
      >
        <Text style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Text style={styles.link}>
            {isLogin ? "Sign Up" : "Login"}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

