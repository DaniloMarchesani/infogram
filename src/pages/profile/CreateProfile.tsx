import { Controller, SubmitHandler } from "react-hook-form";
import NavBar from "../../components/ui/NavBar";

import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { FilePlus2, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { TCreateProfileSchema, createProfileSchema } from "../../lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";


function CreateProfile() {
   //defining a default values for my form fields.
   const defaultValues: TCreateProfileSchema = {
    firstName: "",
    lastName: "",
    bio: "",
    day: 0,
    month: 0,
    year: 0,
  };

  const { control, handleSubmit, formState: {errors, isSubmitting}, setError } = useForm<TCreateProfileSchema>({mode: "onBlur", defaultValues, resolver: zodResolver(createProfileSchema)}); //import the control and handleSubmit from the useForm hook.

  //State for handle the avatar image
  const [avatarImage, setAvatarImage] = useState<FileList | null>(null);
  //state for handle the success of th submit of the form.
  const [success, setSuccess] = useState(false);

  //Method for handle the submit of the form.
  const onSubmit: SubmitHandler<TCreateProfileSchema> = async (data) => {
    console.log(data, avatarImage);
  }

 

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center p-12 md:p-24">
        <h1 className="text-4xl font-bold text-center">
          Create your first profile!
        </h1>
        <p className="text-center p-4 italic">
          Is good that you create your first profile page so you can quickly
          start to let others people what you doin!
        </p>

        <form
          className="w-full p-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-5 w-full">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => <Input label="Firstname" {...field} isInvalid={!!errors.firstName} errorMessage={!!errors.firstName?.message}/>}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => <Input label="Lastname" {...field} isInvalid={!!errors.firstName} errorMessage={!!errors.firstName?.message}/>}
            />
            <Controller
              name="bio"
              control={control}
              render={({ field }) => <Input label="Your Bio" {...field} isInvalid={!!errors.firstName} errorMessage={!!errors.firstName?.message}/>}
            />
            <p className="font-bold text-center text-lg">Your Birthday date</p>
            <div className="flex gap-6">
              <Controller
                name="day"
                control={control}
                render={({ field }) => (
                  <Input type="number" {...field} label="dd" value={field.value.toString()} isInvalid={!!errors.firstName} errorMessage={!!errors.firstName?.message} />
                )}
              />
              <Controller
                name="month"
                control={control}
                render={({ field }) => (
                <Input type="number" {...field} value={field.value.toString()} label="mm" isInvalid={!!errors.firstName} errorMessage={!!errors.firstName?.message}/>
                )}
              />
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <Input type="number" {...field} label="yyyy"  value={field.value.toString()} isInvalid={!!errors.firstName} errorMessage={!!errors.firstName?.message} />
                )}
              />
            </div>
            <div>
              <p className="font-bold text-lg">Avatar image</p>
              <p className="text-center italic">Upload an image for your profile</p>
              <label
                className="bg-default-200 rounded-xl w-full aspect-square flex items-center justify-center flex-col gap-3 hover:bg-default-300 transition duration-200 group cursor-pointer overflow-hidden"
                htmlFor="post-img"
              >
                <input id="post-img" type="file" hidden onChange={(e) => setAvatarImage(e.target.files)}></input>
                <>
                  <span className="p-3 bg-default-200 rounded-full">
                    <FilePlus2 className="h-8 w-8 group-hover:scale-110 transform transition duration-200" />
                  </span>
                  <span>Upload image</span>
                </>
              </label>
            </div>
            { errors.root && (<div className="w-full bg-red-500/10 p-4 rounded-xl text-red-500 flex items-center justify-center gap-2">
                                <XCircleIcon className="size-5" />
                                {errors.root.message}
                            </div>
)}
            <Button color="primary" size="lg" type="submit">
              <span className="font-bold">Create Profile</span>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateProfile;
