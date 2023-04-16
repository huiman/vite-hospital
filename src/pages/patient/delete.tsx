import { redirect } from "react-router-dom";
import { deletePatient } from "../../api/patient";

export async function action ({ params }: { params?: { patientId?: number } }) {

    if (!params?.patientId) {
        throw new Error('no patient to delete.')
    }
    await deletePatient(params?.patientId);
    return redirect("/patients/pages/1");
}