import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/userService";
import { toast } from "react-hot-toast";
import { InputField } from "../components/InputField";
import { userSchema } from "../validations/userSchema";

export const UserRegistration = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({resolver: yupResolver(userSchema)});

    const onSubmit = async (data) => {
        setLoading(true);
        try{
            const {message, user} = await registerUser(data);
            toast.success(message);
            console.log("Registered User:", user);
            localStorage.setItem("user", JSON.stringify(user));

            setTimeout(() => {
                navigate("/login")
            },1500)
            
        }catch(error){
            const errorMessage = typeof error === "string" ? error : error.message
            if (errorMessage.includes("E-mail already in use")) {
                toast.error(
                    "This email already exists. Please register with a different email"
                );
            }else {
                toast.error(errorMessage)
            }
        }finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full mx-auto h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <h2 className="text-2xl font-bold mb-6">
                Register
            </h2>
            <form 
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 w-full max-w-sm"
            >
                <InputField
                    name= "fullName"
                    control={control}
                    label= "Fullname"
                    error={errors.fullName?.message}
                />
                <InputField
                    name= "email"
                    control={control}
                    label= "Email"
                    error={errors.email?.message}
                />
                <InputField
                    name= "password"
                    control={control}
                    label= "Password"
                    type="password"
                    error={errors.password?.message}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="border-2 text-black bg-blue rounded-lg font-medium px-5 py-2 mt-4"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}