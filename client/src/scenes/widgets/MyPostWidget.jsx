import {
    MdEdit,
    MdDelete,
    MdAttachFile,
    MdGif,
    MdImage,
    MdMic,
    MdMoreHoriz,
} from "react-icons/md";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
    };

    return (
        <WidgetWrapper>
            <div className="flex justify-between items-center gap-6 mb-4">
                <UserImage image={picturePath} />
                <input
                    placeholder="What's on your mind..."
                    className="w-full bg-neutral-light dark:bg-neutral-medium rounded-2xl p-4 focus:outline-none"
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                />
            </div>
            {isImage && (
                <div className="border border-neutral-medium rounded p-4 mb-4">
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className="border-2 border-dashed p-4 cursor-pointer">
                                <input {...getInputProps()} />
                                {!image ? (
                                    <p>Add Image Here</p>
                                ) : (
                                    <FlexBetween>
                                        <span>{image.name}</span>
                                        <MdEdit />
                                    </FlexBetween>
                                )}
                            </div>
                        )}
                    </Dropzone>
                    {image && (
                        <div onClick={() => setImage(null)} className="mt-2 w-10 cursor-pointer text-red-500">
                            <MdDelete />
                        </div>
                    )}
                </div>
            )}

            <FlexBetween className="pt-2 border-t border-neutral-light dark:border-neutral-medium">
                <div className="flex justify-between items-center gap-4 text-neutral-medium cursor-pointer" onClick={() => setIsImage(!isImage)}>
                    <MdImage />
                    <span>Image</span>
                </div>

                <div className="hidden md:flex justify-between items-center gap-4 text-neutral-medium cursor-pointer">
                    <MdGif />
                    <span>Clip</span>
                </div>

                <div className="hidden md:flex justify-between items-center gap-4 text-neutral-medium cursor-pointer">
                    <MdAttachFile />
                    <span>Attachment</span>
                </div>

                <div className="hidden md:flex justify-between items-center gap-4 text-neutral-medium cursor-pointer">
                    <MdMic />
                    <span>Audio</span>
                </div>

                <button
                    disabled={!post}
                    onClick={handlePost}
                    className="bg-primary text-white rounded-full px-6 py-2 font-semibold disabled:opacity-50 hover:bg-opacity-80 transition"
                >
                    POST
                </button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;
