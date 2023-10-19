import { useCallback, useEffect, useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { TypeOf, date, object, string } from 'zod';
import { type } from 'os';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = object({
    email: string().email("Invalid email"),
    password: string().min(4, "Password must be at least 4 characters"),
})

type loginInput = TypeOf<typeof loginSchema>;

const LoginForm = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState("")


    const methods = useForm<loginInput>({
        resolver: zodResolver(loginSchema)
    })

  
    const { handleSubmit } = methods;

    const onSubmit = async (data: loginInput) => {
        try {
            
            const result = await axios.post("http://localhost:4002/auth/login", data)

            localStorage.setItem("token", result.data.token)
            setTimeout(() => { navigate("/vacations") }, 1000)
        } catch (error: any) {
            if (error.response.status == 404) {
                setErrorMessage("User does not exist in the system!")
            }else{
                if (error.response.status == 401) {
    
                    setErrorMessage("email / pasword is not corect !")
                }
    
                else {
                    alert("Something went wrong!")
    
                }
            }
          
        }

    }

    function newUser() {
        navigate("/register")
    }


    return (
        <FormProvider {...methods} >
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: "flex", flexDirection: "column" }}>


                    Email
                    <input type="email" {...methods.register("email")} />
                    <span className="error">{emailError}</span>
                    {methods.formState.errors.email && <span className="error">{methods.formState.errors.email.message}</span>}
                    Password
                    <input type="password" {...methods.register("password")} />
                    {methods.formState.errors.password && <span className="error">{methods.formState.errors.password.message}</span>}

                </div>

             <span className='error'> {errorMessage}</span>  

                <button type="submit">Sign In</button>

                <br></br>
                <button type="button" onClick={newUser}>New user</button>

            </form>
        </FormProvider>
    );
};

// async function loginService() {
//     const loginPayload = {
//         email,
//         password
//     }
//     try {
//         await axios.post("http://localhost:4002/auth/login", loginPayload)
//             .then((result: any) => {
//                 localStorage.setItem("token", result.data.token)
//                 setTimeout(() => { navigate("/vacations") }, 500)
//             })
//             .catch((error) => {
//                 if (error.response.status == 404) {
//                     setErrorMessage("User does not exist in the system!")
//                 }
//             })

//     } catch (ex) {
//         alert("Something went wrong!")
//     }
// }



{/* <br></br> */ }
{/* <div style={{ display: "flex", flexDirection: "column" }}>
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
                    type="password"
                    id="password"
                    placeholder={password}
                    onChange={handlePasswordChangeCallback}
                    required
                />
            </div> */}
{/* <div>
                <label htmlFor="password">Test</label>
                <input
                    type="test"
                    id="test"
                    ref={testRef as any}
                    required
                />
            </div> */}

export default LoginForm;
