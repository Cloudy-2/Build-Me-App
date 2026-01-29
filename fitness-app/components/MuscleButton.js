import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function MuscleButton({ title, icon, onPress, isSelected }) {
    return (
        <TouchableOpacity
            style={[styles.button, isSelected && styles.buttonSelected]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3a3a3a',
        borderRadius: 12,
        padding: 16,
        marginVertical: 6,
        marginHorizontal: 8,
        minWidth: 90,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#4a4a4a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonSelected: {
        backgroundColor: '#ff6b9d',
        borderColor: '#ff8fb3',
    },
    icon: {
        fontSize: 24,
        marginBottom: 4,
    },
    title: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
});
