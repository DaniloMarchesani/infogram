import { useState } from "react";
import { useForm, Controller, SubmitHandler, set } from "react-hook-form";
import { TRegisterSchema, registerSchema } from "../../lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

/* 
* SUCCESS COMPONENT is at the bottom of the file.
*/

const { VITE_BACKEND_URL } = import.meta.env;


function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);



  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TRegisterSchema>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
    },
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<TRegisterSchema> = async (formData) => {
    console.log(formData);
    //FIXME: Add register logic here and finish the form submission.

    try {
      const response = await axios.post(`${VITE_BACKEND_URL}/auth/register`, formData);
      if(response.data.error) {
        setError("root", {
          message: response.data.error
        })
      }
      setSuccess(true);
    } catch (error: any) {
      console.error(error);
      setError("root", {
        message: error.response.data.error
      })
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-5 p-4 w-full">
      {success ? (
        <SuccessContent />
      ) : (
        <>
          <h1 className="text-4xl font-bold">Sign Up</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-1/2"
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  label="username"
                  isInvalid={!!errors.username}
                  errorMessage={!!errors.username && errors.username.message}
                  {...field}
                ></Input>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  label="email"
                  isInvalid={!!errors.email}
                  errorMessage={!!errors.email && errors.email.message}
                  {...field}
                ></Input>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  type={showPassword ? "text" : "password"}
                  label="password"
                  isInvalid={!!errors.password}
                  errorMessage={!!errors.password && errors.password.message}
                  endContent={
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      isIconOnly
                      variant="light"
                    >
                      {showPassword ? (
                        <EyeOff
                          color="gray"
                          onClick={() => setShowPassword(false)}
                        ></EyeOff>
                      ) : (
                        <Eye
                          color="gray"
                          onClick={() => setShowPassword(true)}
                        ></Eye>
                      )}
                    </Button>
                  }
                  {...field}
                ></Input>
              )}
            />

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  label="confirm password"
                  isInvalid={!!errors.passwordConfirm}
                  errorMessage={
                    !!errors.passwordConfirm && errors.passwordConfirm.message
                  }
                  endContent={
                    <Button
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      isIconOnly
                      variant="light"
                    >
                      {showConfirmPassword ? (
                        <EyeOff
                          color="gray"
                          onClick={() => setShowConfirmPassword(false)}
                        ></EyeOff>
                      ) : (
                        <Eye
                          color="gray"
                          onClick={() => setShowConfirmPassword(true)}
                        ></Eye>
                      )}
                    </Button>
                  }
                  {...field}
                ></Input>
              )}
            />

            {errors.root && (
              <div className="p-4 w-full bg-red-500/10 text-red-500 flex items-center justify-center">
                <XCircle></XCircle> {errors.root.message}
              </div>
            )}

            <Button
              type="submit"
              color="primary"
              size="lg"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}

//SUCCESS COMPONENT
const SuccessContent = () => {
  return (
    <div className="flex flex-col items-center bg-green-500/20 p-10 rounded-xl gap-10">
      <h1 className="text-3xl font-bold">Sign up Successfully!</h1>
      <p>Login in now for get into your account!</p>
      
        <Link to={"/login"}><Button color="success">Go to back to login!</Button></Link>
      
    </div>
  );
};

export default Register;
