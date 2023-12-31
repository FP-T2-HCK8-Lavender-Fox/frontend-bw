import PropTypes from "prop-types";

export default function Toast({ msg }) {
  return (
    <div className="toast toast-top toast-end z-50">
      <div className="alert alert-info m-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{msg}</span>
      </div>
    </div>
  );
}

Toast.propTypes = {
  msg: PropTypes.string,
};
