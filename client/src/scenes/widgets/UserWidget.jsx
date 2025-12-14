import {
    MdManageAccounts,
    MdEdit,
    MdLocationOn,
    MdWork,
} from "react-icons/md";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = { palette: {} }; // Mocking theme palette if needed, but using Tailwind classes
    const navigate = useNavigate();
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
    }, []);

    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                className="gap-4 pb-4 border-b border-neutral-light dark:border-neutral-medium"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <div className="flex justify-between items-center gap-4">
                    <UserImage image={picturePath} />
                    <div>
                        <h4 className="border-0 hover:text-primary cursor-pointer font-medium text-xl dark:text-neutral-light">
                            {firstName} {lastName}
                        </h4>
                        <p className="text-neutral-medium">{friends.length} friends</p>
                    </div>
                </div>
                <MdManageAccounts className="text-2xl cursor-pointer dark:text-neutral-light" />
            </FlexBetween>

            {/* SECOND ROW */}
            <div className="py-4 border-b border-neutral-light dark:border-neutral-medium">
                <div className="flex items-center gap-4 mb-2">
                    <MdLocationOn className="text-xl text-neutral-medium" />
                    <p className="text-neutral-medium">{location}</p>
                </div>
                <div className="flex items-center gap-4">
                    <MdWork className="text-xl text-neutral-medium" />
                    <p className="text-neutral-medium">{occupation}</p>
                </div>
            </div>

            {/* THIRD ROW */}
            <div className="py-4 border-b border-neutral-light dark:border-neutral-medium">
                <FlexBetween className="mb-2">
                    <p className="text-neutral-medium">Who's viewed your profile</p>
                    <p className="font-semibold text-neutral-main dark:text-neutral-light">{viewedProfile}</p>
                </FlexBetween>
                <FlexBetween>
                    <p className="text-neutral-medium">Impressions of your post</p>
                    <p className="font-semibold text-neutral-main dark:text-neutral-light">{impressions}</p>
                </FlexBetween>
            </div>

            {/* FOURTH ROW */}
            <div className="pt-4">
                <p className="font-medium text-lg mb-4 text-neutral-main dark:text-neutral-light">Social Profiles</p>

                <FlexBetween className="gap-4 mb-2">
                    <div className="flex items-center gap-4">
                        <img src="../assets/twitter.png" alt="twitter" /> {/* Need asset or just text */}
                        <div className="cursor-pointer">
                            <p className="font-medium text-neutral-main dark:text-neutral-light">Twitter</p>
                            <p className="text-neutral-medium">Social Network</p>
                        </div>
                    </div>
                    <MdEdit className="text-neutral-main dark:text-neutral-light" />
                </FlexBetween>

                <FlexBetween className="gap-4">
                    <div className="flex items-center gap-4">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <div className="cursor-pointer">
                            <p className="font-medium text-neutral-main dark:text-neutral-light">Linkedin</p>
                            <p className="text-neutral-medium">Network Platform</p>
                        </div>
                    </div>
                    <MdEdit className="text-neutral-main dark:text-neutral-light" />
                </FlexBetween>
            </div>
        </WidgetWrapper>
    );
};

export default UserWidget;
