import axios from 'axios';

import { env } from '../../config/env';

const { API_URL } = env;

export const httpClient = axios.create({
  baseURL: API_URL,
});
