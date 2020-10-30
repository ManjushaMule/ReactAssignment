import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://mm-project-500dc.firebaseio.com/'
});

export default instance;