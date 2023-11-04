import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { TypeOf, object, string } from 'zod';
import { useState } from "react";
import { Loader } from "../../ui-components/loader";
import { axiosConfig } from "../helper/httpConfig";

const registrationSchema = object({
    email: string().email("Invalid email"),
    firstName: string().nonempty('firstName must be filled!'),
    password: string().min(4, "Password must be at least 4 characters"),
    lastName: string().nonempty('lastName must be filled!'),
});

type RegistrationInput = TypeOf<typeof registrationSchema>;

const RegistrationComponent = () => {
    const [emailError, setEmailError] = useState("")
    const [LaoderStatus, setLaoderStatus] = useState(false);
    const navigate = useNavigate()
    const methods = useForm<RegistrationInput>({
        resolver: zodResolver(registrationSchema),
    });

    const { handleSubmit } = methods;
    const onSubmit = async (data: RegistrationInput) => {
        try {
            setLaoderStatus(true)
            await axios.post(`${axiosConfig().baseUrl}/auth/sign-up`, data)
            setTimeout(() => { navigate("/login") }, 500)
        } catch (ex: any) {
            if (ex.response.status == 409) {
                setEmailError("this email already exists")
            }
            else {
                setEmailError("Something went wrong!")
            }
        }
        setLaoderStatus(false)
    }

    return (
        LaoderStatus ? <Loader></Loader> :
            <div className='form-container'>
                <FormProvider {...methods}>
                    <form id="form" onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            first name
                            <input className='input-control' type="text" {...methods.register("firstName")} />
                            {methods.formState.errors.firstName && <span className="error">{methods.formState.errors.firstName.message}</span>}
                            last name
                            <input className='input-control' type="text" {...methods.register("lastName")} />
                            {methods.formState.errors.lastName && <span className="error">{methods.formState.errors.lastName.message}</span>}
                            Email
                            <input className='input-control' type="email" {...methods.register("email")} />
                            <span className="error">{emailError}</span>
                            {methods.formState.errors.email && <span className="error">{methods.formState.errors.email.message}</span>}
                            Password
                            <input className='input-control' type="password" {...methods.register("password")} />
                            {methods.formState.errors.password && <span className="error">{methods.formState.errors.password.message}</span>}
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </FormProvider> </div>
    );
};

export default RegistrationComponent;