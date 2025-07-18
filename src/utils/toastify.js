import { toast } from 'react-toastify';



export const notifySuccess = (message, options = {}) => {
  toast.success(message, {
    ...options,
    autoClose:1000,
    className: 'bg-green-500 text-white',
  });
};


export const notifyError = (message, options = {}) => {
  toast.error(message, {
    ...options,
    autoClose:2000,
    className: 'bg-red-500 text-white',
  });
};


export default toast;
