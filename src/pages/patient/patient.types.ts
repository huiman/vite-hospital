import { Patient } from "../../api/api.types"

export interface FetchPatients {
    page?: number
    totalPages: number
    patients: Patient[]
}