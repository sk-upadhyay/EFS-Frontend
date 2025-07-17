import { toast } from 'react-toastify';



export const notifySuccess = (message, options = {}) => {
  toast.success(message, {
    ...options,
    className: 'bg-green-500 text-white',
  });
};


export const notifyError = (message, options = {}) => {
  toast.error(message, {
    ...options,
    className: 'bg-red-500 text-white',
  });
};


export default toast;
