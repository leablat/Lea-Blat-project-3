import './App.css'
import VacationsList from './components/pages/vacations'
import ReporstsPage from './components/pages/reports'
import { createContext, useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, RouteObject } from "react-router-dom"
import { Button } from 'primereact/button'
import LoginForm from './components/pages/login'
import Register from './components/pages/register';
import AddVacation from './components/pages/addVacation';
import EditVacation from './components/pages/editVacayion';
import VacationDetails from './components/pages/vacations/vacationDetails'
import { checkIsAdminJwt, getJwtPayloads } from './components/pages/helper/decodeJWT'

interface IRoute {
    path: string,
    key: string,
    component: any,
    label?: string,
    onlyAdmin?: boolean,
    role?: boolean
}
const routes: Array<IRoute> = [
    {
        path: "/register",
        component: <Register />,
        key: "register",
    },
    {
        path: "/login",
        component: <LoginForm />,
        key: "login",
        label: "login"
    },
    {
        path: "/addVacation",
        component: <AddVacation></AddVacation>,
        key: "addVacation",
    },
    {
        path: "/editVacation/:vacationId",
        component: <EditVacation></EditVacation>,
        key: "editVacation",
    },
    {
        path: "/vacations",
        component: <VacationsList />,
        key: "vacations",
        label: "Vacations"
    },
    {
        path: "/vacationDetails/:vacationId",
        component: <VacationDetails />,
        key: "vacationDetails",
    },
    {
        path: "/reports",
        component: <ReporstsPage />,
        key: "reports",
        label: "Reports",
        role: true
    },
]
export const UTCContext = createContext<{ isUtc: boolean }>({ isUtc: true })


function App() {
    const navigate = useNavigate();
    const [isUtc, setIsUtc] = useState(false)
    const [userName, setUserName] = useState("lea blat")

    useEffect(() => {
        const tokenPaylodes: any = getJwtPayloads()
        setUserName(tokenPaylodes?.userName)
        console.log("userName", userName);
    }, []);

    function logoutHandler() {
        localStorage.removeItem("token")
        setUserName("");
        navigate("/login")
    }

    function showRoutesPerRole(role?: boolean) {
        if (!checkIsAdminJwt() && role === true)
            return false
        return true
    }

    return (
        <UTCContext.Provider value={{ isUtc }}>
            <div>
                <div style={{ width: "100%", top: 0, left: 0, position: "absolute", textAlign: "right" }}>
                    <Button onClick={logoutHandler}> Log Out</Button>
                </div>
                <div style={{ marginTop: "50px" }}>
                    {routes.filter((r: IRoute) => r.label && showRoutesPerRole(r.role)).map((route: IRoute) => {
                        return <Link key={route.label} to={route.path} className="router-item"> {route.label}  </Link>
                    })}
                </div>
                {userName ? <div>Hello {userName}</div> : ""}
                <Routes>
                    {routes.map((route: IRoute) => {
                        return <Route path={route.path} key={route.key} element={route.component} />
                    })}
                </Routes>
            </div>
        </UTCContext.Provider>
    )
}


export default App


