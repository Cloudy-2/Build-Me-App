import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  FlatList,
  Dimensions
} from 'react-native';
import MuscleButton from './components/MuscleButton';
import ActionButton from './components/ActionButton';
import ExerciseDetailModal from './components/ExerciseDetailModal';
import { muscleGroups, baseImage } from './muscleData';
import { getExercisesForMuscle } from './exerciseData';
import { getExerciseDetails } from './exerciseDetails';

const { width } = Dimensions.get('window');

export default function App() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [showMuscleList, setShowMuscleList] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showExerciseDetail, setShowExerciseDetail] = useState(false);
  const [routine, setRoutine] = useState([]); // Array of {exercise, muscle, muscleGroup}

  const handleGroupPress = (groupKey) => {
    setSelectedGroup(groupKey);
    setShowMuscleList(true);
  };

  const handleMuscleSelect = (muscle) => {
    setSelectedMuscle(muscle);
    setShowMuscleList(false);
  };

  const getCurrentImage = () => {
    if (selectedMuscle) {
      return selectedMuscle.image;
    }
    return baseImage;
  };

  const handleCreateRoutine = () => {
    if (selectedMuscle) {
      setShowExercises(true);
    } else {
      // Show alert if no muscle selected
      alert('Please select a muscle first!');
    }
  };

  const handleExercisePress = (exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseDetail(true);
  };

  const addToRoutine = (exercise) => {
    // Check if exercise already in routine
    const alreadyAdded = routine.some(item => item.exercise.name === exercise.name);
    if (!alreadyAdded && selectedMuscle && selectedGroup) {
      setRoutine([...routine, {
        exercise,
        muscle: selectedMuscle,
        muscleGroup: selectedGroup
      }]);
    }
  };

  const removeFromRoutine = (exerciseName) => {
    setRoutine(routine.filter(item => item.exercise.name !== exerciseName));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>BUILD ME APP</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Muscle Group Buttons Grid */}
        <View style={styles.muscleGroupsContainer}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            <MuscleButton
              title="shoulder"
              icon="💪"
              onPress={() => handleGroupPress('shoulder')}
              isSelected={selectedGroup === 'shoulder'}
            />
            <MuscleButton
              title="back"
              icon="🔥"
              onPress={() => handleGroupPress('back')}
              isSelected={selectedGroup === 'back'}
            />
            <MuscleButton
              title="arms"
              icon="💥"
              onPress={() => handleGroupPress('arms')}
              isSelected={selectedGroup === 'arms'}
            />
          </View>

          {/* Center - Anatomy Model */}
          <View style={styles.anatomyContainer}>
            <Image
              source={getCurrentImage()}
              style={styles.anatomyImage}
              resizeMode="contain"
            />
            {selectedMuscle && (
              <View style={styles.muscleLabel}>
                <Text style={styles.muscleLabelText}>{selectedMuscle.name}</Text>
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            <MuscleButton
              title="Chest"
              icon="🦾"
              onPress={() => handleGroupPress('chest')}
              isSelected={selectedGroup === 'chest'}
            />
            <MuscleButton
              title="Core"
              icon="⚡"
              onPress={() => handleGroupPress('core')}
              isSelected={selectedGroup === 'core'}
            />
            <MuscleButton
              title="Legs"
              icon="🦵"
              onPress={() => handleGroupPress('legs')}
              isSelected={selectedGroup === 'legs'}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <ActionButton title="START WORKOUT" onPress={() => { }} />
          <ActionButton title="CREATE ROUTINE" variant="secondary" onPress={handleCreateRoutine} />
        </View>

        {/* Routine Display Section */}
        <View style={styles.routineContainer}>
          <Text style={styles.routineTitle}>
            {selectedGroup
              ? `${muscleGroups[selectedGroup].title.toUpperCase()} ROUTINE (${routine.filter(item => item.muscleGroup === selectedGroup).length})`
              : `MY ROUTINE (${routine.length})`
            }
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.routineScroll}>
            {(() => {
              // Filter routine by selected muscle group
              const filteredRoutine = selectedGroup
                ? routine.filter(item => item.muscleGroup === selectedGroup)
                : routine;

              if (filteredRoutine.length === 0) {
                return (
                  <>
                    <View style={styles.emptyRoutineBox} />
                    <View style={styles.emptyRoutineBox} />
                    <View style={styles.emptyRoutineBox} />
                    <View style={styles.emptyRoutineBox} />
                  </>
                );
              }

              return filteredRoutine.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.routineBox}
                  onPress={() => handleExercisePress(item.exercise)}
                  onLongPress={() => removeFromRoutine(item.exercise.name)}
                >
                  <Text style={styles.routineIcon}>
                    {muscleGroups[item.muscleGroup].icon}
                  </Text>
                  <Text style={styles.routineExerciseName} numberOfLines={2}>
                    {item.exercise.name}
                  </Text>
                  <Text style={styles.routineMuscle} numberOfLines={1}>
                    {item.muscle.name}
                  </Text>
                </TouchableOpacity>
              ));
            })()}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Muscle Selection Modal */}
      <Modal
        visible={showMuscleList}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMuscleList(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedGroup ? muscleGroups[selectedGroup].title : ''} Muscles
              </Text>
              <TouchableOpacity onPress={() => setShowMuscleList(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={selectedGroup ? muscleGroups[selectedGroup].muscles : []}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.muscleItem}
                  onPress={() => handleMuscleSelect(item)}
                >
                  <Text style={styles.muscleItemText}>{item.name}</Text>
                  <Text style={styles.muscleItemArrow}>→</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Exercise Routine Modal */}
      <Modal
        visible={showExercises}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowExercises(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Exercises</Text>
                {selectedMuscle && (
                  <Text style={styles.modalSubtitle}>{selectedMuscle.name}</Text>
                )}
              </View>
              <TouchableOpacity onPress={() => setShowExercises(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={selectedMuscle ? getExercisesForMuscle(selectedMuscle.id) : []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.exerciseItem}
                  onPress={() => handleExercisePress(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{item.name}</Text>
                    <Text style={styles.exerciseDetails}>
                      {item.sets} sets × {item.reps} reps
                    </Text>
                  </View>
                  <View style={styles.difficultyBadge}>
                    <Text style={styles.difficultyText}>{item.difficulty}</Text>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>No exercises available</Text>
                </View>
              }
            />
          </View>
        </View>
      </Modal>

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        visible={showExerciseDetail}
        exercise={selectedExercise}
        onClose={() => setShowExerciseDetail(false)}
        onAddToRoutine={addToRoutine}
        isInRoutine={selectedExercise && routine.some(item => item.exercise.name === selectedExercise.name)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#808080',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#000',
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  muscleGroupsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 4,
  },
  leftColumn: {
    flex: 1,
    alignItems: 'center',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'center',
  },
  anatomyContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  anatomyImage: {
    width: width * 0.4,
    height: 380,
  },
  muscleLabel: {
    backgroundColor: 'rgba(255, 107, 157, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
  },
  muscleLabelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  bottomPlaceholder: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  routineContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  routineTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  routineScroll: {
    flexDirection: 'row',
  },
  emptyRoutineBox: {
    width: 90,
    height: 90,
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4a4a4a',
    marginRight: 10,
  },
  routineBox: {
    width: 90,
    height: 90,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ff6b9d',
    marginRight: 10,
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routineIcon: {
    fontSize: 20,
  },
  routineExerciseName: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  routineMuscle: {
    color: '#aaa',
    fontSize: 8,
    textAlign: 'center',
  },
  placeholderBox: {
    width: 70,
    height: 70,
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4a4a4a',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '300',
  },
  muscleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  muscleItemText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  muscleItemArrow: {
    color: '#ff6b9d',
    fontSize: 20,
    fontWeight: '600',
  },
  modalSubtitle: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseDetails: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: '400',
  },
  difficultyBadge: {
    backgroundColor: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#666',
    fontSize: 16,
  },
});
