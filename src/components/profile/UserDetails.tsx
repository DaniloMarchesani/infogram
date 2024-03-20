
import { Avatar, Button } from "@nextui-org/react";
import { useAuth } from "../../context/AuthContext";
import { Settings, UserCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import IUser from "../../interfaces/User";
import IProfile from "../../interfaces/Profile";
import axios from "axios";

const UserDetails = ({user, profile}: { user: IUser, profile: IProfile}) => {

    /* const {
        state: { posts },
    } = useStore(); */
    //const { openModal } = useModal();
    const [isFollowing, setIsFollowing] = useState(0);
    const [isFollowed, setIsFollowed] = useState(0);
    const { VITE_BACKEND_URL } = import.meta.env;


    return (
        <div className="flex flex-col justify-center items-center gap-8 p-12 mt-4">
            {/* Avatar and username */}
            <div className="flex flex-col sm:flex-row gap-8 sm:justify-between sm:items-center w-full">
                <div className="flex items-center justify-center gap-24 w-full">
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform w-18 h-18 sm:w-24 sm:h-24"
                            src={undefined}
                            showFallback
                            fallback={<UserCircleIcon className="size-20 text-gray-100" />}
                        />

                    {profile ? (
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl sm:text-2xl font-semibold">{profile?.firstName} {profile?.lastName}</h1>
                            <div className="flex gap-3">
                                <div className="flex flex-col">
                                    <span>Followers</span>
                                    <strong className="text-xl font-bold">1200</strong>
                                </div>
                                <div className="bg-base-content w-[1px]"></div>
                                <div className="flex flex-col">
                                    <span>Following</span>
                                    <strong className="text-xl font-bold">500</strong>
                                </div>
                                <div className="bg-base-content w-[1px]"></div>
                                <div className="flex flex-col">
                                    <span>Posts</span>
                                    {/* <strong className="text-xl font-bold">{posts?.length}</strong> */}
                                    <strong className="text-xl font-bold">0</strong>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="skeleton h-9 w-full"></div>
                            <div className="flex gap-3">
                                <div className="flex flex-col">
                                    <span>Followers</span>
                                    <div className="skeleton text-xl font-bold w-full h-9"></div>
                                </div>
                                <div className="bg-base-content w-[1px]"></div>
                                <div className="flex flex-col">
                                    <span>Following</span>
                                    <div className="skeleton text-xl font-bold w-full h-9"></div>
                                </div>
                                <div className="bg-base-content w-[1px]"></div>
                                <div className="flex flex-col">
                                    <span>Posts</span>
                                    <div className="skeleton text-xl font-bold w-full h-9"></div>
                                </div>
                            </div>
                        </div>
                    )}
                

                <div>
                    <Settings />
                </div>
                </div>

                {/* Actions */}
                {/* {user && (
                    <div className="flex flex-none">
                        <Button
                            className="btn btn-primary min-h-0 h-auto py-2 flex"
                            onClick={() => false}>
                            
                            Edit Profile
                        </Button>
                        <button className="btn btn-primary min-h-0 h-auto py-3">Follow</button> 
                    </div>
                )} */}
            </div>

            {/* Full name and bio */}
            {/* {user && (
                <div className="w-full flex flex-col gap-2">
                    <strong>{`${profile?.firstName} ${profile?.lastName}`}</strong>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: profile?.bio || "",
                        }}></p>
                </div>
            )} */}
        </div>
    );
};

export default UserDetails;