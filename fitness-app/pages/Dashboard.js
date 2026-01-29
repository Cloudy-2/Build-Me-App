/**
 * INTERACTIVE DASHBOARD WITH SVG MUSCLE ANATOMY
 * 
 * Features:
 * - Interactive inline SVG muscle anatomy with dynamic highlighting
 * - Weekly timeline navigation (Prev/Next)
 * - Keyboard-accessible controls with ARIA labels
 * - API-ready structure for easy integration
 * - Neutral state when no logs exist
 * - Visual legend for highlighted muscles
 * 
 * [Assume: SVG paths use simplified anatomy - production would use detailed medical SVG]
 * [Assume: Week starts on Monday for ISO week calculation]
 * [Assume: Highlight color is #FF6B9D for all trained muscles]
 */

import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Ellipse, Rect, Path, Circle, G, Text as SvgText } from 'react-native-svg';
import { MUSCLE_MAP } from '../utils/muscleMapping';

const { width } = Dimensions.get('window');

// ============================================================================
// MOCK DATA - Replace with real API calls
// ============================================================================

/**
 * Mock workout logs
 * Shape: { id, isoDate, name, muscles: string[], notes }
 */
const MOCK_WORKOUT_LOGS = [
    {
        id: 1,
        isoDate: '2026-01-27T10:30:00Z',
        name: 'Upper Body Power',
        muscles: ['pectoralis_major', 'deltoid_anterior', 'triceps_brachii', 'biceps_brachii'],
        notes: 'Great pump today!'
    },
    {
        id: 2,
        isoDate: '2026-01-25T14:15:00Z',
        name: 'Leg Destruction',
        muscles: ['quadriceps', 'hamstrings', 'gluteus_maximus', 'gastrocnemius'],
        notes: 'Struggled with squats'
    },
    {
        id: 3,
        isoDate: '2026-01-23T09:00:00Z',
        name: 'Back & Core Strength',
        muscles: ['latissimus_dorsi', 'erector_spinae', 'rectus_abdominis', 'obliques_external'],
        notes: 'New PR on deadlifts!'
    },
    {
        id: 4,
        isoDate: '2026-01-20T11:00:00Z',
        name: 'Full Body Circuit',
        muscles: ['pectoralis_major', 'latissimus_dorsi', 'quadriceps', 'deltoid_anterior'],
        notes: null
    },
    {
        id: 5,
        isoDate: '2026-01-15T16:30:00Z',
        name: 'Arms & Shoulders',
        muscles: ['biceps_brachii', 'triceps_brachii', 'deltoid_lateral', 'forearm_flexors'],
        notes: 'Focused on form'
    },
];

/**
 * Mock user stats
 */
const MOCK_USER_STATS = {
    weight: 75.5,
    unit: 'kg',
    bodyFat: 15.2,
    lastUpdated: '2026-01-27'
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get ISO week number from date
 */
function getISOWeek(date) {
    const target = new Date(date.valueOf());
    const dayNumber = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNumber + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
}

/**
 * Get week start date (Monday) from ISO week number and year
 */
function getWeekStartDate(year, week) {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

/**
 * Format date range for week display
 */
function formatWeekRange(startDate) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const startMonth = monthNames[startDate.getMonth()];
    const endMonth = monthNames[endDate.getMonth()];

    if (startMonth === endMonth) {
        return `${startMonth} ${startDate.getDate()}-${endDate.getDate()}`;
    }
    return `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}`;
}

// ============================================================================
// INLINE SVG MUSCLE ANATOMY COMPONENT
// ============================================================================

/**
 * Simplified muscle anatomy SVG with labeled paths
 * [Assume: Production version would use detailed medical-grade SVG]
 */
function MuscleAnatomy({ highlightedMuscles, onMuscleClick }) {
    const isHighlighted = (muscleKey) => {
        const svgId = MUSCLE_MAP[muscleKey];
        return highlightedMuscles.includes(svgId);
    };

    const getHighlightColor = (muscleKey) => {
        return isHighlighted(muscleKey) ? '#FF6B9D' : '#808080';
    };

    const getOpacity = (muscleKey) => {
        return isHighlighted(muscleKey) ? 0.9 : 0.3;
    };

    return (
        <Svg
            width="100%"
            height="400"
            viewBox="0 0 300 400"
            aria-label="Interactive muscle anatomy diagram showing trained muscles"
        >
            {/* FRONT VIEW */}
            <G id="front-view">
                {/* Head */}
                <Ellipse cx="150" cy="30" rx="20" ry="25" fill="#E0E0E0" />

                {/* Neck */}
                <Rect x="140" y="50" width="20" height="20" fill="#D0D0D0" />

                {/* Shoulders - Deltoids */}
                <Ellipse
                    id={MUSCLE_MAP['deltoid_anterior']}
                    cx="110" cy="85" rx="20" ry="25"
                    fill={getHighlightColor('deltoid_anterior')}
                    opacity={getOpacity('deltoid_anterior')}
                />
                <Ellipse
                    id={MUSCLE_MAP['deltoid_anterior'] + '-right'}
                    cx="190" cy="85" rx="20" ry="25"
                    fill={getHighlightColor('deltoid_anterior')}
                    opacity={getOpacity('deltoid_anterior')}
                />

                {/* Chest - Pectorals */}
                <Ellipse
                    id={MUSCLE_MAP['pectoralis_major']}
                    cx="130" cy="100" rx="25" ry="30"
                    fill={getHighlightColor('pectoralis_major')}
                    opacity={getOpacity('pectoralis_major')}
                />
                <Ellipse
                    id={MUSCLE_MAP['pectoralis_major'] + '-right'}
                    cx="170" cy="100" rx="25" ry="30"
                    fill={getHighlightColor('pectoralis_major')}
                    opacity={getOpacity('pectoralis_major')}
                />

                {/* Arms - Biceps */}
                <Ellipse
                    id={MUSCLE_MAP['biceps_brachii']}
                    cx="95" cy="130" rx="12" ry="25"
                    fill={getHighlightColor('biceps_brachii')}
                    opacity={getOpacity('biceps_brachii')}
                />
                <Ellipse
                    id={MUSCLE_MAP['biceps_brachii'] + '-right'}
                    cx="205" cy="130" rx="12" ry="25"
                    fill={getHighlightColor('biceps_brachii')}
                    opacity={getOpacity('biceps_brachii')}
                />

                {/* Core - Abs */}
                <Rect
                    id={MUSCLE_MAP['rectus_abdominis']}
                    x="135" y="135" width="30" height="50"
                    rx="5"
                    fill={getHighlightColor('rectus_abdominis')}
                    opacity={getOpacity('rectus_abdominis')}
                />

                {/* Core - Obliques */}
                <Path
                    id={MUSCLE_MAP['obliques_external']}
                    d="M 120 140 Q 115 160 118 180 L 135 180 L 135 140 Z"
                    fill={getHighlightColor('obliques_external')}
                    opacity={getOpacity('obliques_external')}
                />
                <Path
                    id={MUSCLE_MAP['obliques_external'] + '-right'}
                    d="M 180 140 Q 185 160 182 180 L 165 180 L 165 140 Z"
                    fill={getHighlightColor('obliques_external')}
                    opacity={getOpacity('obliques_external')}
                />

                {/* Forearms */}
                <Rect
                    id={MUSCLE_MAP['forearm_flexors']}
                    x="88" y="160" width="10" height="35"
                    fill={getHighlightColor('forearm_flexors')}
                    opacity={getOpacity('forearm_flexors')}
                />
                <Rect
                    id={MUSCLE_MAP['forearm_flexors'] + '-right'}
                    x="202" y="160" width="10" height="35"
                    fill={getHighlightColor('forearm_flexors')}
                    opacity={getOpacity('forearm_flexors')}
                />

                {/* Legs - Quadriceps */}
                <Ellipse
                    id={MUSCLE_MAP['quadriceps']}
                    cx="130" cy="260" rx="18" ry="60"
                    fill={getHighlightColor('quadriceps')}
                    opacity={getOpacity('quadriceps')}
                />
                <Ellipse
                    id={MUSCLE_MAP['quadriceps'] + '-right'}
                    cx="170" cy="260" rx="18" ry="60"
                    fill={getHighlightColor('quadriceps')}
                    opacity={getOpacity('quadriceps')}
                />

                {/* Legs - Calves */}
                <Ellipse
                    id={MUSCLE_MAP['gastrocnemius']}
                    cx="130" cy="350" rx="12" ry="30"
                    fill={getHighlightColor('gastrocnemius')}
                    opacity={getOpacity('gastrocnemius')}
                />
                <Ellipse
                    id={MUSCLE_MAP['gastrocnemius'] + '-right'}
                    cx="170" cy="350" rx="12" ry="30"
                    fill={getHighlightColor('gastrocnemius')}
                    opacity={getOpacity('gastrocnemius')}
                />
            </G>

            {/* BACK VIEW HINT - simplified */}
            <G id="back-indicators" opacity="0.5">
                <SvgText x="260" y="90" fontSize="10" fill="#666">Back:</SvgText>
                <Circle
                    cx="275" cy="105" r="8"
                    fill={getHighlightColor('latissimus_dorsi')}
                    opacity={getOpacity('latissimus_dorsi')}
                />
                <SvgText x="260" y="120" fontSize="8" fill="#999">Lats</SvgText>

                <Circle
                    cx="275" cy="135" r="8"
                    fill={getHighlightColor('erector_spinae')}
                    opacity={getOpacity('erector_spinae')}
                />
                <SvgText x="255" y="150" fontSize="8" fill="#999">Erectors</SvgText>

                <Circle
                    cx="275" cy="165" r="8"
                    fill={getHighlightColor('hamstrings')}
                    opacity={getOpacity('hamstrings')}
                />
                <SvgText x="255" y="180" fontSize="8" fill="#999">Hamstr.</SvgText>

                <Circle
                    cx="275" cy="195" r="8"
                    fill={getHighlightColor('gluteus_maximus')}
                    opacity={getOpacity('gluteus_maximus')}
                />
                <SvgText x="260" y="210" fontSize="8" fill="#999">Glutes</SvgText>
            </G>
        </Svg>
    );
}

// ============================================================================
// LEGEND COMPONENT
// ============================================================================

function MuscleGroupLegend({ highlightedCount }) {
    if (highlightedCount === 0) {
        return (
            <View style={styles.legend}>
                <Text style={styles.legendText}>No muscles trained this week</Text>
            </View>
        );
    }

    return (
        <View style={styles.legend}>
            <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#FF6B9D' }]} />
                <Text style={styles.legendLabel}>Trained ({highlightedCount})</Text>
            </View>
            <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#808080' }]} />
                <Text style={styles.legendLabel}>Not trained</Text>
            </View>
        </View>
    );
}

// ============================================================================
// MAIN DASHBOARD COMPONENT
// ============================================================================

export default function Dashboard() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentWeek = getISOWeek(currentDate);

    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedWeek, setSelectedWeek] = useState(currentWeek);
    const [workoutLogs, setWorkoutLogs] = useState(MOCK_WORKOUT_LOGS);
    const [userStats] = useState(MOCK_USER_STATS);

    // Calculate week date range
    const weekStartDate = useMemo(() => {
        return getWeekStartDate(selectedYear, selectedWeek);
    }, [selectedYear, selectedWeek]);

    const weekEndDate = useMemo(() => {
        const end = new Date(weekStartDate);
        end.setDate(end.getDate() + 6);
        return end;
    }, [weekStartDate]);

    // Filter logs for current week and extract highlighted muscles
    const { logsThisWeek, highlightedMuscles } = useMemo(() => {
        const logs = workoutLogs.filter(log => {
            const logDate = new Date(log.isoDate);
            return logDate >= weekStartDate && logDate <= weekEndDate;
        });

        // Extract all unique muscles trained this week
        const muscles = logs.reduce((acc, log) => {
            log.muscles.forEach(muscle => {
                const svgId = MUSCLE_MAP[muscle];
                if (svgId && !acc.includes(svgId)) {
                    acc.push(svgId);
                }
            });
            return acc;
        }, []);

        return { logsThisWeek: logs, highlightedMuscles: muscles };
    }, [workoutLogs, weekStartDate, weekEndDate]);

    // Navigation handlers
    const handlePrevWeek = () => {
        if (selectedWeek > 1) {
            setSelectedWeek(selectedWeek - 1);
        } else {
            setSelectedYear(selectedYear - 1);
            setSelectedWeek(52);
        }
    };

    const handleNextWeek = () => {
        if (selectedWeek < 52) {
            setSelectedWeek(selectedWeek + 1);
        } else {
            setSelectedYear(selectedYear + 1);
            setSelectedWeek(1);
        }
    };

    const isCurrentWeek = selectedYear === currentYear && selectedWeek === currentWeek;

    // Format log date for display
    const formatLogDate = (isoDate) => {
        const date = new Date(isoDate);
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const day = days[date.getDay()];
        return `${day}, ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                {/* Weekly Timeline Navigation */}
                <View style={styles.weekNavigation}>
                    <TouchableOpacity
                        style={styles.navButton}
                        onPress={handlePrevWeek}
                        accessibilityLabel="Previous week"
                        accessibilityRole="button"
                    >
                        <Text style={styles.navButtonText}>← Prev</Text>
                    </TouchableOpacity>

                    <View style={styles.weekDisplay}>
                        <Text style={styles.weekLabel}>Week {selectedWeek}, {selectedYear}</Text>
                        <Text style={styles.weekRange}>{formatWeekRange(weekStartDate)}</Text>
                        {isCurrentWeek && <Text style={styles.currentWeekBadge}>Current</Text>}
                    </View>

                    <TouchableOpacity
                        style={[styles.navButton, isCurrentWeek && styles.navButtonDisabled]}
                        onPress={handleNextWeek}
                        disabled={isCurrentWeek}
                        accessibilityLabel="Next week"
                        accessibilityRole="button"
                    >
                        <Text style={[styles.navButtonText, isCurrentWeek && styles.navButtonTextDisabled]}>
                            Next →
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Muscle Visualization Panel */}
                <View style={styles.musclePanel}>
                    <MuscleAnatomy
                        highlightedMuscles={highlightedMuscles}
                        onMuscleClick={(muscleKey) => console.log('Clicked:', muscleKey)}
                    />
                    <MuscleGroupLegend highlightedCount={highlightedMuscles.length} />
                </View>

                {/* Body Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Weight</Text>
                        <Text style={styles.statValue}>{userStats.weight} {userStats.unit}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Body Fat</Text>
                        <Text style={styles.statValue}>{userStats.bodyFat}%</Text>
                    </View>
                </View>

                {/* Recent Logs Section */}
                <View style={styles.logsContainer}>
                    <Text style={styles.logsTitle}>
                        Workouts This Week ({logsThisWeek.length})
                    </Text>

                    {logsThisWeek.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateIcon}>📋</Text>
                            <Text style={styles.emptyStateText}>No workouts logged this week</Text>
                            <Text style={styles.emptyStateSubtext}>
                                Start training to see your progress!
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.logsList}>
                            {logsThisWeek.map((log) => (
                                <View key={log.id} style={styles.logCard}>
                                    <View style={styles.logHeader}>
                                        <Text style={styles.logName}>{log.name}</Text>
                                        <Text style={styles.logDate}>{formatLogDate(log.isoDate)}</Text>
                                    </View>
                                    <View style={styles.logMuscles}>
                                        {log.muscles.slice(0, 4).map((muscle, idx) => (
                                            <View key={idx} style={styles.muscleTag}>
                                                <Text style={styles.muscleTagText}>
                                                    {muscle.replace(/_/g, ' ')}
                                                </Text>
                                            </View>
                                        ))}
                                        {log.muscles.length > 4 && (
                                            <Text style={styles.moreTag}>+{log.muscles.length - 4} more</Text>
                                        )}
                                    </View>
                                    {log.notes && (
                                        <Text style={styles.logNotes}>{log.notes}</Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.bottomSpacer} />
            </ScrollView>
        </View>
    );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    weekNavigation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2a2a2a',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderBottomWidth: 2,
        borderBottomColor: '#ff6b9d',
    },
    navButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#3a3a3a',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4a4a4a',
        minWidth: 80,
    },
    navButtonDisabled: {
        opacity: 0.4,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    navButtonTextDisabled: {
        color: '#666',
    },
    weekDisplay: {
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 12,
    },
    weekLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    weekRange: {
        color: '#aaa',
        fontSize: 13,
        fontWeight: '500',
    },
    currentWeekBadge: {
        backgroundColor: '#ff6b9d',
        color: '#fff',
        fontSize: 10,
        fontWeight: '700',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginTop: 4,
    },
    musclePanel: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 20,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        gap: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    legendLabel: {
        fontSize: 12,
        color: '#333',
        fontWeight: '600',
    },
    legendText: {
        fontSize: 13,
        color: '#666',
        fontWeight: '500',
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 16,
        gap: 12,
    },
    statBox: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#3a3a3a',
        alignItems: 'center',
    },
    statLabel: {
        color: '#aaa',
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 6,
    },
    statValue: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    },
    logsContainer: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    logsTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    emptyState: {
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        paddingVertical: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#3a3a3a',
        borderStyle: 'dashed',
    },
    emptyStateIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    emptyStateText: {
        color: '#999',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
    emptyStateSubtext: {
        color: '#666',
        fontSize: 13,
    },
    logsList: {
        gap: 12,
    },
    logCard: {
        backgroundColor: '#2a2a2a',
        borderRadius: 10,
        padding: 16,
        borderWidth: 2,
        borderColor: '#3a3a3a',
    },
    logHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    logName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        flex: 1,
    },
    logDate: {
        color: '#aaa',
        fontSize: 12,
        fontWeight: '500',
    },
    logMuscles: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 8,
    },
    muscleTag: {
        backgroundColor: '#ff6b9d',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    muscleTagText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    moreTag: {
        color: '#aaa',
        fontSize: 11,
        fontWeight: '500',
        alignSelf: 'center',
    },
    logNotes: {
        color: '#999',
        fontSize: 13,
        fontStyle: 'italic',
        marginTop: 4,
    },
    bottomSpacer: {
        height: 20,
    },
});
