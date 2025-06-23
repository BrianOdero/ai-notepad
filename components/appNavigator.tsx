// components/AppNavigator.tsx
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getOnboardingStatus } from '@/utils/storage';

import Index from "@/app/index"; // Your onboarding screen
import LoginSignup from '@/app/loginSignup'; // Your login/signup screen
import OnboardingScreen from '@/app/index';

export default function AppNavigator() {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const onboarded = getOnboardingStatus();
    setIsOnboarded(onboarded);
  }, []);

  if (!isClient || isOnboarded === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isOnboarded ? <LoginSignup /> : <OnboardingScreen />;
}