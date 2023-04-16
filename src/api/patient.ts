import { AxiosResponse } from "axios";
import { Patient } from "./api.types";
import { api } from "./api";
import { FetchPatients } from "../pages/patient/patient.types";
import dayjs from "dayjs";

// Define service functions for specific API endpoints or services
export const fetchPatient = (patientId: number): Promise<AxiosResponse> => {
    return api.get(`patients/${patientId}`);
};

export const fetchPatients = (page: number, pageSize: number): Promise<AxiosResponse> => {
    return api.get('/patients', { params: { page, pageSize } });
};

export const createPatient = (patientData: Patient): Promise<AxiosResponse<Patient>> => {
    return api.post('/patients', patientData);
};

export const updatePatient = (modifiedData: Patient): Promise<AxiosResponse<Patient>> => {
    return api.put(`/patients/`, modifiedData);
};

export const deletePatient = (patientId: number): Promise<AxiosResponse<void>> => {
    return api.delete(`/patients/${patientId}`);
};