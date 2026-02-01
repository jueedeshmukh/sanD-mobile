import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native'

export default function OnboardingScreen({ onComplete }: { onComplete?: () => void }) {
  const [courses, setCourses] = useState<string[]>([])
  const [currentCourse, setCurrentCourse] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [college, setCollege] = useState('')

  const colleges = ['Seventh', 'ERC', 'Marshall', 'Sixth', 'Muir', 'Revelle', 'Eight', 'Warren']

  const handleAddCourse = () => {
    if (currentCourse.trim()) {
      setCourses([...courses, currentCourse.trim()])
      setCurrentCourse('')
      setIsAdding(false)
    }
  }

  const handleRemoveCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    console.log('Onboarding submitted:', { courses, college })
    if (onComplete) {
      onComplete()
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Complete Your Profile</Text>

        {/* Courses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Add Your Courses</Text>

          <FlatList
            data={courses}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View style={styles.courseItem}>
                <Text style={styles.courseText}>{item}</Text>
                <TouchableOpacity onPress={() => handleRemoveCourse(index)}>
                  <Text style={styles.removeButton}>×</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {isAdding ? (
            <View style={styles.addCourseRow}>
              <TextInput
                style={[styles.input, styles.courseInput]}
                placeholder="e.g., CSE 101"
                placeholderTextColor="#999"
                value={currentCourse}
                onChangeText={setCurrentCourse}
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addCourseButton} onPress={() => setIsAdding(true)}>
              <Text style={styles.addCourseButtonText}>+ Add Course</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* College Dropdown */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Select Your College</Text>
          <View style={styles.pickerContainer}>
            <FlatList
              data={colleges}
              keyExtractor={(item) => item}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.collegeOption,
                    college === item && styles.collegeOptionSelected
                  ]}
                  onPress={() => setCollege(item)}
                >
                  <Text
                    style={[
                      styles.collegeOptionText,
                      college === item && styles.collegeOptionTextSelected
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, { marginTop: 30 }]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Complete Onboarding</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 40
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
  section: {
    marginBottom: 25
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
    color: '#1a1a1a'
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  courseText: {
    fontSize: 14,
    color: '#1a1a1a',
    flex: 1
  },
  removeButton: {
    fontSize: 24,
    color: '#ff6b6b',
    paddingLeft: 8
  },
  addCourseRow: {
    flexDirection: 'row',
    gap: 8
  },
  courseInput: {
    flex: 1
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: '#1a1a1a'
  },
  addButton: {
    backgroundColor: '#646cff',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  },
  addCourseButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center'
  },
  addCourseButtonText: {
    color: '#646cff',
    fontSize: 14,
    fontWeight: '400'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden'
  },
  collegeOption: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff'
  },
  collegeOptionSelected: {
    backgroundColor: '#646cff'
  },
  collegeOptionText: {
    fontSize: 14,
    color: '#1a1a1a'
  },
  collegeOptionTextSelected: {
    color: '#fff',
    fontWeight: '500'
  },
  button: {
    backgroundColor: '#646cff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400'
  }
})
