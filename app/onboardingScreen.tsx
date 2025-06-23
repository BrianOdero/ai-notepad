import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Animated,
  FlatList,
} from 'react-native';
import LottieView from 'lottie-react-native';

import { onboardingScreenStyle } from '@/styles/styles';

const { width } = Dimensions.get('window');

import { MMKV } from 'react-native-mmkv'
import { useRouter } from 'expo-router';
import { setOnboardingComplete } from '@/utils/storage';

export const storage = new MMKV()

const router = useRouter()

interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  animation: any;
}

const onboardingData: OnboardingItem[] = [
  {
    id: 1,
    title: 'Welcome',
    description: 'Start your journey with us and discover amazing features',
    animation: require('@/assets/animations/onboarding1.json'),
  },
  {
    id: 2,
    title: 'Friendly work environment',
    description: 'Collaborate with your team in a supportive workspace',
    animation: require('@/assets/animations/onboarding2.json'),
  },
  {
    id: 3,
    title: 'Join our team',
    description: 'Become part of our growing community of professionals',
    animation: require('@/assets/animations/onboarding3.json'),
  },
];

const OnboardingScreen: React.FC = () => {
  const styles = onboardingScreenStyle();

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<OnboardingItem>>(null);
  const animationRefs = useRef<(LottieView | null)[]>([]);


  const completeOnboarding = () => {
    setOnboardingComplete();
  };

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);

      animationRefs.current[newIndex]?.play();

      animationRefs.current.forEach((ref, index) => {
        if (index !== newIndex) {
          ref?.pause();
        }
      });
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const skip = () => {
    slidesRef.current?.scrollToIndex({
      index: onboardingData.length - 1,
      animated: true,
    });
  };

  const renderItem = ({ item, index }: { item: OnboardingItem; index: number }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.animationContainer}>
          <LottieView
            ref={(ref) => {
              animationRefs.current[index] = ref;
            }}
            source={item.animation}
            style={styles.animation}
            autoPlay={index === 0}
            loop={true}
            speed={0.8}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const Paginator = () => {
    return (
      <View style={styles.paginatorContainer}>
        {onboardingData.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                  backgroundColor: i === currentIndex ? '#4F46E5' : '#D1D5DB',
                },
              ]}
              key={i.toString()}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        <FlatList
          ref={slidesRef}
          data={onboardingData}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Paginator />

        <View style={styles.buttonContainer}>
          {currentIndex < onboardingData.length - 1 ? (
            <>
              <TouchableOpacity style={styles.skipButton} onPress={skip}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.nextButton} onPress={scrollTo}>
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.getStartedButton} onPress={completeOnboarding}>
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;
