import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {Button, Input} from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface IFormInput {
  email: string;
  password: string;
}

function Login() {

  //state for password visibility
  const [showPassword, setShowPassword] = useState(false);

 /*  const { control, handleSubmit, reset, formState: { errors, isSubmitting}, setError } = useForm<IFormInput>({
    defaultValues: {
      email: "",
      password: ""
    }
  }); */

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full">
      <h1 className="text-4xl font-bold">Login</h1>
    </div>
  )
}

export default Login