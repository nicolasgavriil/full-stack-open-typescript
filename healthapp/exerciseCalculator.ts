interface ExerciseData {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export function calculateExercises(exerciseHours: number[], targetHours: number): ExerciseData {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(h => h > 0).length;
    const totalHours = exerciseHours.reduce((acc, current) => acc + current, 0);
    const averageHours = totalHours / periodLength;
    const completion = averageHours / targetHours;
    const ratingDescription: Record<number, string> = {
        1: "Not even halfway there",
        2: "Not bad but you didn't reach your target",
        3: "Good job",
    };
    let rating;
    let success = false;
    if (completion < 0.5) {
        rating = 1;
    } else if (completion < 1) {
        rating = 2;
    } else {
        rating = 3;
        success = true;
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription: ratingDescription[rating],
        target: targetHours,
        average: averageHours,
    };
}

if (process.argv[1] === import.meta.filename) {
    const targetHours = process.argv[2];
    const exerciseHours = process.argv.slice(3);
    console.log(calculateExercises(exerciseHours.map((eH) => Number(eH)), Number(targetHours)));
}




