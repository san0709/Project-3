import {
    MdFavorite,
    MdFavoriteBorder,
    MdChatBubbleOutline,
    MdShare,
} from "react-icons/md";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend"; // Need to create Friend component
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    return (
        <WidgetWrapper>
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <div className="mt-4 text-base dark:text-neutral-light">
                {description}
            </div>
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    className="rounded-xl mt-3"
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <FlexBetween className="mt-2">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex justify-between items-center gap-1">
                        <button onClick={patchLike}>
                            {isLiked ? (
                                <MdFavorite className="text-primary text-xl" />
                            ) : (
                                <MdFavoriteBorder className="text-xl" />
                            )}
                        </button>
                        <span className="text-neutral-main dark:text-neutral-light">{likeCount}</span>
                    </div>

                    <div className="flex justify-between items-center gap-1">
                        <button onClick={() => setIsComments(!isComments)}>
                            <MdChatBubbleOutline className="text-xl" />
                        </button>
                        <span className="text-neutral-main dark:text-neutral-light">{comments.length}</span>
                    </div>
                </div>

                <button>
                    <MdShare className="text-xl" />
                </button>
            </FlexBetween>
            {isComments && (
                <div className="mt-2">
                    {comments.map((comment, i) => (
                        <div key={`${name}-${i}`}>
                            <div className="border-t border-neutral-light dark:border-neutral-medium my-2 pt-2">
                                <p className="text-neutral-main dark:text-neutral-light pl-4">
                                    {comment}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="border-t border-neutral-light dark:border-neutral-medium my-2 pt-2">
                        <p className="text-neutral-medium pl-4 text-sm">See all comments...</p>
                    </div>
                </div>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;
