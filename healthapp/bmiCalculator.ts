type BmiResult = {
    weight: number;
    height: number;
    bmi: string;
};

export function calculateBmi(height: number, weight: number): BmiResult {
    const bmi = weight / ((height / 100) ** 2);
    let range;

    if (bmi < 18.5) {
        range = "Underweight";
    } else if (bmi < 25) {
        range = "Normal weight";
    } else if (bmi < 30) {
        range = "Overweight";
    } else {
        range = "Obese";
    } 

    return {
        weight,
        height,
        bmi: range
    };
}

if (process.argv[1] === import.meta.filename) {
    const height = process.argv[2];
    const weight = process.argv[3];
    console.log(calculateBmi(Number(height), Number(weight)));
}





