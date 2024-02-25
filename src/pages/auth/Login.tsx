import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button, Input, divider } from "@nextui-org/react";
import { Eye, EyeOff, XCircle } from "lucide-react";
import { useState } from "react";
import { TLoginSchema, loginSchema } from "../../lib/validator";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

function Login() {
  //state for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TLoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<TLoginSchema> = async (formData) => {
    console.log(formData);
    navigate("/");
    //FIXME: Add login logic here and finish the form submission
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full">
      <h1 className="text-4xl font-bold">Login</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-1/2"
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="email"
              isInvalid={!!errors.email}
              errorMessage={!!errors.email && errors.email.message}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              label="password"
              type={showPassword ? "text" : "password"}
              isInvalid={!!errors.password}
              errorMessage={!!errors.password && errors.password.message}
              endContent={
                <Button isIconOnly variant="light" className="focus:outline-none" type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (<EyeOff color="gray" />) : (<Eye color="gray" />)}
                </Button>
              }
              {...field}
            />
          )}
        />

        {errors.root && (
          <div className="bg-red-500/10 p-4 rounded-xl text-red-500 flex items-center justify-center gap-2">
            <XCircle />
            {errors.root.message}
          </div>
        )}

        <Button
          type="submit"
          color="primary"
          size="lg"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Login
        </Button>
      </form>
      <p>
        Don't you have an account?{" "}
        <Link
          to="/auth/register"
          className="text-blue-500 underline hover:text-blue-600"
        >
          Register now for free!
        </Link>
      </p>
    </div>
  );
}

export default Login;

