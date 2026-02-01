import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import { supabase } from '../supabaseClient'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function HomePage() {
  const [courses, setCourses] = useState([])
  const [expandedCourses, setExpandedCourses] = useState({}) // Track which courses are expanded
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        Alert.alert('Error', 'Please log in')
        return
      }

      const { data, error } = await supabase
        .from('user_courses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setCourses(data || [])
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleCourse = (courseId) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }))
  }

  const deleteCourse = async (courseId) => {
    Alert.alert(
      'Delete Course',
      'Are you sure you want to remove this course?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('user_courses')
                .delete()
                .eq('id', courseId)

              if (error) throw error

              Alert.alert('Success', 'Course removed')
              loadCourses()
            } catch (error) {
              Alert.alert('Error', error.message)
            }
          }
        }
      ]
    )
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Courses</Text>

      {courses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No courses added yet</Text>
          <Text style={styles.emptySubtext}>Add courses to find study buddies!</Text>
        </View>
      ) : (
        courses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            {/* Course Header - Clickable to expand/collapse */}
            <TouchableOpacity 
              style={styles.courseHeader}
              onPress={() => toggleCourse(course.id)}
            >
              <Text style={styles.courseCode}>{course.course_code}</Text>
              <Ionicons 
                name={expandedCourses[course.id] ? 'chevron-up' : 'chevron-down'} 
                size={24} 
                color="#666" 
              />
            </TouchableOpacity>

            {/* Dropdown Content - Only shown when expanded */}
            {expandedCourses[course.id] && (
              <View style={styles.dropdownContent}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Added:</Text>
                  <Text style={styles.detailValue}>
                    {new Date(course.created_at).toLocaleDateString()}
                  </Text>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => {
                      // Navigate to find study buddies for this course
                      Alert.alert('Feature', 'Find study buddies for ' + course.course_code)
                    }}
                  >
                    <Ionicons name="people" size={20} color="#646cff" />
                    <Text style={styles.actionButtonText}>Find Study Buddies</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => {
                      // Navigate to create request for this course
                      Alert.alert('Feature', 'Create request for ' + course.course_code)
                    }}
                  >
                    <Ionicons name="add-circle" size={20} color="#646cff" />
                    <Text style={styles.actionButtonText}>Post Request</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => deleteCourse(course.id)}
                  >
                    <Ionicons name="trash" size={20} color="#ff4444" />
                    <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
                      Remove Course
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))
      )}

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => Alert.alert('Feature', 'Navigate to add courses page')}
      >
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add New Course</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    color: '#1a1a1a'
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden'
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9'
  },
  courseCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a'
  },
  dropdownContent: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0'
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500'
  },
  detailValue: {
    fontSize: 14,
    color: '#1a1a1a'
  },
  actionButtons: {
    gap: 10
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    gap: 8
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#646cff'
  },
  deleteButton: {
    backgroundColor: '#fff0f0'
  },
  deleteButtonText: {
    color: '#ff4444'
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb'
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#646cff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
})