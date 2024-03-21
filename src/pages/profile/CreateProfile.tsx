import { Controller } from "react-hook-form";
import NavBar from "../../components/ui/NavBar";

import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { FilePlus2 } from "lucide-react";
import { useState } from "react";

function CreateProfile() {
  const { control, handleSubmit } = useForm();

  const [formData, setFormData] = useState(null);

  const [avatarImage, setAvatarImage] = useState<FileList | null>(null);

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
          onSubmit={handleSubmit((data) => console.log(data, avatarImage))}
        >
          <div className="flex flex-col gap-5 w-full">
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input label="Firstname" {...field} />}
            />
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => <Input label="Lastname" {...field} />}
            />
            <Controller
              name="bio"
              control={control}
              render={({ field }) => <Input label="Your Bio" {...field} />}
            />
            <p className="font-bold text-center text-lg">Your Birthday date</p>
            <div className="flex gap-6">
              <Controller
                name="day"
                control={control}
                render={({ field }) => (
                  <Input type="number" {...field} label="dd" />
                )}
              />
              <Controller
                name="month"
                control={control}
                render={({ field }) => (
                  <Input type="number" {...field} label="mm" />
                )}
              />
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <Input type="number" {...field} label="yyyy" />
                )}
              />
            </div>
            <div>
              <p className="font-bold text-lg">Avatar image</p>
              {/* <Controller
                name="avatar"
                control={control}
                render={({ field }) => (
                  <>
                    <label
                      className="bg-default-200 rounded-xl w-full aspect-square flex items-center justify-center flex-col gap-3 hover:bg-default-300 transition duration-200 group cursor-pointer overflow-hidden"
                      htmlFor="post-img"
                    >
                      <input id="post-img" type="file" hidden {...field}></input>
                      <>
                        <span className="p-3 bg-default-200 rounded-full">
                          <FilePlus2 className="h-8 w-8 group-hover:scale-110 transform transition duration-200" />
                        </span>
                        <span>Upload image</span>
                      </>
                    </label>
                  </>
                )}
              /> */}
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
