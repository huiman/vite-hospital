import { Link, Outlet } from "react-router-dom"
import { Menu } from "semantic-ui-react"


const Root: React.FC = () => {
    return (
        <>
            <Menu>
                <Menu.Item as={Link} to="/">Hospital</Menu.Item>
                <Menu.Item as={Link} to='/patients/pages/1'>Patients</Menu.Item>
            </Menu>
            <div id="detail">
                <Outlet />
            </div>
        </>
    )
}

export default Root
