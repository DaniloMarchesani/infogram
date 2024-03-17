import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button, Input, divider } from "@nextui-org/react";
import { Eye, EyeOff, XCircle } from "lucide-react";
import { useState } from "react";
import { TLoginSchema, loginSchema } from "../../lib/validator";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IUser from "../../interfaces/User";
import IProfile from "../../interfaces/Profile";
import { useAuth } from "../../context/AuthContext";

function Login() {
  //state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const { setProfile, setAsLogged} = useAuth();

  const navigate = useNavigate();

  const { VITE_BACKEND_URL } = import.meta.env;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<TLoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TLoginSchema> = async (formData) => {
    console.log(formData);
    //FIXME: Add login logic here and finish the form submission
    axios.post<IUser>(`${VITE_BACKEND_URL}/auth/login`, formData).then( response => {
      localStorage.setItem("ACCESS_TOKEN", response.data.token);
      axios.get<IProfile>(`${VITE_BACKEND_URL}/profile/${formData.username}`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`
        }
      }).then( response => {
          setProfile(response.data);
          navigate("/profile");
      })
    }).catch( error => {
      console.error(error);
      setError("root", {
        message: "Invalid username or password. Please try again."
      })
    })
    
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full">
      <h1 className="text-4xl font-bold">Login</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-1/2"
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              label="username"
              isInvalid={!!errors.username}
              errorMessage={!!errors.username && errors.username.message}
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
                <Button
                  isIconOnly
                  variant="light"
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff color="gray" />
                  ) : (
                    <Eye color="gray" />
                  )}
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
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p>
        Don't you have an account?{" "}
        <Link
          to="/register"
          className="text-blue-500 underline hover:text-blue-600"
        >
          Register now for free!
        </Link>
      </p>
    </div>
  );
}

export default Login;
