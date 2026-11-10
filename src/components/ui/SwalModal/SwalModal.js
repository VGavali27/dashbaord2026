import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./swal.css";

const MySwal = withReactContent(Swal);

const popupClass =
  "w-[360px] rounded-xl bg-paper dark:bg-g-850 text-g-900 dark:text-g-100 p-5 border border-g-200 dark:border-white/10 shadow-lg dark:shadow-none font-sans";
const titleClass = "text-lg font-medium text-g-900 dark:text-g-100";
const textClass = "text-sm text-g-600 dark:text-g-400 pt-1";

const SwalModal = async (options = {}) => {
  const { confirmButtonClass = "", cancelButtonClass = "", ...rest } =
    options;

  return await MySwal.fire({
    icon: "warning",

    showCancelButton: true,
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",

    buttonsStyling: false,

    customClass: {
      popup: popupClass,
      title: titleClass,
      htmlContainer: textClass,
      actions: "flex gap-2 mt-5",
      confirmButton:
        confirmButtonClass ||
        "bg-g-900 hover:bg-g-800 text-white dark:bg-g-50 dark:hover:bg-paper dark:text-g-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
      cancelButton:
        cancelButtonClass ||
        "bg-paper hover:bg-g-100 text-g-700 dark:bg-g-850 dark:hover:bg-g-800 dark:text-g-300 border border-g-200 dark:border-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
      icon: "scale-90",
    },
    backdrop: "rgba(15,15,16,0.6)",
    ...rest,
  });
};

SwalModal.showLoading = (title = "Please wait...", text = "Loading...") => {
  MySwal.fire({
    title,
    text,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    showCancelButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
    customClass: {
      popup: popupClass,
      title: titleClass,
      htmlContainer: textClass,
    },
    backdrop: "rgba(15,15,16,0.6)",
  });
};

SwalModal.close = () => {
  Swal.close();
};

export default SwalModal;
