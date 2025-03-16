import axios from 'axios';

import { env } from '../../config/env';

const { apiURL } = env;

export const httpClient = axios.create({
  baseURL: apiURL,
});
