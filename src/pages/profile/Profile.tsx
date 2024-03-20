import { Suspense, useEffect, useState } from "react";
import Logo from "../../components/ui/Logo";
import { Inbox, Send } from "lucide-react";
import { Avatar, Button, Skeleton } from "@nextui-org/react";
import { faker } from "@faker-js/faker";
import ImageWithFallback from "../../components/ui/ImageWithFallback";
import UserDetails from "../../components/profile/UserDetails";
import { useAuth } from "../../context/AuthContext";

function Profile() {

  const [loading, setLoading] = useState(true);

  //state for all posts
  const [posts, setPosts] = useState([]);

  const { user, profile, logout } = useAuth();
  

  useEffect(() => {
    //console.log(localStorage.getItem("ACCESS_TOKEN"));
  }, []);


  return (
    <div>
      <header>
        <nav className="flex justify-around items-center">
          <Logo />
          <div className="flex items-center justify-center gap-4">
            <Send className="cursor-pointer size-7" />
            <Inbox className="cursor-pointer size-7" />
            <Suspense fallback={<Skeleton className="cursor-pointer size-7" />}>
              <Avatar
                src={faker.image.avatar()}
                className="cursor-pointer size-7"
              />
            </Suspense>
          </div>
          <Button color="danger" onClick={() => logout()}>Logout</Button>
        </nav>
      </header>

      {user && profile && <UserDetails user={user} profile={profile}/>}

      <section className="flex flex-col items-center justify-center container mx-auto p-24">
        <div className="grid lg:grid-cols-3 md:grid-cols-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="p-3 lg:p-4 drop-shadow-md">
              <ImageWithFallback imgUrl={faker.image.url()} />
            </div>
          ))}
        </div>
      </section>

      <footer className="flex items-center justify-center">
        <p>@Instabasic Made with love by me</p>
      </footer>
    </div>
  );
}

export default Profile;
