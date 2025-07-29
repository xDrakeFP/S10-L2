import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = ({ asin }) => {
    // state = {
    //   comment: {
    //     comment: '',
    //     rate: 1,
    //     elementId: this.props.asin,
    //   },
    // }

    const [comment, setComment] = useState({
        comment: "",
        rate: 1,
        elementId: asin,
    });

    // componentDidUpdate(prevProps) {
    //   if (prevProps.asin !== this.props.asin) {
    //     this.setState({
    //       comment: {
    //         ...this.state.comment,
    //         elementId: this.props.asin,
    //       },
    //     })
    //   }
    // }

    useEffect(() => {
        setComment({
            comment: "",
            rate: 1,
            elementId: asin,
        });
    }, [asin]);

    // sendComment = async (e) => {
    //   e.preventDefault()
    //   try {
    //     let response = await fetch(
    //       'https://striveschool-api.herokuapp.com/api/comments',
    //       {
    //         method: 'POST',
    //         body: JSON.stringify(this.state.comment),
    //         headers: {
    //           'Content-type': 'application/json',
    //           Authorization: 'Bearer inserisci-qui-il-tuo-token',
    //         },
    //       }
    //     )
    //     if (response.ok) {
    //       alert('Recensione inviata!')
    //       this.setState({
    //         comment: {
    //           comment: '',
    //           rate: 1,
    //           elementId: this.props.asin,
    //         },
    //       })
    //     } else {
    //       throw new Error('Qualcosa è andato storto')
    //     }
    //   } catch (error) {
    //     alert(error)
    //   }
    // }

    const sendComment = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
                method: "POST",
                body: JSON.stringify(comment),
                headers: {
                    "Content-type": "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODg3NzEyNDEyODg5NzAwMTVmMjdiYjkiLCJpYXQiOjE3NTM3MDY3ODgsImV4cCI6MTc1NDkxNjM4OH0.6NlNK0jgmEy-mOoABW8YEDxbbh5JnrbVgqVW6cIHla0",
                },
            });
            if (response.ok) {
                alert("Recensione inviata!");
                setComment({
                    comment: {
                        comment: "",
                        rate: 1,
                        elementId: asin,
                    },
                });
            } else {
                throw new Error("Qualcosa è andato storto");
            }
        } catch (error) {
            alert(error);
        }
    };
    return (
        <div className="my-3">
            <Form onSubmit={sendComment}>
                <Form.Group className="mb-2">
                    <Form.Label>Recensione</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Inserisci qui il testo"
                        value={comment.comment}
                        onChange={(e) =>
                            // setState({
                            //     comment: {
                            //         ...comment,
                            //         comment: e.target.value,
                            //     },
                            // })

                            setComment((prev) => ({ ...prev, comment: e.target.value }))
                        }
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Valutazione</Form.Label>
                    <Form.Control as="select" value={comment.rate} onChange={(e) => setComment((prev) => ({ ...prev, comment: e.target.value }))}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Invia
                </Button>
            </Form>
        </div>
    );
};

export default AddComment;
