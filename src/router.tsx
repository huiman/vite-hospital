import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Root from "./root";
import ErrorPage from "./pages/error";
import Dashboard from "./pages/dashboard";
import Index from "./pages";
import PatientsMain, { loader as patientsLoader } from './pages/patient/main'
import PatientView, { loader as patientLoader, action as patientAction } from "./pages/patient/patient";
import PatientForm, { loader as updatePatientLoader, action as updatePatientAction } from "./pages/patient/patientForm";
import { action as deletePatientAction } from './pages/patient/delete'


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Root />}
            // loader={rootLoader}
            // action={rootAction}
            errorElement={<ErrorPage />}
        >
            <Route errorElement={<ErrorPage />}>
                <Route index element={<Index />} />
                <Route
                    path='patients/pages/:page'
                    element={<PatientsMain />}
                    loader={patientsLoader}
                />
                <Route
                    path="patients/:patientId"
                    element={<PatientView />}
                    loader={patientLoader}
                    action={patientAction}
                />
                <Route
                    path="patients/:patientId/edit"
                    element={<PatientForm />}
                    loader={updatePatientLoader}
                    action={updatePatientAction}
                />
                <Route
                    path="patients/:patientId/delete"
                    action={deletePatientAction}
                />
            </Route>
        </Route>
    )
);

export default router