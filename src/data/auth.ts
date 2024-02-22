/* eslint-disable no-useless-escape */
import { AuthEnum } from 'enums/AuthEnum';
import { Auth } from 'types/Auth';

export const emailPattern = '^[a-zA-Z0-9]+@[a-z]+\\.[a-z]{2,}$';

export const auth: Auth[] = [
  {
    id: 1,
    title: 'Sign Up',
    endpoint: 'signup',
    type: AuthEnum.SignUp,
    fields: [
      {
        id: 'name',
        name: 'name',
        type: 'text',
        text: 'Name',
        error: 'Must be at least 2 characters',
        pattern: '[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]{2,16}$',
      },
      {
        id: 'surname',
        name: 'surname',
        type: 'text',
        text: 'Surname',
        error: 'Must be at least 2 characters',
        pattern: '[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]{2,16}$',
      },
      {
        id: 'email',
        name: 'email',
        type: 'email',
        text: 'Email',
        error: 'Invalid email',
        pattern: '^[a-zA-Z0-9]+@[a-z]+\\.[a-z]{2,}$',
      },
      {
        id: 'password',
        name: 'password',
        type: 'password' || 'text',
        text: 'Password',
        error: 'Must be at least 3 characters and contain only letters and numbers',
        pattern: '^[a-zA-Z0-9]{3,}$'
      },
    ]
  },
  {
    id: 2,
    title: 'Log In',
    endpoint: 'signin',
    type: AuthEnum.LogIn,
    fields: [
      {
        id: 'email',
        name: 'email',
        type: 'email',
        text: 'Email',
        error: 'Invalid email',
        pattern: '^[a-zA-Z0-9]+@[a-z]+\\.[a-z]{2,}$',
      },
      {
        id: 'password',
        name: 'password',
        type: 'password' || 'text',
        text: 'Password',
        error: 'Must be at least 3 characters and contain only letters and numbers',
        pattern: '^[a-zA-Z0-9]{3,}$'
      },
    ]
  }
]