import { Button, ListGroup } from "react-bootstrap";

const SingleComment = ({ comment }) => {
    const deleteComment = async (asin) => {
        try {
            let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + asin, {
                method: "DELETE",
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODg3NzEyNDEyODg5NzAwMTVmMjdiYjkiLCJpYXQiOjE3NTM3MDY3ODgsImV4cCI6MTc1NDkxNjM4OH0.6NlNK0jgmEy-mOoABW8YEDxbbh5JnrbVgqVW6cIHla0",
                },
            });
            if (response.ok) {
                alert("La recensione è stata elimata!");
            } else {
                throw new Error("La recensione non è stata eliminata!");
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <ListGroup.Item>
            {comment.comment}
            <Button variant="danger" className="ms-2" onClick={() => deleteComment(comment._id)}>
                Elimina
            </Button>
        </ListGroup.Item>
    );
};

export default SingleComment;
