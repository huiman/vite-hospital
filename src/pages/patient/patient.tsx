import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Button, Icon, Label, Menu, Table } from "semantic-ui-react";
import { Patient, PatientAll } from "../../api/api.types";
import { fetchPatient, updatePatient } from "../../api/patient";

dayjs.extend(customParseFormat);


export async function loader ({ params }: { params?: { patientId?: number } }) {
    const response = await fetchPatient(Number(params?.patientId))
    const patient = response.data as Patient
    console.log('🚀 ~ loader ~ patient:', patient)
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

export default function PatientView () {
    const navigate = useNavigate()
    const patient = useLoaderData() as PatientAll;
    const [patientData, setPatientData] = useState({
        ...patient, birthDate: dayjs(patient.birthDate).format('DD-MM-YYYY')
    })
    const { MedicalRecord } = patientData

    return (
        <div>
            <h1>:: Patient ::</h1>

            <p>First name: {patientData.firstName}</p>
            <p>Last name: {patientData.lastName}</p>
            <p>gender:{patientData.gender}</p>
            <p>Birth date:{patientData.birthDate}</p>

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>id</Table.HeaderCell>
                        <Table.HeaderCell>diagnosis</Table.HeaderCell>
                        <Table.HeaderCell>treatment</Table.HeaderCell>
                        <Table.HeaderCell>notes</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {MedicalRecord && MedicalRecord.map((mr) => {
                        return (
                            <Table.Row key={mr.id}>
                                <Table.Cell>{mr.id}</Table.Cell>
                                <Table.Cell>{mr.diagnosis}</Table.Cell>
                                <Table.Cell>{mr.treatment}</Table.Cell>
                                <Table.Cell>{mr.notes}</Table.Cell>
                            </Table.Row>
                        )
                    })

                    }
                </Table.Body>

                <Table.Footer>
                </Table.Footer>
            </Table>

            <Form method="put" id="patientForm">
                <Button color="green" type="submit">Edit</Button>
                <Button onClick={() => navigate(-1)}>Cancel</Button>
            </Form>
            <Form
                method="post"
                action="delete"
                onSubmit={(event) => {
                    if (
                        !confirm(
                            "Please confirm you want to delete this record."
                        )
                    ) {
                        event.preventDefault();
                    }
                }}
            >
                <Button color="red" type="submit">Delete</Button>
            </Form>
        </div >
    );
}




