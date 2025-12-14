import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    return (
        <div className="h-full bg-background-default dark:bg-background-dark">
            <Navbar />
            <div className="w-full p-8 flex flex-col md:flex-row gap-8 justify-center">
                {/* LEFT COLUMN */}
                <div className="md:w-[26%] w-full flex flex-col gap-8">
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <FriendListWidget userId={userId} />
                </div>

                {/* RIGHT COLUMN */}
                <div className="md:w-[42%] w-full flex flex-col gap-8">
                    <MyPostWidget picturePath={user.picturePath} />
                    <div className="mt-8" />
                    <PostsWidget userId={userId} isProfile />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
