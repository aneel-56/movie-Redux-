import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast example
toast("Password Changed Failed", {
  position: "bottom-left", // top-left top-right top-center bottom-left bottom-right bottom-center
  draggable: false,
  hideProgressBar: false,
  autoClose: 5000, // time to close the toast
  theme: "dark", // colored, light,
  icon: true, // false or icon: "👍",
  transition: Slide,
  limit: 2,
  newestOnTop: true, //false
  closeOnClick: true, //false
  rtl: true, // default is true
  className: "toast-example",
  // style: {
  //   ".toastify-progress-bar": {
  //     background: "red",
  //   },
  //   width: "350px",
  //   background: "white",
  //   height: "50px",
  //   color: "red",
  //   bottom: "2rem",
  // },
});

export const toastSuccess = {
  position: "top-right", // top-left top-right top-center bottom-left bottom-right bottom-center
  draggable: false,
  hideProgressBar: false,
  autoClose: 5000, // time to close the toast
  theme: "dark", // colored, light,
  icon: true, // false or icon: "👍",
  transition: Slide,
  limit: 2,
  className: "toast-example",
  // style: {
  //     ".toastifyProgressBar": {
  //     background: "red",
  //     },
  //     width: "350px",
  //     background: "white",
  //     height: "50px",
  //     color: "green",
  //     top: "2rem",
  //     left: "2rem",
  //     zIndex: "5"
  // }
};

export const toastFailure = {
  position: "bottom-left", // top-left top-right top-center bottom-left bottom-right bottom-center
  draggable: false,
  hideProgressBar: false,
  autoClose: 5000, // time to close the toast
  theme: "dark", // colored, light,
  icon: true, // false or icon: "👍",
  transition: Slide,
  limit: 2,
  className: "toast-example",
  // style: {
  //   ".toastifyProgressBar": {
  //     background: "red",
  //   },
  //   width: "350px",
  //   background: "white",
  //   height: "50px",
  //   color: "red",
  //   left: "2rem",
  // },
};
