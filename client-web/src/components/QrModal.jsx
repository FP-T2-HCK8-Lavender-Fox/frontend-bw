import PropTypes from "prop-types";

export default function Modal({ visible, onClose, qr }) {
  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  if (!visible) return null;
  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="card bg-neutral w-96">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <div className="card-body text-black">
          <img src={qr} alt="qrcode" />
          <div className="card-actions justify-center">
            <button
              onClick={onClose}
              className="btn btn-primary btn-xs sm:btn-sm md:btn-md w-1/3"
            >
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  qr: PropTypes.string,
};
