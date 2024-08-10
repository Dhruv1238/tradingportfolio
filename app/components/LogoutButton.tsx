import { Button } from "@nextui-org/react"
import { useContext } from "react"
import { UserContext } from "../userContext"



const LogoutButton = () => {
    const { setLoggedIn, setAccessToken } = useContext(UserContext)

    const handleLogout = () => {
        setLoggedIn(false)
        setAccessToken(null)
    }

    return (
        <>
            <Button color="danger" onClick={handleLogout}>
                LogOut
            </Button>
        </>
    )
}

export default LogoutButton