import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations/userSchema";
import { toast } from "react-hot-toast";
import { loginUser } from "../services/userService";
import { InputField } from "../components/InputField";

export const LoginForm = () => {
    const navigate = useNavigate();
    const {user, login} = useAuth();
    const [loading , setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
            resolver:yupResolver(loginSchema),
            defaultValues: {email: "", password: ""},
    });

    useEffect(()=> {
        if(user){
            navigate("/");
        }
    }, [user, navigate]);

    const onSubmit = async(data) => {
        setLoading(true);
        try{
            const {message, token, user} = await loginUser(data)
            toast.success(message);
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            login(user)
        }catch(error){
            const errorMessage = typeof error === "string" ? error : error.message
            toast(errorMessage)
        }finally {
            setLoading(false)
        }
    }

    return (
    <div className="w-full mx-auto h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h2 className="text-2xl font-bold mb-6">Welcome back! 👋</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-sm"
      >
        <InputField
          name="email"
          control={control}
          label="Email"
          error={errors.email?.message}
        />
        <InputField
          name="password"
          control={control}
          label="Password"
          type="password"
          error={errors.password?.message}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Accessing..." : "Access My Account"}
        </button>
      </form>
    </div>
    );
}

