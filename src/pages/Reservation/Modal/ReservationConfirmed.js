import { useEffect, useState, useRef } from 'react';
import BASE_URL from '../../../config';
import ModalLayout from '../../../components/Modal/modalLayout';
import css from './ReservationConfirmed.module.scss';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ReservationConfirmed = props => {
  let yourTripDate = props.yourTripDate;
  let reservation = props.reservation;
  const [show, setShow] = useState(false);
  const reservationNumber = Math.floor(Math.random() * 1000000 + 1);
  const el = useRef();
  const navigate = useNavigate();
  const goToMyPage = () => {
    navigate('/reservationlist');
  };

  const closeHandler = e => {
    setShow(false);
    props.onClose(false);
    goToMyPage();
  };

  const onClick = e => {
    if (!el.current.contains(e.target)) {
      setShow(false);
      props.onClose(false);
      goToMyPage();
    }
  };

  const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      check_in: reservation.checkin,
      check_out: reservation.checkout,
      guests: reservation.guests,
      reservation_no: reservationNumber,
      user_id: reservation.user_id,
      room_id: reservation.room_id,
    }),
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/reservation`, postOptions);
      const json = await res.json();
      console.log(json);
    })();
  }, []);
  useEffect(() => {
    console.log(yourTripDate);
  }, []);
  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div>
      {show && (
        <ModalLayout modalOff={onClick}>
          <div ref={el} className={css.container}>
            <div className={css.confirmationMessage} id="confirmation-message">
              <div className={css.messageHeader}>
                <div className={css.CloseBtnBox}>
                  <button
                    className={css.CloseBtn}
                    onClick={() => {
                      closeHandler(false);
                    }}
                  >
                    <MdClose />
                  </button>
                </div>
                <div className={css.confirmationHeaderTextBox}>
                  <p>Reservation&nbsp;Confirmed!</p>
                </div>
              </div>
              <div className={css.dropDownSelectors}>
                <div>Reservation number : {reservationNumber}</div>
                <div>Dates : {yourTripDate}</div>
                <div>Guests : {reservation.guests}</div>
                <div />
              </div>
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default ReservationConfirmed;
