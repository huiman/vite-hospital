import { useRouteError } from "react-router-dom"

const ErrorPage: React.FC = () => {
    const error = useRouteError() as MyError
    console.error(error)

    return (
        <div id='error-page'>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}

interface MyError {
    statusText: string
    message: string
}

export default ErrorPage