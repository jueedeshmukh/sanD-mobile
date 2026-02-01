import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import { supabase } from '../supabaseClient'
import { useRouter } from 'expo-router'

export default function SignUpScreen() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const handleSubmit = async () => {
    setError(null)
    setMessage(null)

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      })

      if (error) throw error

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user.id, name: formData.name, email: formData.email, college: null }])
      
        if (profileError) throw profileError

      //setMessage('Sign up successful! Please check your email to confirm your account.')

      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

      // Show success alert and navigate to onboarding
      Alert.alert(
        'Success!', 
        'Account created! Let\'s set up your profile',
        [{ text: 'OK', onPress: () => router.push('/OnboardingScreen') }]
      )

    } catch (error) {
      setError(error.message)
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={formData.name}
            onChangeText={(value) => handleChange('name', value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            value={formData.password}
            onChangeText={(value) => handleChange('password', value)}
            secureTextEntry
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#999"
            value={formData.confirmPassword}
            onChangeText={(value) => handleChange('confirmPassword', value)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/LoginScreen')}>
            <Text style={styles.toggleLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  form: {
    maxWidth: 400,
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 30,
    color: '#1a1a1a'
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 8,
    color: '#1a1a1a'
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1a1a1a'
  },
  button: {
    backgroundColor: '#646cff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20
  },
  buttonDisabled: {
    backgroundColor: '#999'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400'
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  toggleText: {
    fontSize: 14,
    color: '#666'
  },
  toggleLink: {
    fontSize: 14,
    color: '#646cff',
    fontWeight: '500'
  }
})