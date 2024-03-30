
import { Avatar, Button } from "@nextui-org/react";
import { useAuth } from "../../context/AuthContext";
import { Settings, UserCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import IUser from "../../interfaces/User";
import IProfile from "../../interfaces/Profile";
import axios from "axios";
import { api } from "../../context/AuthContext";
import { set } from "react-hook-form";

const UserDetails = ({user, profile, postsCounter}: { user: IUser, profile: IProfile, postsCounter: number}) => {

    /* const {
        state: { posts },
    } = useStore(); */
    //const { openModal } = useModal();
    const [isFollowing, setIsFollowing] = useState(0);
    const [isFollowed, setIsFollowed] = useState(0);
    const [postCounter, setPostCounter] = useState(0);   
    const { VITE_BASE_BACKEND_URL } = import.meta.env;

    useEffect(() => {
        setPostCounter(postsCounter);
        //GET THE NUMBER OF FOLLOWERS
        api.get(`/follower/follower/${profile.id}`)
            .then(resp => {
                if(resp.status === 404) {
                    setIsFollowed(isFollowed);
                }
                setIsFollowed(resp.data.length);
                console.log("followers: ", resp.data.length)

            }).catch(err => {
                console.log("user not followed")
            }
        )
        
        //GET THE NUMBER OF FOLLOWING
        api.get(`/follower/following/${profile.id}`)
            .then(resp => {
                if(resp.status === 404) {
                    setIsFollowing(isFollowing);
                }
                setIsFollowing(resp.data.length);
                console.log("following: ", resp.data.length)

            }).catch(err => {
                console.log("user not following")
            }
        )

        
    }, [isFollowed, isFollowing, postCounter]);


    return (
        <div className="flex flex-col justify-center items-center gap-8 p-12 mt-4">
            {/* Avatar and username */}
            <div className="flex flex-col sm:flex-row gap-8 sm:justify-between sm:items-center w-full">
                <div className="flex items-center justify-center gap-24 w-full">
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform w-18 h-18 sm:w-24 sm:h-24"
                            src={`${VITE_BASE_BACKEND_URL}images` + profile.avatarUrl}
                            showFallback
                            fallback={<UserCircleIcon className="size-20 text-gray-100" />}
                        />

                    {profile ? (
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl sm:text-2xl font-semibold">{profile?.firstName} {profile?.lastName}</h1>
                            {/* <img src={`http://localhost:8080/images/sticker-smash.jpeg`} alt="ciao" /> */}
                            <div className="flex gap-3">
                                <div className="flex flex-col">
                                    <span>Followers</span>
                                    <strong className="text-xl font-bold">{isFollowed}</strong>
                                </div>
                                <div className="bg-base-content w-[1px]"></div>
                                <div className="flex flex-col">
                                    <span>Following</span>
                                    <strong className="text-xl font-bold">{isFollowing}</strong>
                                </div>
                                <div className="bg-base-content w-[1px]"></div>
                                <div className="flex flex-col">
                                    <span>Posts</span>
                                    {/* <strong className="text-xl font-bold">{posts?.length}</strong> */}
                                    <strong className="text-xl font-bold">{postCounter}</strong>
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

        </div>
    );
};

export default UserDetails;