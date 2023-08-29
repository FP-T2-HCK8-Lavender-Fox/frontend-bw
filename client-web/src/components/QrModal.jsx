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
      <div className="overflow-y-auto h-5/6 rounded-2xl">
        <div className="hero-content bg-neutral lg:max-w-full rounded-2xl">
          <div className="card bg-neutral">
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <div className="card-body text-black">
              <div className="flex flex-col lg:flex-row justify-center text-center">
                <div className="justify-center mx-10">
                  <h2>Checkpoint 1</h2>
                  <img src={qr[0]} alt="qrcode" />
                </div>
                <div className="justify-center mx-10">
                  <h2>Checkpoint 2</h2>
                  <img src={qr[1]} alt="qrcode" />
                </div>
                <div className="justify-center mx-10">
                  <h2>Checkpoint 3</h2>
                  <img src={qr[2]} alt="qrcode" />
                </div>
              </div>
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
      </div>
    </div>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  qr: PropTypes.array,
};
