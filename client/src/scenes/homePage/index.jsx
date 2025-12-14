import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
    const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <div className="h-full bg-background-default dark:bg-background-dark">
            <Navbar />
            <div className="w-full p-8 flex flex-col md:flex-row gap-8 justify-between">
                {/* LEFT COLUMN */}
                <div className="md:w-[26%] hidden md:block">
                    <UserWidget userId={_id} picturePath={picturePath} />
                </div>

                {/* MIDDLE COLUMN */}
                <div className="md:w-[42%] w-full flex flex-col gap-8">
                    <MyPostWidget picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </div>

                {/* RIGHT COLUMN */}
                <div className="md:w-[26%] hidden md:flex flex-col gap-8">
                    <AdvertWidget />
                    <FriendListWidget userId={_id} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
