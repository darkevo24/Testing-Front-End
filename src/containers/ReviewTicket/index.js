import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getTicket, postTicketReview } from './reducer';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Notification from '../../components/Notification';
import StarRatings from 'react-star-ratings';
import image404 from 'assets/no-akses.svg';
import bn from 'utils/bemNames';
const bem = bn('404');

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

  const history = useHistory();

  const formRef = useRef(null);

  const onSubmitProses = () => {
    if (!desc || !rating) return;
    console.log({ data });
    if (data != null) {
      if (data.isReviewed) {
        Notification.show({
          type: 'secondary',
          message: <div> Sudah Direview </div>,
          icon: 'check',
        });
        history.push('/');
      } else {
        dispatch(
          postTicketReview({
            ticketId: data.ticketId,
            email: data.creatorData.email,
            rating,
            description: desc,
          }),
        ).then((result) => {
          if (!result.error) {
            Notification.show({
              type: 'secondary',
              message: <div> Review Tiket Berhasil Dikirim </div>,
              icon: 'check',
            });

            history.push('/');
          } else {
            Notification.show({
              type: 'secondary',
              message: <div> Review Tiket Gagal Terkirim </div>,
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
      dispatch(getTicket({ id })).then((result) => {
        setData(result.payload[0]);
      });
    }
  }, [id]);

  const createInputDiv = () => {
    return (
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
    );
  };

  const createEmptyTicket = () => {
    return (
      <div>
        <img src={image404} className={bem.e('img-not-found')} alt="not-found" />
        <div className="sdp-heading my-24">Maaf, Ticket untuk direview tidak tersedia</div>
        <Button
          onClick={() => {
            history.push('/');
          }}>
          Kembali ke Home
        </Button>
      </div>
    );
  };

  return (
    <div>
      <div className="contactus-wrapper">
        <div className="contactus-title mb-4">Ticket {id ?? ''}</div>
        {data != null && !data.isReviewed ? createInputDiv() : createEmptyTicket()}
      </div>
    </div>
  );
};

export default ReviewTicket;
