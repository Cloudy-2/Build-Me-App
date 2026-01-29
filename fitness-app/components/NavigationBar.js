import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function NavigationBar({ activePage, onPageChange }) {
    const buttons = [
        { id: 'feed', label: 'FEED' },
        { id: 'dashboard', label: 'DASHBOARD' },
        { id: 'logworkout', label: 'LOG\nWORK\nOUT' },
        { id: 'profile', label: 'PROFILE' }
    ];

    return (
        <View style={styles.container}>
            {buttons.map((button) => (
                <TouchableOpacity
                    key={button.id}
                    style={[
                        styles.button,
                        activePage === button.id && styles.buttonActive
                    ]}
                    onPress={() => onPageChange(button.id)}
                    activeOpacity={0.7}
                >
                    <Text style={[
                        styles.buttonText,
                        activePage === button.id && styles.buttonTextActive
                    ]}>
                        {button.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#c0c0c0',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 3,
        borderBottomColor: '#000',
    },
    button: {
        flex: 1,
        backgroundColor: '#808080',
        marginHorizontal: 4,
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 60,
    },
    buttonActive: {
        backgroundColor: '#606060',
        borderColor: '#ff6b9d',
    },
    buttonText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    buttonTextActive: {
        color: '#ff6b9d',
    },
});
