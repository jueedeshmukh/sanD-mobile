import React, { useState } from 'react'
import { View } from 'react-native'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import OnboardingScreen from '../screens/OnboardingScreen'

type AuthScreenType = 'login' | 'signup' | 'onboarding'

export default function AuthLayout() {
  const [currentScreen, setCurrentScreen] = useState<AuthScreenType>('login')

  const handleSignUpNav = () => {
    setCurrentScreen('signup')
  }

  const handleLoginNav = () => {
    setCurrentScreen('login')
  }

  const handleSignUpSubmit = () => {
    setCurrentScreen('onboarding')
  }

  const handleOnboardingComplete = () => {
    // TODO: Update root layout auth state to show home screen
    console.log('Onboarding complete - transitioning to home')
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {currentScreen === 'login' && <LoginScreen onSignUpNav={handleSignUpNav} />}
      {currentScreen === 'signup' && (
        <SignUpScreen onSignUp={handleSignUpSubmit} onLoginNav={handleLoginNav} />
      )}
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
    </View>
  )
}
