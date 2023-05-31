const url = /^https?:\/\/\S{2,}\.[a-z]{2,3}\S*/;
const BASE_PATH_DEV = 'mongodb://127.0.0.1:27017/test_bitfilmsdb';
const JWT_SECRET_DEV = 'secret-key';

const FIELD_REQUIRE = 'это поле обязательно';
const FIELD_URL = 'должна быть ссылка';
const FIELD_EMAIL = 'должен быть email';
const FIELD_MIN_2 = 'должно быть не менее 2 символов';
const FIELD_MIN_6 = 'должно быть не менее 6 символов';
const FIELD_MAX_30 = 'должно быть не более 30 символов';

module.exports = {
  url,
  BASE_PATH_DEV,
  JWT_SECRET_DEV,
  FIELD_REQUIRE,
  FIELD_URL,
  FIELD_EMAIL,
  FIELD_MIN_2,
  FIELD_MIN_6,
  FIELD_MAX_30,
};
