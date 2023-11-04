import { useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { TypeOf, object, string } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '../../ui-components/loader';
import { axiosConfig } from '../helper/httpConfig';

const loginSchema = object({
    email: string().email("Invalid email"),
    password: string().min(4, "Password must be at least 4 characters"),
})

type loginInput = TypeOf<typeof loginSchema>;

const LoginForm = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');
    const [LaoderStatus, setLaoderStatus] = useState(false);
    const methods = useForm<loginInput>({
        resolver: zodResolver(loginSchema)
    })

    const { handleSubmit } = methods;
    const onSubmit = async (data: loginInput) => {
        try {
            setLaoderStatus(true)
            const result = await axios.post(`${axiosConfig().baseUrl}/auth/login`, data)
            localStorage.setItem("token", result.data.token)
            setTimeout(() => { navigate("/vacations") }, 1000)
        } catch (error: any) {
            if (error.response.status == 404) {
                setErrorMessage("User does not exist in the !")
            } else {
                if (error.response.status == 401) {
                    setErrorMessage("pasword is not corect !")
                }
                else {
                    setErrorMessage("Something went wrong!")
                }
            }
        }
        setLaoderStatus(false)
    }

    function newUser() {
        navigate("/register")
    }

    return (
        LaoderStatus ? <Loader></Loader> :
            <div className='form-container'>
                <FormProvider {...methods} >
                    <form id="form" onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            Email
                            <input className='input-control' type="email" {...methods.register("email")} />
                            {methods.formState.errors.email && <span className="error">{methods.formState.errors.email.message}</span>}
                            Password
                            <input className='input-control' type="password" {...methods.register("password")} />
                            {methods.formState.errors.password && <span className="error">{methods.formState.errors.password.message}</span>}
                        </div>
                        <span className='error'> {errorMessage}</span>
                        <button type="submit">Sign In</button>
                        <br></br>
                        <button type="button" onClick={newUser}>New user</button>
                    </form>
                </FormProvider>
            </div>
    );
};
export default LoginForm;
