import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { showMessage } from './show-message';

const Toast = (props: ToastContainerProps) => {
  return <ToastContainer {...props} />;
};

export { Toast, showMessage };
