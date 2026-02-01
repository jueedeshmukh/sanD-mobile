/*
import React, { useState } from 'react'
import { View } from 'react-native'
import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'
import OnboardingScreen from './OnboardingScreen'

type AuthScreenType = 'login' | 'signup' | 'onboarding'

export default function AuthStack() {
  const [currentScreen, setCurrentScreen] = useState<AuthScreenType>('login')

  const handleSignUp = () => {
    setCurrentScreen('signup')
  }

  const handleLogin = () => {
    setCurrentScreen('login')
  }

  const handleSignUpSubmit = () => {
    setCurrentScreen('onboarding')
  }

  const handleOnboardingComplete = () => {
    // Navigate to home screen here
    console.log('Onboarding complete - navigate to home')
    setCurrentScreen('login') // Placeholder for now
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {currentScreen === 'login' && <LoginScreen />}
      {currentScreen === 'signup' && <SignUpScreen onSignUp={handleSignUpSubmit} />}
      {currentScreen === 'onboarding' && <OnboardingScreen onComplete={handleOnboardingComplete} />}
    </View>
  )
}
*/ 