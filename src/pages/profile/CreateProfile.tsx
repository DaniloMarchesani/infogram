import { Controller, SubmitHandler } from "react-hook-form";
import NavBar from "../../components/ui/NavBar";

import { useForm } from "react-hook-form";
import { Button, Input, Progress } from "@nextui-org/react";
import { FilePlus2, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { TCreateProfileSchema, createProfileSchema } from "../../lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const { VITE_BACKEND_URL } = import.meta.env;

function CreateProfile({ profile, id }: { profile: string, id: number }) {
  //State for handle the avatar image
  const [avatarImage, setAvatarImage] = useState<FileList | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  //state for handle the success of th submit of the form.
  const [success, setSuccess] = useState(false);

  //useEffect for check the progress of the upload of the image.
  useEffect(() => {
    if (uploadProgress > 0 && uploadProgress < 100) {
      setIsUploading(true);
    }
  }, [uploadProgress]);

  //defining a default values for my form fields.
  const defaultValues: TCreateProfileSchema = {
    firstName: "",
    lastName: "",
    bio: "",
    day: "0",
    month: "0",
    year: "0",
    /* avatar: null, */
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TCreateProfileSchema>({
    defaultValues: defaultValues,
    mode: "onBlur",
    resolver: zodResolver(createProfileSchema),
  }); //import the control and handleSubmit from the useForm hook.

//DATAAAAA
  /* const birthday = new Date("May 17, 1995"); 
  console.log(birthday.toLocaleDateString());
 */

  //Method for handle the submit of the form.
  const onSubmitForm: SubmitHandler<TCreateProfileSchema> = async (data) => {
    //data.avatar = avatarImage ? avatarImage.item(0) : null;
    

    try {
      const formData = new FormData();
      formData.append("file", avatarImage?.item(0) as File);
      formData.append("profile", profile);


      setIsUploading(true);
      axios
        .post(`${VITE_BACKEND_URL}/file/upload/avatar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            progressEvent.total &&
              setUploadProgress(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
          },
        })
        .then((res) => {

          console.log(res.data);
          console.log(data);

          const { day, month, year } = data;
          const birthday = new Date(`${month}/${day}/${year}`).getTime();
          
          const profileData = {
            username: profile,
            firstName: data.firstName,
            lastName: data.lastName,
            bio: data.bio,
            birthday,
            //avatar: res.data.url,
          };

          axios.put(`${VITE_BACKEND_URL}/profile/${id}`, profileData, {
            headers: {
              "Content-Type": "application/json",
            },
          }).catch((error) => {
            console.log(error);
          });

          setSuccess(true);
        })
        .catch((error) => {
          console.log(error);
        });
      setIsUploading(false);
      
    } catch (error) {
      console.log(error);
      setError("root", {
        message: "An error occurred while trying to create your profile",
      });
    }
  };


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

        <form className="w-full p-12" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="flex flex-col gap-5 w-full">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  label="Firstname"
                  {...field}
                  isInvalid={!!errors.firstName}
                  errorMessage={!!errors.firstName?.message}
                />
              )}
            />
            {errors.firstName && (
              <div className="w-full bg-red-500/10 p-4 rounded-xl text-red-500 flex items-center justify-center gap-2">
                <XCircleIcon className="size-5" />
                {errors.firstName.message}
              </div>
            )}
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  label="Lastname"
                  {...field}
                  isInvalid={!!errors.firstName}
                  errorMessage={!!errors.firstName?.message}
                  
                />
              )}
            />
            {errors.lastName && (
              <div className="w-full bg-red-500/10 p-4 rounded-xl text-red-500 flex items-center justify-center gap-2">
                <XCircleIcon className="size-5" />
                {errors.lastName.message}
              </div>
            )}
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <Input
                  label="Your Bio"
                  {...field}
                  isInvalid={!!errors.firstName}
                  errorMessage={!!errors.firstName?.message}
                />
              )}
            />
            {errors.bio && (
              <div className="w-full bg-red-500/10 p-4 rounded-xl text-red-500 flex items-center justify-center gap-2">
                <XCircleIcon className="size-5" />
                {errors.bio.message}
              </div>
            )}

            <Controller name="day" control={control} render={({field}) => (<Input label="dd" isInvalid={!!errors.day} errorMessage={!!errors.day?.message} {...field} type="text"  value={field.value.toString()}/>)} />
            {errors.day && (
              <div className="w-full bg-red-500/10 p-4 rounded-xl text-red-500 flex items-center justify-center gap-2">
                <XCircleIcon className="size-5" />
                {errors.day.message?.toString()}
              </div>
            )}

            <Controller name="month" control={control} render={({field}) => (<Input draggable="false" type="number" label="mm" isInvalid={!!errors.month} errorMessage={!!errors.month?.message} {...field} value={field.value.toString()} ></Input>)} />
            {errors.month && (
              <div className="w-full bg-red-500/10 p-4 rounded-xl text-red-500 flex items-center justify-center gap-2">
                <XCircleIcon className="size-5" />
                {errors.month.message?.toString()}
              </div>
            )}

            <Controller name="year" control={control} render={({field}) => (<Input type="number" label="yyyy" isInvalid={!!errors.year} errorMessage={!!errors.year?.message} {...field} /* value={field.value.toString()} */></Input>)} />
            {errors.year && (
              <div className="w-full bg-red-500/10 p-4 rounded-xl text-red-500 flex items-center justify-center gap-2">
                <XCircleIcon className="size-5" />
                {errors.year.message?.toString()}
              </div>
            )}

            <div className="flex flex-col items-center justify-center mt-14">
              <h3 className="font-bold text-2xl my-4">Avatar image</h3>
        

              {!isUploading && (
                <label
                  className=" bg-default-200 max-w-[400px] rounded-full w-full aspect-square flex items-center justify-center flex-col gap-3 hover:bg-default-300 transition duration-200 group cursor-pointer overflow-hidden"
                  htmlFor="post-img"
                >
                  <input
                    id="post-img"
                    type="file"
                    hidden
                    onChange={(e) => setAvatarImage(e.target.files)}
                  ></input>

                  {avatarImage ? (
                    <img
                      src={URL.createObjectURL(avatarImage.item(0) as Blob)}
                      alt="avatar"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <>
                      <span className="p-3 bg-default-200 rounded-full">
                        <FilePlus2 className="h-8 w-8 group-hover:scale-110 transform transition duration-200" />
                      </span>
                      <span>Upload image</span>
                    </>
                  )}
                </label>
              )}

              {/* -------UPLOAD BAR------------- */}
              {isUploading && (
                <Progress
                  isStriped
                  aria-label="Loading..."
                  color="secondary"
                  value={uploadProgress}
                  className="max-w-md"
                />
              )}
              {/* --------------------------------- */}

              {success && (
                <div className="mt-10 w-full bg-green-500/10 p-4 rounded-xl text-green-500 flex items-center justify-center gap-2">
                  {" "}
                  Profile created!{" "}
                </div>
              )}

              {/* {errors.avatar && (
                <div className="w-full bg-red-500/10 p-4 rounded-xl text-red-500 flex items-center justify-center gap-2">
                  {" "}
                  <XCircleIcon className="size-5" /> {errors.avatar.message}{" "}
                </div>
              )} */}
            </div>
            {errors.root && (
              <div className="w-full bg-red-500/10 p-4 rounded-xl text-red-500 flex items-center justify-center gap-2">
                <XCircleIcon className="size-5" />
                {errors.root.message}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center mt-10">
            <Button color="primary" size="lg" type="submit">
              Create Profile
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateProfile;
