/**
 * MUSCLE MAPPING TABLE
 * Maps backend muscle keys to SVG path IDs for highlighting
 * 
 * Usage:
 * - Backend returns muscles as string array: ["pectoralis_major", "biceps_brachii"]
 * - Dashboard uses MUSCLE_MAP to find corresponding SVG path IDs
 * - SVG paths are highlighted by adding CSS class or fill attribute
 */

export const MUSCLE_MAP = {
    // CHEST
    'pectoralis_major': 'chest-pec-major',
    'pectoralis_minor': 'chest-pec-minor',
    'pectoralis_major_upper': 'chest-pec-upper',

    // SHOULDERS
    'deltoid_anterior': 'shoulder-delt-anterior',
    'deltoid_lateral': 'shoulder-delt-lateral',
    'deltoid_posterior': 'shoulder-delt-posterior',
    'deltoid_posterior_rear': 'shoulder-delt-rear',
    'trapezius_upper': 'shoulder-trap-upper',
    'trapezius_middle': 'shoulder-trap-middle',
    'trapezius_lower': 'shoulder-trap-lower',
    'trapezius_upper_rear': 'back-trap-upper-rear',

    // ARMS
    'biceps_brachii': 'arm-biceps',
    'triceps_brachii': 'arm-triceps',
    'triceps_long_head': 'arm-triceps-long',
    'brachialis': 'arm-brachialis',
    'forearm_flexors': 'arm-forearm-flexors',
    'forearm_extensors': 'arm-forearm-extensors',
    'forearms_full': 'arm-forearms',

    // BACK
    'latissimus_dorsi': 'back-lats',
    'rhomboids': 'back-rhomboids',
    'erector_spinae': 'back-erector-spinae',
    'teres_major': 'back-teres-major',
    'teres_minor': 'back-teres-minor',

    // CORE
    'rectus_abdominis': 'core-abs',
    'rectus_abdominis_upper': 'core-abs-upper',
    'obliques_external': 'core-obliques',
    'obliques_internal': 'core-obliques-internal',
    'transverse_abdominis': 'core-transverse',
    'serratus_anterior': 'core-serratus',
    'hip_flexors': 'core-hip-flexors',

    // LEGS
    'quadriceps': 'leg-quads',
    'quadriceps_upper': 'leg-quads-upper',
    'rectus_femoris': 'leg-rectus-femoris',
    'vastus_lateralis': 'leg-vastus-lateralis',
    'vastus_medialis': 'leg-vastus-medialis',
    'hamstrings': 'leg-hamstrings',
    'biceps_femoris': 'leg-biceps-femoris',
    'semitendinosus': 'leg-semitendinosus',
    'semimembranosus': 'leg-semimembranosus',
    'gluteus_maximus': 'leg-glutes',
    'gluteus_medius': 'leg-glutes-medius',
    'gastrocnemius': 'leg-calves',
    'soleus': 'leg-soleus',
    'tibialis_anterior': 'leg-tibialis',
    'adductors': 'leg-adductors',
};

/**
 * Reverse mapping for easy lookups
 * SVG ID → Backend Key
 */
export const SVG_TO_MUSCLE_MAP = Object.entries(MUSCLE_MAP).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {});

/**
 * Muscle group categories for legend
 */
export const MUSCLE_GROUPS = {
    chest: { label: 'Chest', color: '#FF6B9D' },
    shoulders: { label: 'Shoulders', color: '#FF8C42' },
    arms: { label: 'Arms', color: '#FFD93D' },
    back: { label: 'Back', color: '#6BCF7F' },
    core: { label: 'Core', color: '#4D9DE0' },
    legs: { label: 'Legs', color: '#9D4EDD' },
};
