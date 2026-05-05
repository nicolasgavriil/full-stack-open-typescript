import { isNotNumber } from "./utils.ts";

function calculateBmi(height: number, weight: number): string {
    const bmi = weight / ((height / 100) ** 2)
    
    if (bmi < 18.5) return "Underweight"
    if (bmi < 25) return "Normal weight"
    if (bmi < 30) return "Overweight"
    return "Obese" 
}

const height = process.argv[2];
const weight = process.argv[3];

if (isNotNumber(height) || isNotNumber(weight) || Number(height) === 0) {
    throw new Error("Invalid arguments");
}

console.log(calculateBmi(Number(height), Number(weight)))