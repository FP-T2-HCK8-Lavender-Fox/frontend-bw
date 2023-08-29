import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById } from "../store/eventReducer";
import {
  fetchCheckpointsByEventId,
  generateQR,
} from "../store/checkpointReducer";
import { useParams } from "react-router-dom";
import QrModal from "../components/QrModal";
import moment from "moment";

export default function Admin() {
  const dispatch = useDispatch();
  let { id } = useParams();

  const {
    event: { dataEvent, dataUsers },
    loading,
    error,
  } = useSelector((state) => state.event);
  const { checkpoints, qr, checkpointLoading, checkpointError } = useSelector(
    (state) => state.checkpoint
  );
  const [qrModal, setQrModal] = useState(false);
  const handleOnClose = () => setQrModal(false);

  const handleOnOpen = async () => {
    await dispatch(generateQR(checkpoints));
    setQrModal(true);
  };
  console.log(dataEvent);

  useEffect(() => {
    dispatch(fetchEventById(id));
    dispatch(fetchCheckpointsByEventId(id));
  }, []);

  return (
    <>
      {loading && (
        <span className="loading loading-spinner text-neutral"></span>
      )}
      {!loading && error ? <div>Error: {error}</div> : null}
      {!loading && dataEvent ? (
        <>
          <div className="hero bg-base-100 h-screen">
            <div className="hero-content flex-col lg:flex-row">
              <img
                src={dataEvent.pics}
                className="max-w-sm rounded-lg shadow-2xl bg-neutral"
              />
              <div>
                <h1 className="text-5xl font-bold">
                  {dataEvent.name.toUpperCase()}
                </h1>
                <p>by {dataEvent.Admin.username}</p>
                <p className="my-1 badge badge-neutral">{dataEvent.Category.name}</p>
                <div className="flex pt-6 justify-around">
                  <div>
                    <p>
                      Prize pool:{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(dataEvent.amount)}
                    </p>
                    <p className="text-left">Address: {dataEvent.address}</p>
                  </div>
                  <div>
                    <p>Start : {moment(dataEvent.startDate).format("LLLL")}</p>
                    <p>End : {moment(dataEvent.endDate).format("LLLL")}</p>
                  </div>
                </div>
                <p className="py-2 text-left">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
                  labore, id facere ut veniam tempora impedit inventore? Maiores
                  magni reprehenderit consectetur quia veritatis ab facere ipsa
                  doloremque aliquid tempora dolore deserunt laboriosam, quis
                  unde totam? Et commodi obcaecati veniam sunt quod iste velit
                  ducimus. Magni quaerat distinctio fugiat perspiciatis
                  voluptatum.
                </p>
              </div>
            </div>
          </div>
          <div className="hero">
            <div className="hero-content flex-col">
              <p>Participant List</p>
              <div>
                {dataUsers.map((el) => {
                  return (
                    <div key={el.id} className="avatar placeholder m-1">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                        <span>
                          {el.User.name
                            .match(/(^[a-z]|\s[a-z])/gi)
                            .join("")
                            .split(" ")
                            .join("")
                            .toUpperCase()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full min-h-screen">
            <div className="grid flex-grow h-48 card items-center m-10 p-10">
              <div className="flex flex-row justify-between mb-2">
                <h2 className="text-bold text-2xl font-mono">Leaderboards</h2>
              </div>
              <table className="table rounded-full">
                <thead>
                  <tr className="font-mono text-black font-bold text-2xl bg-neutral">
                    <th>User</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody className="bg-yellow-300">
                  {dataUsers.map((el) => {
                    return (
                      <tr
                        key={el.id}
                        className="font-mono text-black font-bold text-lg"
                      >
                        <td>{el.User.name}</td>
                        <td>{el.point}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {checkpointLoading && (
              <span className="loading loading-spinner text-neutral"></span>
            )}
            {!checkpointLoading && checkpointError ? (
              <div>Error: {error}</div>
            ) : null}
            {!checkpointLoading && Object.values(checkpoints).length > 1 ? (
              <div className="grid flex-grow h-48 card items-center m-10 p-10">
                <div className="flex flex-row justify-between mb-2">
                  <h2 className="text-bold text-2xl font-mono">Checkpoints</h2>
                  <button
                    className="btn btn-primary btn-sm lg:btn-sm w-1/4"
                    onClick={handleOnOpen}
                  >
                    Show Qr
                  </button>
                </div>
                <table className="table">
                  <thead>
                    <tr className="font-mono text-black font-bold text-2xl bg-neutral">
                      <th>Checkpoint</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                    </tr>
                  </thead>
                  <tbody className="bg-yellow-300">
                    {checkpoints.map((el) => {
                      return (
                        <tr
                          key={el.id}
                          className="font-mono text-black font-bold text-lg"
                        >
                          <td>{el.name}</td>
                          <td>{el.lat}</td>
                          <td>{el.long}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
          <QrModal visible={qrModal} onClose={handleOnClose} qr={qr} />
        </>
      ) : null}
    </>
  );
}
