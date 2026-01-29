import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ActionButton({ title, onPress, variant = 'primary' }) {
    return (
        <TouchableOpacity
            style={[styles.button, variant === 'secondary' && styles.buttonSecondary]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 24,
        marginHorizontal: 8,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2196F3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonSecondary: {
        backgroundColor: '#4CAF50',
        shadowColor: '#4CAF50',
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
