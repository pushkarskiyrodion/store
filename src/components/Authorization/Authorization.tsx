import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks/redux';
import classNames from 'classnames';

import './Auth.scss';

import { EyeIcon } from 'components/Icons/EyeIcon';
import { EyeOffIcon } from 'components/Icons/EyeOffIcon';
import * as authActions from 'features/authReducer';
import { wait } from 'helpers/wait';
import { Auth } from 'types/Auth';
import { auth as authData } from 'data/auth';
import { AuthEnum } from 'enums/AuthEnum';

type Props = {
  navigateTo: string,
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
};

interface AuthErrors {
  name?: boolean,
  surname?: boolean,
  email: boolean,
  password: boolean,
}

export const Authorization: React.FC<Props> = ({ toggle, navigateTo }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [authForms] = useState<Auth[]>(authData);
  const [activeForm, setActiveForm] = useState<AuthEnum>(AuthEnum.LogIn);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedForm, setSelectedForm] = useState<Auth[] | null>(null);
  const [inputType, setInputType] = useState<'password' | 'text'>('password');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [formData, setFormData] = useState<authActions.IAuthFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<AuthErrors>({
    email: false,
    password: false,
  });

  useEffect(() => {
    document.body.classList.add('page__modal--open');
  }, []);

  useEffect(() => {
    if (!isFirstOpen) {
      setIsLoading(true)
      wait(400).then(() =>  setIsLoading(false))
    }

    setIsSubmitted(false);
    setErrorMessage('');
    const form = authForms.find(form => form.type === activeForm);
    setSelectedForm(form ? [form] : null);

    if (activeForm === AuthEnum.SignUp) {
      setFormData({
        email: '',
        password: '',
        name: '',
        surname: '',
      })

      setErrors({
        name: false,
        surname: false,
        email: false,
        password: false,
      })
    } else {
      setFormData({
        email: '',
        password: '',
      })

      setErrors({
        email: false,
        password: false,
      })
    }
  }, [activeForm])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    const { name, value } = e.target;

    setFormData((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
  }

  const handleChangeForm = (form: AuthEnum) => {
    setIsFirstOpen(false);
    setActiveForm(form);
  }

  const onClose = () => {
    document.body.classList.remove('page__modal--open');
    toggle(false);
  };

  const showPassword = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>, endpoint: string) => {
    e.preventDefault()
    setIsSubmitted(true);

    const inputs = e.currentTarget.querySelectorAll<HTMLInputElement>('.auth__form__input');

    const isValid = [...inputs].every(({ name, pattern }) => {
      const regex = new RegExp(pattern);
      const value = formData[name as keyof authActions.IAuthFormData];

      if (!value) {
        setErrorMessage('Fields cannot be empty');
        return false;
      }

      if (!regex.test(value)) {
        setErrorMessage('Invalid pattern')
        return false;
      }

      return true;
    })

    if (!isValid) {
      return;
    }

    setIsWaiting(true);

    dispatch(authActions.authorize({ endpoint, formData }))
      .unwrap()
      .then((result) => {
        setIsWaiting(false);
        document.body.classList.remove('page__modal--open');
        
        if (isChecked) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
        }

        toggle(false)
        navigate(navigateTo);
      })
      .catch((err) => {
        setErrorMessage(err)
      });

    return;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value, name, pattern } = e.currentTarget;
    const regexp = new RegExp(pattern);

    if (!regexp.test(value)) {
      setErrors(current => ({
        ...current,
        [name]: true,
      }))
    }
  }

  return (
    <div className="auth">
      <div className="auth__wrapper">
        <div className="auth__container">
          <div className="auth__container--close">
            <button onClick={onClose} className="page__close" />
          </div>

          <div className="auth__main">
            <header className="auth__header">
              <button
                className={classNames('auth__header__button', {
                  'auth--active': activeForm === AuthEnum.LogIn,
                })}
                onClick={() => handleChangeForm(AuthEnum.LogIn)}
              >
                {AuthEnum.LogIn}
              </button>

              <button
                className={classNames('auth__header__button', {
                  'auth--active': activeForm === AuthEnum.SignUp,
                })}
                onClick={() => handleChangeForm(AuthEnum.SignUp)}
              >
                {AuthEnum.SignUp}
              </button>
            </header>

            {selectedForm && selectedForm.map(({ id, endpoint, type, title, fields }) => (
              <div
                key={id}
                className={classNames('auth__container--form', {
                  'auth--hidden': activeForm !== type,
                  'auth--sign-up': activeForm === AuthEnum.SignUp && !isFirstOpen,
                  'auth--log-in': activeForm === AuthEnum.LogIn && !isFirstOpen,
                })}
              >
                {isLoading && (
                  <div className="auth__loader__wrapper">
                    <img className="auth__loader" src="./img/loader-auth.svg" alt="" />
                  </div>
                )}

                {!isLoading && (
                  <form
                    className="auth__form"
                    onSubmit={(e) => onSubmit(e, endpoint)}
                  >
                    {fields.map(({ id, name, type, text, error, pattern }) => {
                      const regex = new RegExp(pattern, 'g');
                      const inputValue = formData[name as keyof authActions.IAuthFormData] || '';
                      const isError = errors[name as keyof AuthErrors] || '';
                      const condition = !regex.test(inputValue) && (isError || isSubmitted);

                      if (name === 'password') {
                        return (
                          <div key={id} className="auth__form__label">
                            <label
                              className={classNames('auth__form__label', {
                                'auth__form__label--error': condition,
                              })}
                              htmlFor={id}
                            >
                              {condition ? error : text}
                            </label>

                            <div className={classNames('auth__container--input', {
                              'auth__form__input--error': condition,
                            })}
                            >
                              <input
                                id={id}
                                name={name}
                                className="auth__form__input"
                                type={inputType}
                                pattern={pattern}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
          
                              <button
                                type="button"
                                className={classNames('auth__show-password', {
                                  'auth__show-password--error': condition,
                                })}
                                onClick={showPassword}
                              >
                                {inputType === 'text' ? <EyeIcon /> : <EyeOffIcon />}
                              </button>
                            </div>
                          </div>
                        )
                      }

                      return (
                        <div key={id}>
                          <label
                            className={classNames('auth__form__label', {
                              'auth__form__label--error': condition,
                            })}
                            htmlFor={id}
                          >
                            {condition ? error : text}
                          </label>

                          <div className="auth__container--input">
                            <input
                              id={id}
                              name={name}
                              className={classNames('auth__form__input', {
                                'auth__form__input--error': condition,
                              })}
                              type={type}
                              pattern={pattern}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                      )
                    })}

                    <div className="auth__info">
                      <p className="auth__error">
                        {errorMessage}
                      </p>
    
                      <label className="auth__form__label--checkbox">
                        <input
                          className="auth__form__checkbox"
                          checked={isChecked}
                          onChange={handleCheck}
                          type="checkbox"
                        />
                        Remember me
                      </label>
                    </div>
    
                    <button className="auth__form__submit" type="submit">
                      {!isWaiting ? title : (
                        <img className="auth__loader auth__loader--button" src="./img/loader-auth.svg" alt="" />
                      )}
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
