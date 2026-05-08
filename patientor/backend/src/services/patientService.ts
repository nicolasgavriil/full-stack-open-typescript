import { v4 as uuid } from 'uuid';
import patients from '../../data/patients.ts';
import type { Patient, NewPatient, NonSensitivePatient } from '../types.ts';

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, 
        name, 
        dateOfBirth, 
        gender,
        occupation,
    }));
};

const addPatient = (newPatient: NewPatient): Patient => {
    const patientToAdd: Patient = {
        id: uuid(),
        ...newPatient
    };

    patients.push(patientToAdd);
    return patientToAdd;
};

export default { getPatients, getNonSensitivePatients, addPatient };