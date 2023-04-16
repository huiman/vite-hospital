import dayjs from "dayjs";
import { useState } from "react";
import { Form, NavLink, useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { Icon, Pagination, PaginationProps, Table } from "semantic-ui-react";
import { Patient } from "../../api/api.types";
import { fetchPatients } from "../../api/patient";
import { FetchPatients } from "./patient.types";

export async function loader ({ params }: { params: { page?: number, pageSize?: number } }) {
    const response = await fetchPatients(Number(params.page), Number(params.pageSize || 10));
    const data: FetchPatients = response.data;
    if (data.patients.length === 0) {
        throw new Response("", {
            status: 404,
            statusText: "Not found patient!"
        })
    }
    return data
}

// export async function action ({ request, params }) {
//     // let formData = await request.formData()
//     // return updateContact(params.contactId, {
//     //     favorite: formData.get('favorite') === "true"
//     // })
// }

export default function PatientsMain () {
    const fetcher = useFetcher()
    const navigate = useNavigate()

    const { totalPages, patients } = useLoaderData() as FetchPatients
    const [currentPage, setCurrentPage] = useState<number>(1);

    function HandlePageChange (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: PaginationProps) {
        setCurrentPage(Number(data.activePage ?? 1))
        navigate(`/patients/pages/${data.activePage}`)
    }

    return (
        <div >
            <h1>Patients List</h1>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Gender</Table.HeaderCell>
                        <Table.HeaderCell>Birth date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {patients && patients.map((patient: Patient) => (

                        <Table.Row key={patient.id}>
                            <Table.Cell>
                                <NavLink to={`/patients/${patient.id}/edit`}>
                                    <Icon name='wrench' size='large' />
                                </NavLink>
                                <NavLink to={`/patients/${patient.id}`}>
                                    <Icon color='green' name='file alternate outline' size='large' />
                                </NavLink>

                            </Table.Cell>
                            <Table.Cell>{patient.firstName + ' ' + patient.lastName}</Table.Cell>
                            <Table.Cell>{patient.gender}</Table.Cell>
                            <Table.Cell>{dayjs(patient.birthDate).format('DD/MM/YYYY')}</Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Pagination defaultActivePage={currentPage} totalPages={totalPages} onPageChange={HandlePageChange} />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>

        </div >
    );
}

