import { useCallback, useEffect, useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('initEmail');
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('initPassword');
    // const testRef = useRef()
    // console.log("SET EMAIL OR SET PASSWORD MADE RENDER - NOW LETS DECLARE : [handleEmailChange && handlePasswordChange] ")


    const handleEmailChangeCallback = useCallback((e: any) => {
        setEmail(e.target.value)
    }, [email])

    const handlePasswordChangeCallback = useCallback(
        (e: any) => {
            console.log(`the passowrd is: ${e.target.value}`)
            console.log(`the email is: ${email}`)
            setPassword(e.target.value);
        },
        [password]
    )

    // const handleEmailChangeCallback = (e: any) => {
    //     setEmail(e.target.value)
    // }

    // const handlePasswordChangeCallback = (e: any) => {
    //     console.log(`the passowrd is: ${e.target.value}`)
    //     console.log(`the email is: ${email}`)
    //     setPassword(e.target.value);
    // }




    // const handlePasswordChange = (e: any) => {
    //     setPassword(e.target.value);
    // };

    useEffect(() => {
        return () => {
            console.log("Unmount Login Component Now!!!!")
        }
    }, [])

    async function loginService() {
        const loginPayload = {
            email,
            password
        }
        try {
            await axios.post("http://localhost:4002/auth/login", loginPayload)
            .then((result: any) => {
                localStorage.setItem("token", result.data.token)
                setTimeout(() => { navigate("/vacations") }, 500)
            })
            .catch((error) => {
                if (error.response.status == 404) {
                    setErrorMessage("המשתמש לא קיים במערכת")
                }
            })
          
        } catch (ex) {
            alert("Something went wrong!")
        }
    }

    return (
        <form >
            <h2>Login</h2>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder={email}
                    onChange={handleEmailChangeCallback}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    id="password"
                    placeholder={password}
                    onChange={handlePasswordChangeCallback}
                    required
                />
            </div>
            {/* <div>
                <label htmlFor="password">Test</label>
                <input
                    type="test"
                    id="test"
                    ref={testRef as any}
                    required
                />
            </div> */}
            {errorMessage}
            <button type="button" onClick={loginService}>Login</button>
        </form>
    );
};

export default LoginForm;
