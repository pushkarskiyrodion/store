import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';

import './Profile.scss';

import { useScreen } from 'app/hooks/useScreen';
import { BackButton } from 'components/Buttons/BackButton';
import { IServerUpdate, actions as authActions, deleteAccount, update } from 'features/authReducer';
import { UserServerActions } from 'enums/UserServerActions';

interface UserInfo {
  name: string;
  surname: string;
  email: string;
}

export const Profile = () => {
  const [selectedField, setSelectedField] = useState(UserServerActions.About);
  const auth = useAppSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: auth.user?.name || '',
    surname: auth.user?.surname || '',
    email: auth.user?.email || '',
  });
  const [message, setMessage] = useState('');
  const [messageFromServer, setMessageFromServer] = useState('');
  const [changePassword, setChangePassword] = useState({
    email: auth.user?.email || '',
    oldPassword: '',
    newPassword: '',
  });
  const screenWidth = useScreen();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setMessageFromServer('');
    setChangePassword((current) => ({
      ...current,
      oldPassword: '',
      newPassword: '',
    }));
  }, [selectedField]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(authActions.signout());
    navigate('/');
  };

  const handleChangeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInfo((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setChangePassword((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (selectedField === UserServerActions.About) {
      const args: IServerUpdate = {
        endpoint: selectedField,
        formData: userInfo,
        token: auth.token,
      };

      dispatch(update(args))
        .unwrap()
        .then((res) => {
          const { user, message } = res;

          if (localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(user));
          }

          setUserInfo(user);
          setMessageFromServer(message);
        })
        .catch((err: string) => {
          setMessageFromServer(err);
        });
    } else if (selectedField === UserServerActions.Support) {
      axios
        .post(
          `https://server-store-y08r.onrender.com/${selectedField}`,
          { message },
          { headers: { authorization: auth.token } }
        )
        .then((res) => {
          setMessageFromServer(res.data.message);
          setMessage('');
        })
        .catch((err) => setMessageFromServer(err.response.data.message));
    } else if (selectedField === UserServerActions.ChangePassword) {
      const { newPassword, oldPassword } = changePassword;

      if (newPassword === oldPassword && newPassword && oldPassword) {
        setMessageFromServer('Passwords cannot be the same');
        return;
      }

      axios
        .patch(`https://server-store-y08r.onrender.com/${selectedField}`, changePassword, {
          headers: { authorization: auth.token },
        })
        .then((res) => {
          setMessageFromServer(res.data.message);
          setChangePassword(current => ({
            ...current,
            oldPassword: '',
            newPassword: '',
          }))
        })
        .catch((err) => setMessageFromServer(err.response.data.message));
    }
  };

  const handleOpenConfirm = () => {
    document.body.classList.add('page__modal--open');
    setIsModalOpen(true)
  }

  const handleCloseConfirm = () => {
    document.body.classList.remove('page__modal--open');
    setIsModalOpen(false);
  }

  const handleDelete = () => {
    const args = {
      email: auth.user?.email,
      token: auth.token,
    }

    dispatch(deleteAccount(args))
      .unwrap()
      .then(res => {
        setMessageFromServer(res)
        document.body.classList.remove('page__modal--open');

        if (localStorage.getItem('user')) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      })
  }

  const nav = useMemo(() => (
    <div className="profile__nav">
      <button
        className={classNames('profile__option', {
          'profile__header__link': screenWidth <= 950,
        })}
        onClick={() => setSelectedField(UserServerActions.About)}
      >
        About
      </button>

      <button
        className={classNames('profile__option', {
          'profile__header__link': screenWidth <= 950,
        })}
        onClick={() => setSelectedField(UserServerActions.ChangePassword)}
      >
        {screenWidth > 730 ? 'Change Password' : 'Password'}
      </button>

      <button
        className={classNames('profile__option', {
          'profile__header__link': screenWidth <= 950,
        })}
        onClick={() => setSelectedField(UserServerActions.Support)}
      >
        Support
      </button>

      <Link
        to="/cart"
        className={classNames('profile__option', {
          'profile__header__link': screenWidth <= 950,
        })}
      >
        Cart
      </Link>
    </div>
  ), [screenWidth])

  return (
    <div className="profile">
      {isModalOpen && (
        <div className="page__modal">
          <div>
            <div className="profile__confirm--close">
              <button onClick={handleCloseConfirm} className="page__close" />
            </div>

            <div className="profile__confirm">
              <h3 className="profile__confirm__title">
                Are you sure you want to delete the account?
              </h3>

              <div className="profile__confirm__buttons">
                <button onClick={handleDelete} className="profile__confirm__button">
                  Yes
                </button>

                <button onClick={handleCloseConfirm} className="profile__confirm__button">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <header className="profile__header">
        {screenWidth <= 950 && nav}

        <div className="profile__link-container">
          <Link className="profile__header__link" to="/">
            Home
          </Link>
          <button className="profile__header__link" onClick={handleSignOut}>
            LogOut
          </button>
        </div>
      </header>

      <div className="profile__back">
        <BackButton />

        <div>
          <button className="profile__delete" onClick={handleOpenConfirm}>
            Delete Account
          </button>
        </div>
      </div>

      <main className="profile__main">
        <div className="profile__main__left">
          <div className="profile__info">
            <div className="profile__image__container">
              <img
                className="profile__image"
                src="./img/businessman.png"
                alt=""
              />
            </div>

            <h2 className="profile__full-name">
              {auth.user
                ? auth.user?.name + ' ' + auth.user?.surname
                : 'Unknown'}
            </h2>
          </div>

          {screenWidth > 950 && nav}
        </div>

        <div className="profile__main__right">
          {selectedField === UserServerActions.About && (
            <div className="profile__about">
              <h2 className="profile__title">About</h2>

              <div className="profile__about__inputs">
                <label className="page__label profile__label">
                  Name
                  <input
                    className="page__input"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChangeInfo}
                  />
                </label>

                <label className="page__label profile__label">
                  Surname
                  <input
                    className="page__input"
                    name="surname"
                    value={userInfo.surname}
                    onChange={handleChangeInfo}
                  />
                </label>

                <label className="page__label profile__label">
                  Email
                  <input
                    className="page__input page__input--disabled"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChangeInfo}
                    disabled
                  />
                </label>
              </div>
            </div>
          )}

          {selectedField === UserServerActions.ChangePassword && (
            <div>
              <h2 className="profile__title">
                Change Password
              </h2>

              <label className="page__label profile__label">
                Old Password
                <input
                  className="page__input"
                  name="oldPassword"
                  type="password"
                  value={changePassword.oldPassword}
                  onChange={handleChangePassword}
                />
              </label>

              <label className="page__label profile__label">
                New Password
                <input
                  className="page__input"
                  name="newPassword"
                  type="password"
                  value={changePassword.newPassword}
                  onChange={handleChangePassword}
                />
              </label>
            </div>
          )}

          {selectedField === UserServerActions.Support && (
            <div className="profile__support">
              <h2 className="profile__title">
                Support
              </h2>

              <textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                className="profile__message"
                name="message"
                cols={30}
                rows={20}
                placeholder="Message"
              />
            </div>
          )}

          <h2 className="profile__message--server">{messageFromServer}</h2>

          <div className="profile__button__container">
            <button
              type="submit"
              className="page__button profile__button"
              onClick={handleSubmit}
            >
              {selectedField === UserServerActions.About && 'Change Data'}
              {selectedField === UserServerActions.ChangePassword && 'Change Password'}
              {selectedField === UserServerActions.Support && 'Submit'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
