import { Dimensions, StyleSheet } from "react-native";


const { width, height } = Dimensions.get('window');


export const onboardingScreenStyle = () =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FFFFFF',
        },
        content: {
            flex: 3,
        },
        slide: {
            width,
            alignItems: 'center',
            paddingHorizontal: 20,
        },
        animationContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },
        animation: {
            width: width * 1.1,
            height: width * 1.1,
        },
        textContainer: {
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: 40,
        },
        title: {
            fontSize: 24,
            fontWeight: '700',
            color: '#1F2937',
            textAlign: 'center',
            marginBottom: 16,
        },
        description: {
            fontSize: 16,
            color: '#6B7280',
            textAlign: 'center',
            lineHeight: 24,
            paddingHorizontal: 20,
        },
        bottomContainer: {
            flex: 1,
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingBottom: 40,
        },
        paginatorContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
        },
        dot: {
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 40,
        },
        skipButton: {
            paddingVertical: 12,
            paddingHorizontal: 20,
        },
        skipText: {
            fontSize: 16,
            color: '#6B7280',
            fontWeight: '500',
        },
        nextButton: {
            paddingVertical: 12,
            paddingHorizontal: 20,
        },
        nextText: {
            fontSize: 16,
            color: '#4F46E5',
            fontWeight: '600',
        },
        getStartedButton: {
            backgroundColor: '#4F46E5',
            paddingVertical: 16,
            paddingHorizontal: 32,
            borderRadius: 12,
            flex: 1,
            alignItems: 'center',
            shadowColor: '#4F46E5',
            shadowOffset: {
            width: 0,
            height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
        },
        getStartedText: {
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: '600',
        },
    })


export const homescreenStyles = () =>
    StyleSheet.create({

    })

export const loginSignupStyle = () => 
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            padding: 20,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        animation: {
            width: "100%",
            height: 250,
            marginVertical: 5
        },
        headerText: {
            fontSize: 24,
            fontWeight: "bold",
            margin: 10,
            textAlign: "center"
        },
        subHeader: {
            fontSize: 16,
            margin: 10,
            textAlign: "center",
            color: "#666"
        },
        textInput: {
            borderColor: "#007bff",
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            marginVertical: 8,
            fontSize: 16
        },
        submitButton: {
            backgroundColor: "#007bff",
            marginVertical: 15,
            borderRadius: 8,
            padding: 12,
            alignItems: "center",
        },
        buttonText: {
            color: "white",
            fontWeight: "bold",
            fontSize: 16
        },
        toggleButton: {
            alignItems: "center",
            marginVertical: 10
        },
        toggleText: {
            fontSize: 14,
            color: "#333"
        },
        link: {
            color: "#007bff",
            fontWeight: "bold"
        }

    })

export const rootStyle = () =>
    StyleSheet.create({
        containor: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }
    })
   