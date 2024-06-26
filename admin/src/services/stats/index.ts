
import {api} from '../api';

export const getStats = async () => await api.get('/dashboard');

