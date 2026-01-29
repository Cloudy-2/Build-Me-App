import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Profile() {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <Text style={styles.icon}>👤</Text>
                    <Text style={styles.title}>PROFILE</Text>
                    <Text style={styles.subtitle}>Your Fitness Profile</Text>
                    <Text style={styles.description}>
                        This page will display your profile information, settings, and personal fitness goals.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 60,
    },
    icon: {
        fontSize: 60,
        marginBottom: 20,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 12,
        letterSpacing: 1,
    },
    subtitle: {
        color: '#ff6b9d',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
    },
    description: {
        color: '#aaa',
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 22,
    },
});
