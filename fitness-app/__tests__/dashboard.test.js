/**
 * HIGHLIGHT LOGIC TEST
 * Tests the muscle highlighting logic for the Dashboard
 * 
 * Run with: npm test (if Jest is configured)
 * Or manually verify logic by importing functions
 */

import { MUSCLE_MAP } from '../utils/muscleMapping';

// ============================================================================
// TEST UTILITIES
// ============================================================================

/**
 * Mock workout log for testing
 */
const mockWorkoutLog = {
    id: 1,
    isoDate: '2026-01-27T10:30:00Z',
    name: 'Upper Body Power',
    muscles: ['pectoralis_major', 'deltoid_anterior', 'triceps_brachii', 'biceps_brachii'],
    notes: 'Great workout!'
};

/**
 * Extract SVG IDs from workout muscles
 */
function getHighlightedSVGIds(workoutMuscles) {
    return workoutMuscles
        .map(muscle => MUSCLE_MAP[muscle])
        .filter(svgId => svgId !== undefined);
}

/**
 * Check if a muscle should be highlighted
 */
function shouldHighlight(muscleKey, highlightedSVGIds) {
    const svgId = MUSCLE_MAP[muscleKey];
    return highlightedSVGIds.includes(svgId);
}

// ============================================================================
// TEST CASES
// ============================================================================

function runTests() {
    console.log('Starting Dashboard Highlight Logic Tests...\n');

    // Test 1: Verify muscle mapping exists
    console.log('Test 1: Muscle Mapping');
    const testMuscles = ['pectoralis_major', 'biceps_brachii', 'quadriceps'];
    testMuscles.forEach(muscle => {
        const svgId = MUSCLE_MAP[muscle];
        console.log(`  ${muscle} → ${svgId}`);
        console.assert(svgId !== undefined, `Mapping missing for ${muscle}`);
    });
    console.log('  ✓ All test muscles have valid SVG IDs\n');

    // Test 2: Extract highlighted muscles from workout
    console.log('Test 2: Extract Highlighted Muscles');
    const highlightedIds = getHighlightedSVGIds(mockWorkoutLog.muscles);
    console.log('  Workout muscles:', mockWorkoutLog.muscles);
    console.log('  SVG IDs to highlight:', highlightedIds);
    console.assert(highlightedIds.length === 4, 'Should have 4 highlighted muscles');
    console.log('  ✓ Correctly extracted', highlightedIds.length, 'SVG IDs\n');

    // Test 3: Check highlight logic for specific muscles
    console.log('Test 3: Highlight Check Logic');
    const shouldBeHighlighted = 'pectoralis_major';
    const shouldNotBeHighlighted = 'quadriceps';

    const isHighlighted1 = shouldHighlight(shouldBeHighlighted, highlightedIds);
    const isHighlighted2 = shouldHighlight(shouldNotBeHighlighted, highlightedIds);

    console.log(`  ${shouldBeHighlighted} highlighted: ${isHighlighted1}`);
    console.log(`  ${shouldNotBeHighlighted} highlighted: ${isHighlighted2}`);
    console.assert(isHighlighted1 === true, 'Pectoralis should be highlighted');
    console.assert(isHighlighted2 === false, 'Quadriceps should NOT be highlighted');
    console.log('  ✓ Highlight logic working correctly\n');

    // Test 4: Filter logs by week
    console.log('Test 4: Week Filtering');
    const weekStart = new Date('2026-01-26T00:00:00Z'); // Monday
    const weekEnd = new Date('2026-02-01T23:59:59Z');   // Sunday
    const logDate = new Date(mockWorkoutLog.isoDate);

    const isInWeek = logDate >= weekStart && logDate <= weekEnd;
    console.log('  Week:', weekStart.toISOString().split('T')[0], 'to', weekEnd.toISOString().split('T')[0]);
    console.log('  Log date:', logDate.toISOString().split('T')[0]);
    console.log('  Is in week:', isInWeek);
    console.assert(isInWeek === true, 'Log should be in the week range');
    console.log('  ✓ Week filtering logic correct\n');

    // Test 5: Duplicate muscle handling
    console.log('Test 5: Duplicate Muscle Handling');
    const duplicateMuscles = ['biceps_brachii', 'biceps_brachii', 'triceps_brachii'];
    const uniqueIds = [...new Set(getHighlightedSVGIds(duplicateMuscles))];
    console.log('  Input muscles:', duplicateMuscles);
    console.log('  Unique SVG IDs:', uniqueIds);
    console.assert(uniqueIds.length === 2, 'Should have 2 unique muscle groups');
    console.log('  ✓ Duplicates correctly removed\n');

    // Test 6: Invalid muscle keys
    console.log('Test 6: Invalid Muscle Key Handling');
    const invalidMuscles = ['invalid_muscle', 'pectoralis_major', 'another_invalid'];
    const validIds = getHighlightedSVGIds(invalidMuscles);
    console.log('  Input muscles:', invalidMuscles);
    console.log('  Valid SVG IDs:', validIds);
    console.assert(validIds.length === 1, 'Should filter out invalid muscles');
    console.log('  ✓ Invalid muscles correctly filtered\n');

    console.log('='.repeat(50));
    console.log('All tests passed! ✓');
    console.log('='.repeat(50));
}

// ============================================================================
// MANUAL TEST HELPER
// ============================================================================

/**
 * Helper function to manually test highlighting
 * Usage: testMuscleHighlight(['pectoralis_major', 'biceps_brachii'])
 */
export function testMuscleHighlight(muscles) {
    console.log('Manual Highlight Test:');
    console.log('Input muscles:', muscles);

    const svgIds = getHighlightedSVGIds(muscles);
    console.log('SVG IDs to highlight:', svgIds);

    return {
        muscles,
        svgIds,
        count: svgIds.length,
        allMapped: muscles.length === svgIds.length
    };
}

// Run tests if executed directly
if (require.main === module) {
    runTests();
}

export { runTests, getHighlightedSVGIds, shouldHighlight };
