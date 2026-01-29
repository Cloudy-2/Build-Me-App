// Detailed exercise information with execution instructions and form tips
export const exerciseDetails = {
    "Bench Press": {
        description: "A compound upper body exercise that primarily targets the chest, with secondary emphasis on triceps and shoulders.",
        execution: [
            "Lie flat on the bench with feet firmly on the ground",
            "Grip the barbell slightly wider than shoulder-width",
            "Unrack the bar and hold it above your chest with arms extended",
            "Lower the bar slowly to mid-chest while keeping elbows at 45-degree angle",
            "Press the bar back up explosively to starting position",
            "Keep your shoulder blades retracted throughout the movement"
        ],
        formTips: [
            "Keep your back slightly arched with shoulder blades squeezed",
            "Don't bounce the bar off your chest",
            "Maintain control during the entire movement",
            "Breathe in as you lower, breathe out as you press"
        ],
        targetMuscles: "Pectoralis Major, Anterior Deltoid, Triceps",
        equipment: "Barbell, Bench"
    },
    "Push-ups": {
        description: "A bodyweight exercise that builds upper body strength and engages core muscles.",
        execution: [
            "Start in a high plank position with hands slightly wider than shoulders",
            "Keep your body in a straight line from head to heels",
            "Lower your chest to the ground by bending elbows",
            "Keep elbows at 45-degree angle from body",
            "Press back up to starting position",
            "Engage your core throughout the movement"
        ],
        formTips: [
            "Don't let your hips sag or pike up",
            "Focus on full range of motion",
            "Keep your neck neutral - don't let head drop",
            "Hands should be directly under shoulders"
        ],
        targetMuscles: "Pectoralis Major, Triceps, Anterior Deltoid, Core",
        equipment: "Bodyweight"
    },
    "Squats": {
        description: "The king of leg exercises - a compound movement that builds overall lower body strength and mass.",
        execution: [
            "Stand with feet shoulder-width apart, toes slightly pointed out",
            "Place barbell across upper back (high bar) or rear deltoids (low bar)",
            "Brace your core and initiate movement by breaking at hips and knees",
            "Lower until thighs are at least parallel to ground",
            "Drive through heels to stand back up",
            "Keep chest up and maintain neutral spine throughout"
        ],
        formTips: [
            "Keep knees tracking over toes - don't let them cave in",
            "Maintain three points of contact with feet on ground",
            "Don't round your lower back",
            "Look straight ahead or slightly up"
        ],
        targetMuscles: "Quadriceps, Glutes, Hamstrings, Core",
        equipment: "Barbell, Squat Rack"
    },
    "Pull-ups": {
        description: "An excellent compound pulling exercise that builds back width and arm strength.",
        execution: [
            "Grab the pull-up bar with an overhand grip, hands shoulder-width apart",
            "Hang with arms fully extended and shoulders engaged",
            "Pull yourself up by driving elbows down and back",
            "Continue until chin is above the bar",
            "Lower yourself with control to full arm extension",
            "Avoid swinging or using momentum"
        ],
        formTips: [
            "Engage lats by depressing shoulder blades before pulling",
            "Keep core tight to prevent swinging",
            "Full range of motion is key - arms fully extended at bottom",
            "Think about pulling elbows to your sides, not hands to bar"
        ],
        targetMuscles: "Latissimus Dorsi, Biceps, Rhomboids, Trapezius",
        equipment: "Pull-up Bar"
    },
    "Deadlifts": {
        description: "A fundamental compound lift that builds total body strength, especially the posterior chain.",
        execution: [
            "Stand with feet hip-width apart, bar over mid-foot",
            "Bend down and grip bar just outside legs with mixed or double overhand grip",
            "Lower hips, chest up, shoulders over or slightly in front of bar",
            "Brace core and drive through heels to extend hips and knees",
            "Pull bar close to body in a straight line",
            "Stand fully upright, then lower with control"
        ],
        formTips: [
            "Keep the bar close to your body throughout",
            "Maintain neutral spine - don't round your back",
            "Lead with your chest, not your hips",
            "Engage lats by 'bending the bar' around your legs"
        ],
        targetMuscles: "Erector Spinae, Glutes, Hamstrings, Trapezius",
        equipment: "Barbell, Plates"
    },
    "Barbell Curls": {
        description: "The classic bicep builder - an isolation exercise for arm development.",
        execution: [
            "Stand with feet shoulder-width apart holding barbell with underhand grip",
            "Keep elbows close to torso and stationary",
            "Curl the weight up by contracting biceps",
            "Continue lifting until biceps are fully contracted",
            "Slowly lower the bar to starting position",
            "Keep upper arms stationary throughout"
        ],
        formTips: [
            "Don't swing or use momentum - strict form only",
            "Avoid moving your elbows forward",
            "Control the negative (lowering) portion",
            "Squeeze biceps at the top of the movement"
        ],
        targetMuscles: "Biceps Brachii, Brachialis",
        equipment: "Barbell"
    },
    "Overhead Press": {
        description: "A fundamental shoulder exercise that builds strength and mass in the deltoids.",
        execution: [
            "Stand with feet shoulder-width apart, barbell at shoulder height",
            "Grip bar slightly wider than shoulders with forearms vertical",
            "Brace core and press bar straight overhead",
            "Lock out arms at the top with bar over midfoot",
            "Lower bar with control to shoulders",
            "Keep core tight throughout the movement"
        ],
        formTips: [
            "Don't arch your back excessively",
            "Press in a straight line - move head back slightly as bar passes",
            "Keep glutes and core engaged for stability",
            "Full lockout at the top is important"
        ],
        targetMuscles: "Anterior Deltoid, Triceps, Upper Chest",
        equipment: "Barbell or Dumbbells"
    },
    "Crunches": {
        description: "A core isolation exercise focusing on the rectus abdominis.",
        execution: [
            "Lie on your back with knees bent and feet flat on floor",
            "Place hands behind head or across chest",
            "Lift shoulder blades off ground using abdominal muscles",
            "Focus on curling your ribcage towards pelvis",
            "Pause briefly at top",
            "Lower with control to starting position"
        ],
        formTips: [
            "Don't pull on your neck with hands",
            "Keep lower back pressed into floor",
            "Focus on quality contractions over high reps",
            "Exhale as you crunch up"
        ],
        targetMuscles: "Rectus Abdominis",
        equipment: "Mat or Floor"
    }
};

// Get detailed info for an exercise
export function getExerciseDetails(exerciseName) {
    return exerciseDetails[exerciseName] || {
        description: `${exerciseName} is an effective exercise for building muscle strength and size.`,
        execution: [
            "Follow proper form and technique",
            "Start with appropriate weight",
            "Control the movement throughout",
            "Focus on target muscle contraction"
        ],
        formTips: [
            "Warm up properly before exercising",
            "Maintain proper form to prevent injury",
            "Breathe consistently throughout the movement",
            "Progress gradually by increasing weight or reps"
        ],
        targetMuscles: "Various muscle groups",
        equipment: "Varies by exercise"
    };
}
