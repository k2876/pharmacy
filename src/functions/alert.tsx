import Notiflix from "notiflix";

const alert = {
  success(text: string) {
    Notiflix.Notify.success(text);
  },
  error(text: string) {
    Notiflix.Notify.failure(text);
  },
  warn(text: string) {
    Notiflix.Notify.warning(text);
  },
  info(text: string) {
    Notiflix.Notify.info(text);
  },
};

export default alert;
