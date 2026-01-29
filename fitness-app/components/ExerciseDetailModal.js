import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { getExerciseDetails } from '../exerciseDetails';

export default function ExerciseDetailModal({ visible, exercise, onClose, onAddToRoutine, isInRoutine }) {
    if (!exercise) return null;

    const details = getExerciseDetails(exercise.name);

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <ScrollView style={styles.detailModalContent}>
                    <View style={styles.detailHeader}>
                        <TouchableOpacity onPress={onClose} style={styles.backButton}>
                            <Text style={styles.backButtonText}>← Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.detailTitle}>{exercise.name}</Text>
                    </View>

                    <View style={styles.detailContent}>
                        {/* Exercise Stats */}
                        <View style={styles.statsRow}>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Sets</Text>
                                <Text style={styles.statValue}>{exercise.sets}</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Reps</Text>
                                <Text style={styles.statValue}>{exercise.reps}</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Difficulty</Text>
                                <Text style={styles.statValue}>{exercise.difficulty}</Text>
                            </View>
                        </View>

                        {/* Add to Routine Button */}
                        {onAddToRoutine && (
                            <TouchableOpacity
                                style={[styles.addButton, isInRoutine && styles.addButtonDisabled]}
                                onPress={() => {
                                    if (!isInRoutine) {
                                        onAddToRoutine(exercise);
                                        onClose();
                                    }
                                }}
                                disabled={isInRoutine}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.addButtonText}>
                                    {isInRoutine ? '✓ Added to Routine' : '+ Add to Routine'}
                                </Text>
                            </TouchableOpacity>
                        )}

                        {/* Description */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>📋 Description</Text>
                            <Text style={styles.sectionText}>{details.description}</Text>
                        </View>

                        {/* Execution Steps */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>✅ How to Execute</Text>
                            {details.execution.map((step, index) => (
                                <View key={index} style={styles.stepItem}>
                                    <Text style={styles.stepNumber}>{index + 1}</Text>
                                    <Text style={styles.stepText}>{step}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Form Tips */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>💡 Form Tips</Text>
                            {details.formTips.map((tip, index) => (
                                <View key={index} style={styles.tipItem}>
                                    <Text style={styles.bulletPoint}>•</Text>
                                    <Text style={styles.tipText}>{tip}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Target Muscles */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>🎯 Target Muscles</Text>
                            <Text style={styles.sectionText}>{details.targetMuscles}</Text>
                        </View>

                        {/* Equipment */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>🏋️ Equipment</Text>
                            <Text style={styles.sectionText}>{details.equipment}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    detailModalContent: {
        flex: 1,
    },
    detailHeader: {
        backgroundColor: '#2a2a2a',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#3a3a3a',
    },
    backButton: {
        marginBottom: 10,
    },
    backButtonText: {
        color: '#ff6b9d',
        fontSize: 16,
        fontWeight: '600',
    },
    detailTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    },
    detailContent: {
        padding: 20,
        paddingBottom: 40,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    statBox: {
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        flex: 1,
        marginHorizontal: 4,
    },
    statLabel: {
        color: '#aaa',
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 4,
    },
    statValue: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    sectionText: {
        color: '#ccc',
        fontSize: 15,
        lineHeight: 22,
    },
    stepItem: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'flex-start',
    },
    stepNumber: {
        color: '#ff6b9d',
        fontSize: 16,
        fontWeight: '700',
        marginRight: 12,
        backgroundColor: '#2a2a2a',
        width: 28,
        height: 28,
        borderRadius: 14,
        textAlign: 'center',
        lineHeight: 28,
    },
    stepText: {
        color: '#ccc',
        fontSize: 15,
        lineHeight: 22,
        flex: 1,
    },
    tipItem: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'flex-start',
    },
    bulletPoint: {
        color: '#4CAF50',
        fontSize: 20,
        marginRight: 12,
        lineHeight: 22,
    },
    tipText: {
        color: '#ccc',
        fontSize: 15,
        lineHeight: 22,
        flex: 1,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    addButtonDisabled: {
        backgroundColor: '#555',
        shadowColor: '#000',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
