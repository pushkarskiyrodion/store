/* eslint-disable no-useless-escape */
export const delivery = [
  {
    id: 1,
    name: 'firstName',
    type: 'text',
    label: 'Name',
    disabled: true,
    errorLabel: 'This field must be at least 2 characters',
    pattern: '[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]{2,16}$',
    isValid: true,
  },
  {
    id: 2,
    name: 'lastName',
    type: 'text',
    label: 'Surname',
    disabled: true,
    errorLabel: 'This field must be at least 2 characters',
    pattern: '[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]{2,16}$',
    isValid: true,
  },
  {
    id: 3,
    name: 'email',
    type: 'email',
    label: 'Email',
    disabled: true,
    errorLabel: 'This field is required',
    pattern: '^[a-zA-Z0-9\.]+@[a-z]+\.+[a-z]{2,}$',
    isValid: true,
  },
  {
    id: 4,
    name: 'city',
    type: 'text',
    label: 'City',
    disabled: false,
    errorLabel: 'This field is required',
    pattern: '[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]',
    isValid: true,
  },
  {
    id: 5,
    name: 'address',
    type: 'text',
    label: 'Address',
    disabled: false,
    errorLabel: 'This field is required',
    pattern: '[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]',
    isValid: true,
  },
  {
    id: 6,
    name: 'phone',
    type: 'number',
    label: 'Phone',
    disabled: false,
    errorLabel: 'This field must be at least 12 characters',
    pattern: '.{19}$',
    isValid: true,
  }
]