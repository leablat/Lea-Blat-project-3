import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { TypeOf, object, string } from 'zod';
import { useState } from "react";

const registrationSchema = object({
    email: string().email("Invalid email"),
    firstName: string().nonempty('firstName must be filled!'),
    password: string().min(4, "Password must be at least 4 characters"),
    lastName: string().nonempty('lastName must be filled!'),
});

type RegistrationInput = TypeOf<typeof registrationSchema>;

const RegistrationComponent = () => {
    const [emailError, setEmailError] = useState("")

    const navigate = useNavigate()
    const methods = useForm<RegistrationInput>({
        resolver: zodResolver(registrationSchema),
    });


    const { handleSubmit } = methods;

    const onSubmit = async (data: RegistrationInput) => {
        try {
            const result = await axios.post(`http://localhost:4002/auth/sign-up`, data)
            alert(result.data.message)
             /*לסדר שכאשר אני עושה register אני מיד יגיע ל- vacations... */
            setTimeout(() => { navigate("/vacations") }, 500)
        } catch (ex: any) {
            
            if (ex.response.status == 409) {
                setEmailError ("this email already exists")
            }        
            else {
            alert("Something went wrong!")
            }
        }

    }

    return (
        <FormProvider {...methods}>
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    first name
                    <input type="text" {...methods.register("firstName")} />
                    {methods.formState.errors.firstName && <span className="error">{methods.formState.errors.firstName.message}</span>}
                    last name
                    <input type="text" {...methods.register("lastName")} />
                    {methods.formState.errors.lastName && <span className="error">{methods.formState.errors.lastName.message}</span>}
                    Email
                    <input type="email" {...methods.register("email")} />
                    <span className="error">{emailError}</span>
                    {methods.formState.errors.email && <span className="error">{methods.formState.errors.email.message}</span>}
                    Password
                    <input type="password" {...methods.register("password")} />
                    {methods.formState.errors.password && <span className="error">{methods.formState.errors.password.message}</span>}


                </div>
                <button type="submit">Sign Up</button>
            </form>
        </FormProvider>
    );
};

export default RegistrationComponent;