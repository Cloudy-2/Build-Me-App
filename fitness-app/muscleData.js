// Comprehensive muscle group data with anatomically specific names
export const muscleGroups = {
    shoulder: {
        title: "Shoulder",
        icon: "🏋️",
        muscles: [
            { id: "trapezius_upper", name: "Upper Trapezius", image: require('./assets/muscles/trapezius_upper.png') },
            { id: "deltoid_anterior", name: "Anterior Deltoid", image: require('./assets/muscles/deltoid_anterior.png') },
            { id: "deltoid_posterior", name: "Posterior Deltoid", image: require('./assets/muscles/deltoid_posterior.png') },
            { id: "deltoid_posterior_rear", name: "Rear Deltoid", image: require('./assets/muscles/deltoid_posterior_rear.png') },
        ]
    },
    chest: {
        title: "Chest",
        icon: "💪",
        muscles: [
            { id: "pectoralis_major", name: "Pectoralis Major", image: require('./assets/muscles/pectoralis_major.png') },
            { id: "pectoralis_major_upper", name: "Upper Pectoralis Major", image: require('./assets/muscles/pectoralis_major_upper.png') },
        ]
    },
    back: {
        title: "Back",
        icon: "🦴",
        muscles: [
            { id: "latissimus_dorsi", name: "Latissimus Dorsi", image: require('./assets/muscles/latissimus_dorsi.png') },
            { id: "trapezius_upper_rear", name: "Upper Trapezius (Rear)", image: require('./assets/muscles/trapezius_upper_rear.png') },
            { id: "erector_spinae", name: "Erector Spinae", image: require('./assets/muscles/erector_spinae.png') },
        ]
    },
    core: {
        title: "Core",
        icon: "🔥",
        muscles: [
            { id: "rectus_abdominis", name: "Rectus Abdominis", image: require('./assets/muscles/rectus_abdominis.png') },
            { id: "rectus_abdominis_upper", name: "Upper Rectus Abdominis", image: require('./assets/muscles/rectus_abdominis_upper.png') },
            { id: "obliques_external", name: "External Obliques", image: require('./assets/muscles/obliques_external.png') },
            { id: "hip_flexors", name: "Hip Flexors", image: require('./assets/muscles/hip_flexors.png') },
        ]
    },
    arms: {
        title: "Arms",
        icon: "🦾",
        muscles: [
            { id: "biceps_brachii", name: "Biceps Brachii", image: require('./assets/muscles/biceps_brachii.png') },
            { id: "triceps_brachii", name: "Triceps Brachii", image: require('./assets/muscles/triceps_brachii.png') },
            { id: "triceps_long_head", name: "Triceps Long Head", image: require('./assets/muscles/triceps_long_head.png') },
            { id: "forearm_flexors", name: "Forearm Flexors", image: require('./assets/muscles/forearm_flexors.png') },
            { id: "forearm_extensors", name: "Forearm Extensors", image: require('./assets/muscles/forearm_extensors.png') },
            { id: "forearms_full", name: "Forearms (Full)", image: require('./assets/muscles/forearms_full.png') },
        ]
    },
    legs: {
        title: "Legs",
        icon: "🦵",
        muscles: [
            { id: "quadriceps", name: "Quadriceps", image: require('./assets/muscles/quadriceps.png') },
            { id: "quadriceps_upper", name: "Upper Quadriceps", image: require('./assets/muscles/quadriceps_upper.png') },
            { id: "hamstrings", name: "Hamstrings", image: require('./assets/muscles/hamstrings.png') },
            { id: "gluteus_maximus", name: "Gluteus Maximus", image: require('./assets/muscles/gluteus_maximus.png') },
            { id: "gastrocnemius", name: "Gastrocnemius (Calves)", image: require('./assets/muscles/gastrocnemius.png') },
        ]
    }
};

export const baseImage = require('./assets/muscles/base.png');
