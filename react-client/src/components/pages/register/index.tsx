import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { z } from "zod";

const registrationSchema = z.object({
    email: z.string().email("Invalid email"),
    firstName:z.string(),
    password: z.string().min(4, "Password must be at least 6 characters"),
    lastName: z.string()
});

type RegistrationInput = z.infer<typeof registrationSchema>;

const RegistrationComponent = () => {
    const navigate = useNavigate()
    const methods = useForm<RegistrationInput>({
        resolver: zodResolver(registrationSchema),
    });


    async function signUpService() {
        const signUpPayload = {
            email: methods.getValues("email"),
            firstName: methods.getValues("firstName"),
            password: methods.getValues("password"),
            lastName: methods.getValues("lastName"),
        }

        try {
            const result = await axios.post(`http://localhost:4002/auth/sign-up`, signUpPayload)
            alert(result.data.message)
            setTimeout(() => { navigate("/login") }, 500)
        } catch (ex) {
            alert("Something went wrong!")
        }

    }

    return (
        <FormProvider {...methods}>
            <form>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    Email
                    <input type="email" {...methods.register("email")} />
                    {methods.formState.errors.email && <span>{methods.formState.errors.email.message}</span>}
                    first name
                    <input type="text" {...methods.register("firstName")} />
                    {methods.formState.errors.firstName && <span>{methods.formState.errors.firstName.message}</span>}
                    last name
                    <input type="text" {...methods.register("lastName")} />
                    {methods.formState.errors.lastName && <span>{methods.formState.errors.lastName.message}</span>}
                    Password
                    <input type="password" {...methods.register("password")} />
                    {methods.formState.errors.password && <span>{methods.formState.errors.password.message}</span>}


                </div>
                <button type="button" onClick={signUpService}>Sign Up</button>
            </form>
        </FormProvider>
    );
};

export default RegistrationComponent;