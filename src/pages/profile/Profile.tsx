import { Suspense, useEffect, useState } from "react";
import Logo from "../../components/ui/Logo";
import { Inbox, Send } from "lucide-react";
import { Avatar, Button, Skeleton } from "@nextui-org/react";
import { faker } from "@faker-js/faker";
import ImageWithFallback from "../../components/ui/ImageWithFallback";
import UserDetails from "../../components/profile/UserDetails";
import { useAuth } from "../../context/AuthContext";
import DropdownAvatar from "../../components/ui/DropdownAvatar";
import axios, { AxiosResponse } from "axios";
import { api } from "../../context/AuthContext";
import IPost from "../../interfaces/Post";


const { VITE_BACKEND_URL } = import.meta.env;

function Profile() {
  const [loading, setLoading] = useState(true);

  //state for all posts
  const [posts, setPosts] = useState<IPost | null>(null);

  const { user, profile, logout } = useAuth();

  useEffect(() => {
    //console.log(localStorage.getItem("ACCESS_TOKEN"));
    console.log(profile);
    api
      .get<IPost[]>(`/post/all/${profile?.id}`, {
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [profile]);

  return (
    <div>
      <header>
        <nav className="flex justify-around items-center">
          <Logo />
          <div className="flex items-center justify-center gap-4">
            <Send className="cursor-pointer size-7" />
            <Inbox className="cursor-pointer size-7" />
            <DropdownAvatar />
          </div>
        </nav>
      </header>

      {user && profile && <UserDetails user={user} profile={profile} />}

      <section className="flex flex-col items-center justify-center container mx-auto p-24">
        <div className="grid lg:grid-cols-3 md:grid-cols-2">
          {/* {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="p-3 lg:p-4 drop-shadow-md">
              <ImageWithFallback imgUrl={faker.image.url()} />
            </div>
          ))} */}
        </div>
      </section>

      <footer className="flex items-center justify-center">
        <p>@Instabasic Made with love by me</p>
      </footer>
    </div>
  );
}

export default Profile;
