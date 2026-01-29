// Exercise database mapped to specific muscles
export const exerciseDatabase = {
    // Shoulder muscles
    trapezius_upper: [
        { name: "Barbell Shrugs", sets: "3-4", reps: "12-15", difficulty: "Beginner" },
        { name: "Dumbbell Shrugs", sets: "3-4", reps: "12-15", difficulty: "Beginner" },
        { name: "Face Pulls", sets: "3", reps: "15-20", difficulty: "Intermediate" },
        { name: "Upright Rows", sets: "3", reps: "10-12", difficulty: "Intermediate" },
    ],
    deltoid_anterior: [
        { name: "Overhead Press", sets: "4", reps: "8-10", difficulty: "Intermediate" },
        { name: "Front Raises", sets: "3", reps: "12-15", difficulty: "Beginner" },
        { name: "Arnold Press", sets: "3", reps: "10-12", difficulty: "Advanced" },
        { name: "Pike Push-ups", sets: "3", reps: "10-15", difficulty: "Beginner" },
    ],
    deltoid_posterior: [
        { name: "Reverse Flyes", sets: "3", reps: "12-15", difficulty: "Beginner" },
        { name: "Face Pulls", sets: "3", reps: "15-20", difficulty: "Intermediate" },
        { name: "Bent-Over Lateral Raises", sets: "3", reps: "12-15", difficulty: "Intermediate" },
        { name: "Cable Reverse Flyes", sets: "3", reps: "12-15", difficulty: "Intermediate" },
    ],
    deltoid_posterior_rear: [
        { name: "Rear Delt Flyes", sets: "3", reps: "12-15", difficulty: "Beginner" },
        { name: "Reverse Pec Deck", sets: "3", reps: "12-15", difficulty: "Beginner" },
        { name: "Band Pull-Aparts", sets: "3", reps: "15-20", difficulty: "Beginner" },
    ],

    // Chest muscles
    pectoralis_major: [
        { name: "Bench Press", sets: "4", reps: "8-10", difficulty: "Intermediate" },
        { name: "Push-ups", sets: "3", reps: "15-20", difficulty: "Beginner" },
        { name: "Dumbbell Flyes", sets: "3", reps: "10-12", difficulty: "Intermediate" },
        { name: "Cable Crossovers", sets: "3", reps: "12-15", difficulty: "Intermediate" },
        { name: "Dips", sets: "3", reps: "8-12", difficulty: "Advanced" },
    ],
    pectoralis_major_upper: [
        { name: "Incline Bench Press", sets: "4", reps: "8-10", difficulty: "Intermediate" },
        { name: "Incline Dumbbell Press", sets: "3", reps: "10-12", difficulty: "Intermediate" },
        { name: "Incline Flyes", sets: "3", reps: "12-15", difficulty: "Intermediate" },
        { name: "Low-to-High Cable Flyes", sets: "3", reps: "12-15", difficulty: "Intermediate" },
    ],

    // Back muscles
    latissimus_dorsi: [
        { name: "Pull-ups", sets: "3-4", reps: "8-12", difficulty: "Advanced" },
        { name: "Lat Pulldowns", sets: "3", reps: "10-12", difficulty: "Beginner" },
        { name: "Barbell Rows", sets: "4", reps: "8-10", difficulty: "Intermediate" },
        { name: "Dumbbell Rows", sets: "3", reps: "10-12", difficulty: "Intermediate" },
        { name: "Straight-Arm Pulldowns", sets: "3", reps: "12-15", difficulty: "Intermediate" },
    ],
    trapezius_upper_rear: [
        { name: "Barbell Shrugs", sets: "3-4", reps: "12-15", difficulty: "Beginner" },
        { name: "Farmer's Walk", sets: "3", reps: "30-60s", difficulty: "Intermediate" },
        { name: "Rack Pulls", sets: "3", reps: "6-8", difficulty: "Advanced" },
    ],
    erector_spinae: [
        { name: "Deadlifts", sets: "3-4", reps: "6-8", difficulty: "Advanced" },
        { name: "Hyperextensions", sets: "3", reps: "12-15", difficulty: "Beginner" },
        { name: "Good Mornings", sets: "3", reps: "10-12", difficulty: "Intermediate" },
        { name: "Superman Holds", sets: "3", reps: "30-45s", difficulty: "Beginner" },
    ],

    // Core muscles
    rectus_abdominis: [
        { name: "Crunches", sets: "3", reps: "15-20", difficulty: "Beginner" },
        { name: "Hanging Leg Raises", sets: "3", reps: "10-15", difficulty: "Advanced" },
        { name: "Cable Crunches", sets: "3", reps: "15-20", difficulty: "Intermediate" },
        { name: "Ab Wheel Rollouts", sets: "3", reps: "10-15", difficulty: "Advanced" },
    ],
    rectus_abdominis_upper: [
        { name: "Sit-ups", sets: "3", reps: "15-20", difficulty: "Beginner" },
        { name: "Weighted Crunches", sets: "3", reps: "12-15", difficulty: "Intermediate" },
        { name: "Cable Crunches", sets: "3", reps: "15-20", difficulty: "Intermediate" },
    ],
    obliques_external: [
        { name: "Russian Twists", sets: "3", reps: "20-30", difficulty: "Beginner" },
        { name: "Side Planks", sets: "3", reps: "30-60s", difficulty: "Intermediate" },
        { name: "Bicycle Crunches", sets: "3", reps: "20-30", difficulty: "Beginner" },
        { name: "Woodchoppers", sets: "3", reps: "12-15", difficulty: "Intermediate" },
    ],
    hip_flexors: [
        { name: "Hanging Knee Raises", sets: "3", reps: "12-15", difficulty: "Intermediate" },
        { name: "Lying Leg Raises", sets: "3", reps: "12-15", difficulty: "Beginner" },
        { name: "Mountain Climbers", sets: "3", reps: "20-30", difficulty: "Beginner" },
    ],

    // Arms muscles
    biceps_brachii: [
        { name: "Barbell Curls", sets: "3", reps: "10-12", difficulty: "Beginner" },
        { name: "Dumbbell Curls", sets: "3", reps: "10-12", difficulty: "Beginner" },
        { name: "Hammer Curls", sets: "3", reps: "10-12", difficulty: "Beginner" },
        { name: "Preacher Curls", sets: "3", reps: "10-12", difficulty: "Intermediate" },
        { name: "Cable Curls", sets: "3", reps: "12-15", difficulty: "Intermediate" },
    ],
    triceps_brachii: [
        { name: "Tricep Dips", sets: "3", reps: "10-15", difficulty: "Intermediate" },
        { name: "Tricep Pushdowns", sets: "3", reps: "12-15", difficulty: "Beginner" },
        { name: "Overhead Tricep Extension", sets: "3", reps: "10-12", difficulty: "Intermediate" },
        { name: "Close-Grip Bench Press", sets: "3", reps: "8-10", difficulty: "Intermediate" },
    ],
    triceps_long_head: [
        { name: "Overhead Tricep Extension", sets: "3", reps: "10-12", difficulty: "Intermediate" },
        { name: "Skull Crushers", sets: "3", reps: "10-12", difficulty: "Intermediate" },
        { name: "Cable Overhead Extension", sets: "3", reps: "12-15", difficulty: "Intermediate" },
    ],
    forearm_flexors: [
        { name: "Wrist Curls", sets: "3", reps: "15-20", difficulty: "Beginner" },
        { name: "Reverse Wrist Curls", sets: "3", reps: "15-20", difficulty: "Beginner" },
        { name: "Farmer's Walk", sets: "3", reps: "30-60s", difficulty: "Intermediate" },
    ],
    forearm_extensors: [
        { name: "Reverse Curls", sets: "3", reps: "12-15", difficulty: "Intermediate" },
        { name: "Wrist Extensions", sets: "3", reps: "15-20", difficulty: "Beginner" },
    ],
    forearms_full: [
        { name: "Dead Hangs", sets: "3", reps: "30-60s", difficulty: "Beginner" },
        { name: "Plate Pinches", sets: "3", reps: "30-45s", difficulty: "Intermediate" },
        { name: "Forearm Roller", sets: "3", reps: "5-10", difficulty: "Intermediate" },
    ],

    // Leg muscles
    quadriceps: [
        { name: "Squats", sets: "4", reps: "8-12", difficulty: "Intermediate" },
        { name: "Leg Press", sets: "3", reps: "10-12", difficulty: "Beginner" },
        { name: "Lunges", sets: "3", reps: "10-12", difficulty: "Beginner" },
        { name: "Leg Extensions", sets: "3", reps: "12-15", difficulty: "Beginner" },
        { name: "Bulgarian Split Squats", sets: "3", reps: "10-12", difficulty: "Advanced" },
    ],
    quadriceps_upper: [
        { name: "Front Squats", sets: "3", reps: "8-10", difficulty: "Advanced" },
        { name: "Goblet Squats", sets: "3", reps: "12-15", difficulty: "Beginner" },
        { name: "Leg Extensions", sets: "3", reps: "12-15", difficulty: "Beginner" },
    ],
    hamstrings: [
        { name: "Romanian Deadlifts", sets: "3", reps: "10-12", difficulty: "Intermediate" },
        { name: "Leg Curls", sets: "3", reps: "12-15", difficulty: "Beginner" },
        { name: "Nordic Curls", sets: "3", reps: "6-10", difficulty: "Advanced" },
        { name: "Good Mornings", sets: "3", reps: "10-12", difficulty: "Intermediate" },
    ],
    gluteus_maximus: [
        { name: "Hip Thrusts", sets: "3-4", reps: "10-12", difficulty: "Intermediate" },
        { name: "Glute Bridges", sets: "3", reps: "12-15", difficulty: "Beginner" },
        { name: "Bulgarian Split Squats", sets: "3", reps: "10-12", difficulty: "Advanced" },
        { name: "Cable Pull-Throughs", sets: "3", reps: "12-15", difficulty: "Intermediate" },
    ],
    gastrocnemius: [
        { name: "Standing Calf Raises", sets: "4", reps: "15-20", difficulty: "Beginner" },
        { name: "Seated Calf Raises", sets: "3", reps: "15-20", difficulty: "Beginner" },
        { name: "Jump Rope", sets: "3", reps: "1-2 min", difficulty: "Intermediate" },
        { name: "Box Jumps", sets: "3", reps: "10-15", difficulty: "Advanced" },
    ],
};

// Get exercises for a specific muscle
export function getExercisesForMuscle(muscleId) {
    return exerciseDatabase[muscleId] || [];
}
