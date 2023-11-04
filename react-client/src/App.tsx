import './App.css'
import VacationsList from './components/pages/vacations'
import ReporstsPage from './components/pages/reports'
import { createContext, useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { Button } from 'primereact/button'
import LoginForm from './components/pages/login'
import Register from './components/pages/register';
import AddVacation from './components/pages/addVacation';
import VacationDetails from './components/pages/vacations/vacationDetails'
import { checkIsAdminJwt, getJwtPayloads } from './components/pages/helper/decodeJWT'
import topImage from './assets/Images/vacations.png'
import userIcon from './assets/icons/user.png';
import EditVacation from './components/pages/editVacation'



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
            <div className="wrapper">
                <div className="navbar">
                    <div className="parallax">
                        <img src={topImage} alt="Top Image" className="parallax" />
                    </div>
                    <div className='navbar-content'>
                        <div><Button onClick={logoutHandler}>LogOut</Button></div>
                        <div className="nav-links">
                            {routes.filter((r: IRoute) => r.label && showRoutesPerRole(r.role)).map((route: IRoute) => {
                                return <Link key={route.label} to={route.path} className="router-item"> {route.label}  </Link>
                            })}
                        </div>                       
                        <div className="user-info">
                            <img src={userIcon} alt="User Icon"
                             style={{ width: "30px", height: "30px" }}
                              />
                            <span>   {userName ? <div> {userName}</div> : ""}</span>
                        </div>
                      
                    </div>
                </div>
                <div className='content'>
                    <Routes>
                        {routes.map((route: IRoute) => {
                            return <Route path={route.path} key={route.key} element={route.component} />
                        })}
                    </Routes>                </div>
            </div>
        </UTCContext.Provider>
    )
}


export default App


