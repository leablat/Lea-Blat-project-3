import './App.css'
import VacationsList from './components/pages/vacations'
import ReporstsPage from './components/pages/reports'
import { createContext, useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { Button } from 'primereact/button'
import LoginForm from './components/pages/login'
// import NotFound from './components/pages/not-found'
// import RegistrationComponent from './components/pages/signup'
import Register from './components/pages/register';
import AddVacation from './components/pages/addVacation';
import EditVacation from './components/pages/editVacayion';
import VacationDetails from './components/pages/vacations/vacationDetails'
import decodeJWT from "jwt-decode"
import { any } from 'zod'

interface IRoute {
    path: string,
    key: string,
    component: any,
    label?: string,
    onlyAdmin?: boolean
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
        label: "Reports"
    },


    // {
    //     path: "*",
    //     component: <NotFound />,
    //     key: "not found",
    // }

]
export const UTCContext = createContext<{ isUtc: boolean }>({ isUtc: true })


function App() {
    const navigate = useNavigate();
    const [isUtc, setIsUtc] = useState(false)
    const [userName , setUeserName] = useState ("lea blat")
   
    useEffect(() => {
// const tokenPaylodes = getJwtPaylodes();
    const token = localStorage.getItem("token")
   let paylodes = {}
   if(decodeJWT(token||"")) {
    paylodes = decodeJWT(token||"")
   }

   console.log("paylodes",paylodes);
   
//   const paylodes = decodeJWT(token||"")
const userName = ""
if(paylodes.userName){
    setUeserName (userName)

}
        
        }
    
      , []);
   
    function logoutHandler() {
        localStorage.removeItem("token")

        navigate("/login")
    }

    return (

        <UTCContext.Provider value={{ isUtc }}>
            <div>
                <div>
                    {/* <h5>  Utc time?</h5>
                    <InputSwitch checked={isUtc} onChange={(__avi_stop__) => { */}
                    {/* setIsUtc(!isUtc)
                    }} /> */}
                </div>
                {/* <div>
                    <h5>  Format? Use DateFNS - https://date-fns.org/v1.29.0/docs/format</h5>
                    <div>
                        <input id="formatA" type='radio' name="format" /> yyyy-MMM-dd HH:mm:SS
                    </div>
                    <div>
                        <input id="formatB" type='radio' name="format" /> yy/MM/dd HH:mm:SS
                    </div>
                </div> */}
                <div style={{ width: "100%", top: 0, left: 0, position: "absolute", textAlign: "right" }}>
                    <Button onClick={logoutHandler}> Log Out</Button>
                </div>
                <div style={{ marginTop: "50px" }}>
                    {routes.filter(showRoutesPerRole).filter(r => r.label).map((route: IRoute) => {
                        return <Link key={route.label} to={route.path} className="router-item"> {route.label}  </Link>
                    })}
                </div>
                {userName?<div>Hello {userName}</div>: ""}

                
                <Routes>
                    {routes.map((route: IRoute) => {
                        return <Route path={route.path} key={route.key} element={route.component} />
                    })}
                </Routes>
            </div>
        </UTCContext.Provider>
    )
}

function showRoutesPerRole(route: IRoute) {
    return true;
    // check only users that have admin OR regular users.

    // if (localStorage.getItem("role") !== "admin") return true
    // return route.onlyAdmin && localStorage.getItem("role") === "admin"
}


export default App


