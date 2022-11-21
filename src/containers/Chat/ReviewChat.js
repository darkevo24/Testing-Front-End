import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'components';
import Form from 'react-bootstrap/Form';
import StarRatings from 'react-star-ratings';
import { chatStatusSelector, createChatReview, getChatStatus } from './reducer';

export const ReviewChat = ({ setIsOpen }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [desc, setDesc] = useState('');
  const { record: chatStatus } = useSelector(chatStatusSelector);

  const formRef = React.useRef(null);

  const onSubmitForm = async () => {
    await dispatch(
      createChatReview({
        chatLogId: chatStatus?.data?.log?._id,
        email: chatStatus?.data?.log?.email,
        rating,
        description: desc,
      }),
    );

    dispatch(getChatStatus({ email: chatStatus?.data?.log?.email }));
    setIsOpen(false);
  };

  return (
    <>
      <div className="content">
        <div className="desc-review">
          <p className="desc-review-title">Percakapan telah berakhir</p>
          <p className="desc-review-desc">Berikan rating, komentar dan saran anda.</p>
          <StarRatings
            rating={rating}
            changeRating={(rating) => setRating(rating)}
            starDimension="24px"
            starSpacing="6px"
            starHoverColor="rgb(244, 213, 43)"
            starRatedColor="rgb(244, 213, 43)"
            numberOfStars={5}
          />
          <Form id="form-review" ref={formRef}>
            <Form.Group controlId="description" className="desc-review-text">
              <Form.Control
                as="textarea"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="bottom">
        <Button className="kirim w-100 br-8" onClick={onSubmitForm}>
          Kirim
        </Button>
      </div>
    </>
  );
};
