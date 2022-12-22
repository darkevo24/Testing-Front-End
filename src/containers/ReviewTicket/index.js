import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getTicket, postTicketReview } from './reducer';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Notification from '../../components/Notification';
import StarRatings from 'react-star-ratings';

const ReviewTicket = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [desc, setDesc] = useState('');
  const [data, setData] = useState(null);
  const { handleSubmit } = useForm({
    defaultValues: {
      email: '',
      rating: 5,
    },
  });

  const formRef = useRef(null);

  const fetchData = () => {
    dispatch(getTicket({ id })).then((result) => {
      setData(result.payload[0]);
    });
  };

  const onSubmitProses = () => {
    if (!desc || !rating) return;
    if (data != null) {
      if (data.isReviewed) {
        Notification.show({
          type: 'secondary',
          message: <div> Sudah Direview </div>,
          icon: 'check',
        });
      } else {
        dispatch(
          postTicketReview({
            ticketId: data.ticketId,
            email: data?.creatorData?.email,
            rating,
            description: desc,
          }),
        ).then((result) => {
          if (!result.error) {
            Notification.show({
              type: 'secondary',
              message: <div> Review Berhasil Dikirim </div>,
              icon: 'check',
            });
            fetchData();
          } else {
            Notification.show({
              type: 'secondary',
              message: <div> Review Gagal Terkirim </div>,
              icon: 'check',
            });
          }
        });
      }
    } else {
      Notification.show({
        type: 'secondary',
        message: <div> Data tiket tidak ditemukan </div>,
        icon: 'error',
      });
    }
  };

  useEffect(async () => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div>
      <div className="contactus-wrapper">
        <div className="contactus-title mb-4">Ticket {id ?? ''}</div>
        <Form ref={formRef} onSubmit={handleSubmit(onSubmitProses)}>
          <p className="desc-review-desc">Berikan rating, komentar dan saran anda.</p>
          <center>
            <StarRatings
              rating={rating}
              changeRating={(rating) => setRating(rating)}
              starDimension="60px"
              starSpacing="6px"
              starHoverColor="rgb(244, 213, 43)"
              starRatedColor="rgb(244, 213, 43)"
              numberOfStars={5}
            />
          </center>
          <Form id="form-review" ref={formRef}>
            <Form.Group controlId="description" className="desc-review-text">
              <Form.Control
                as="textarea"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
              {!desc && <p className="desc-review-error">Isilah komentar dan saran Anda</p>}
            </Form.Group>
          </Form>
          <Button className="w-100" type="submit">
            Kirim Pesan
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ReviewTicket;
