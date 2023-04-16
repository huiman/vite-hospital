import dayjs from "dayjs";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Button, Input } from "semantic-ui-react";
import { Patient } from "../../api/api.types";
import { fetchPatient, updatePatient } from "../../api/patient";
import { DateInput } from "semantic-ui-calendar-react";
import { useState } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);


export async function loader ({ params }: { params?: { patientId?: Number } }) {
    const response = await fetchPatient(Number(params?.patientId))
    const patient = response.data as Patient
    if (!patient) {
        throw new Response("", {
            status: 404,
            statusText: "Not found contact!"
        })
    }
    return patient
}

export async function action ({ request, params }: { request: Request, params?: { patientId?: number } }) {
    const formData = await request.formData()
    const patientData = Object.fromEntries(formData) as unknown as Patient

    const modifiedData = {
        ...patientData,
        id: Number(params?.patientId),
        birthDate: dayjs(patientData.birthDate, 'DD-MM-YYYY').toISOString(),
        hospitalId: Number(patientData.hospitalId)
    }

    await updatePatient(modifiedData as unknown as Patient)
    return redirect(`/patients/${params?.patientId}`)
}

export default function PatientForm () {
    const navigate = useNavigate()
    const patient = useLoaderData() as Patient;
    const [patientData, setPatientData] = useState({
        ...patient, birthDate: dayjs(patient.birthDate).format('DD-MM-YYYY')
    })

    return (
        <div>
            <h1>:: Patient ::</h1>

            <Form method="post" id="patient-form">
                <p>
                    <label>First name:</label><br />
                    <Input
                        placeholder="First"
                        aria-label="First name"
                        type="text"
                        name="firstName"
                        defaultValue={patientData.firstName}
                    /></p>
                <p>
                    <label >Last name:</label><br />
                    <Input
                        placeholder="Last"
                        aria-label="Last name"
                        type="text"
                        name="lastName"
                        defaultValue={patientData.lastName}
                    /></p>
                <p>
                    <label >gender:</label><br />
                    <Input
                        type="text"
                        name="gender"
                        placeholder="M"
                        defaultValue={patientData.gender}
                    /></p>
                <p>
                    <label >Birth date:</label><br />
                    <DateInput
                        name="birthDate"
                        value={patientData.birthDate}
                        // value={dayjs(patientData.birthDate).format('DD-MM-YYYY')}
                        iconPosition="left"
                        onChange={(e, data) => setPatientData(prev => ({ ...prev, birthDate: data.value }))}
                    />
                </p>

                <p>
                    <Button type="submit">Save</Button>
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                </p>
                <input type="hidden" name="hospitalId" value="1" />
            </Form>
        </div >
    );
}




