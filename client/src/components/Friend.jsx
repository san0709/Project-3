import { MdPersonAddOutlined, MdPersonRemoveOutlined } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    return (
        <FlexBetween>
            <div className="flex justify-between items-center gap-4">
                <UserImage image={userPicturePath} size="55px" />
                <div
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0); // This forces refresh, workaround for bug where params change but component doesn't re-render fully if using same component. Ideally use useEffect on userId.
                    }}
                >
                    <h5 className="text-neutral-main dark:text-neutral-light font-medium text-lg hover:text-primary transition cursor-pointer">
                        {name}
                    </h5>
                    <p className="text-neutral-medium text-sm">{subtitle}</p>
                </div>
            </div>
            {friendId !== _id && (
                <button
                    onClick={() => patchFriend()}
                    className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition text-primary"
                >
                    {isFriend ? (
                        <MdPersonRemoveOutlined className="text-xl" />
                    ) : (
                        <MdPersonAddOutlined className="text-xl" />
                    )}
                </button>
            )}
        </FlexBetween>
    );
};

export default Friend;
