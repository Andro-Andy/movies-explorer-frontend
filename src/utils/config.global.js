
export const SCREEN = {
  desktop: {
    type: 'desktop',
    width: 1100,
    render: 12,
    more: 3,
  },
  tablet: {
    type: 'tablet',
    width: 680,
    render: 8,
    more: 2,
  },
  mobile: {
    type: 'mobile',
    width: 500,
    render: 5,
    more: 2,
  },
};



export const INITIAL_REQUEST_STATUS = {
  isLoading: false,
  isError: false,
  message: '',
};

export const REGEXP_EMAIL = /^((([0-9A-Za-z][-0-9A-z.]+[0-9A-Za-z])|([0-9А-Яа-я][-0-9А-я.]+[0-9А-Яа-я]))@([-A-Za-z]+\.){1,2}[-A-Za-z]{2,})$/u;
export const REGEXP_FILTER = /[!@#$()«»%^&{}:;-_,."`']/g;

export const SUCCESS_MESSAGES = {
  register: 'Регистрация завершена!',
  profileUpdate: 'Данные успешно изменены!',
};
