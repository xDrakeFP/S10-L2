import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = ({ asin }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);

    useEffect(() => {
        console.log("ASIN ricevuto in CommentArea:", asin);
        const fetchComments = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + asin, {
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODg3NzEyNDEyODg5NzAwMTVmMjdiYjkiLCJpYXQiOjE3NTM3MDY3ODgsImV4cCI6MTc1NDkxNjM4OH0.6NlNK0jgmEy-mOoABW8YEDxbbh5JnrbVgqVW6cIHla0",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setComments(data);
                    setError(false);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.log(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (asin) {
            fetchComments();
        }
    }, [asin]);

    return (
        <div className="text-center">
            {isLoading && <Loading />}
            {isError && <Error />}
            <AddComment asin={asin} />
            <CommentList commentsToShow={comments} />
        </div>
    );
};

export default CommentArea;
