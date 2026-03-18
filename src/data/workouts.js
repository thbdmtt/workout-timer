export const workouts = [
  {
    id: 'arms',
    label: 'Upper Body',
    restPresets: [180],
    exercises: [
      { name: 'Dips', sets: 6 },
      { name: 'Push Ups', sets: 6 },
      { name: 'Push Ups', sets: 6 },
      { name: 'Pull Ups', sets: 6 },
    ],
  },
  {
    id: 'legs',
    label: 'Lower Body',
    restPresets: [90, 180],
    exercises: [
      { name: 'Pistol Squat', sets: 6 },
      { name: 'Pistol Squat', sets: 6 },
      { name: 'Jump Squat', sets: 4 },
      { name: 'Calves', sets: 4 },
    ],
  },
  {
    id: 'abs',
    label: 'Core',
    restPresets: [90],
    exercises: [
      { name: 'Crunch', sets: 6 },
      { name: 'Ciseaux', sets: 3 },
      { name: 'Essuis Glace', sets: 3 },
    ],
  },
]

export function getWorkout(id) {
  return workouts.find((workout) => workout.id === id)
}
