import axios from "axios";

const instance = axios.create({
    baseURL: 'http://ploshadmin.ourappdemo.com:4600/api/',
    timeout: 5000, 
});
export default instance



