// api/types.ts

export interface Patient {
    id?: number;
    hospitalId: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
}

export interface MedicalRecord {
    id?: number;
    hospitalId: number;
    patientId: number;
    diagnosis: string;
    treatment: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    createdBy: number;
    updatedBy: number;
    deletedBy?: number;
}

export interface PatientAll extends Patient {
    MedicalRecord: MedicalRecord[]
}