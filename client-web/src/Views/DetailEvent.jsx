import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchEventById } from "../store/eventReducer";
import {
  fetchCheckpointsByEventId,
  generateQR,
} from "../store/checkpointReducer";
import {
  fetchLeaderboards,
  postLeaderboard,
} from "../store/leaderboardsReducer";
import { useParams } from "react-router-dom";
import QrModal from "../components/QrModal";
import moment from "moment";
import { Plus } from "lucide-react";

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

  const { leaderboards, leaderboardLoading } = useSelector(
    (state) => state.leaderboard
  );
  const [qrModal, setQrModal] = useState(false);
  const handleOnClose = () => setQrModal(false);

  const handleOnOpen = async () => {
    await dispatch(generateQR(checkpoints));
    setQrModal(true);
  };

  const handleCreateLeaderboard = async () => {
    let data = [];
    for (let i = 0; i < 3; i++) {
      if (dataUsers[i]) {
        const { UserId, EventId } = dataUsers[i];
        data.push({ UserId, EventId, position: Number(i) + 1 });
      }
    }
    await dispatch(postLeaderboard(data));
    await dispatch(fetchLeaderboards(id));
  };

  useEffect(() => {
    dispatch(fetchEventById(id));
    dispatch(fetchCheckpointsByEventId(id));
    dispatch(fetchLeaderboards(id));
  }, []);

  return (
    <>
      {loading && (
        <div className="mt-72 ml-96 pl-48 min-h-screen ">
          <span className="  loading loading-spinner w-28 text-neutral"></span>
        </div>
      )}
      {!loading && error ? <div>Error: {error}</div> : null}
      {!loading && dataEvent ? (
        <div className="border mt-14 mb-20 shadow-2xl w-screen rounded-2xl h-full overflow-y-auto">
          <div className="w-11/12">
            <div className="hero-content flex-col lg:flex-row w-full">
              <img
                src={dataEvent.pics}
                className="max-w-sm rounded-lg shadow-md bg-neutral"
              />
              <div>
                <h1 className="text-5xl font-bold">
                  {dataEvent.name.toUpperCase()}
                </h1>
                <p>by {dataEvent.Admin.username}</p>
                <p className="my-1 badge badge-neutral">
                  {dataEvent.Category.name}
                </p>
                <div className="flex pt-6 justify-around">
                  <div>
                    <p className="my-1 badge badge-neutral font-bold shadow-xl">
                      Prize pool:{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(dataEvent.amount)}
                    </p>
                    <p className="text-left">Address: {dataEvent.address}</p>
                  </div>
                  <div className="whitespace-nowrap flex-col flex">
                    <p className="my-1 badge badge-neutral font-bold shadow-xl">
                      Start : {moment(dataEvent.startDate).format("LLLL")}
                    </p>
                    <p className="my-1 badge badge-neutral font-bold shadow-xl">
                      End : {moment(dataEvent.endDate).format("LLLL")}
                    </p>
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
            <div className="hero">
              <div className="hero-content flex-col">
                <p>Participant List</p>
                <div>
                  {dataUsers.map((el) => {
                    return (
                      <div key={el.UserId} className="avatar placeholder m-1">
                        <div className="bg-neutral text-neutral-content rounded-full w-12">
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
            <div className=" flex flex-col lg:flex-row w-full mb-36">
              <div className="grid flex-grow h-48 card items-center m-10 p-10">
                <div className="flex flex-row justify-between mb-2 leading-4">
                  <h2 className="text-bold text-2xl font-mono">Leaderboards</h2>
                  {leaderboards.length ? null : (
                    <div
                      className="tooltip float-right tooltip-right"
                      data-tip="Create Leaderboards"
                    >
                      <button
                        className="btn btn-primary btn-sm btn-circle"
                        onClick={handleCreateLeaderboard}
                      >
                        <Plus />
                      </button>
                    </div>
                  )}
                </div>
                <table className="table rounded-full">
                  <thead>
                    <tr className="font-mono text-black font-bold text-2xl bg-neutral">
                      <th>User</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody className="bg-yellow-300">
                    {leaderboards.length ? (
                      leaderboardLoading ? (
                        <span className="  loading loading-spinner w-28 text-neutral"></span>
                      ) : (
                        leaderboards.map((el, i) => {
                          return (
                            <tr
                              key={dataUsers[i].UserId}
                              className="font-mono text-black font-bold text-lg"
                            >
                              <td>{dataUsers[i].User.name}</td>
                              <td>{dataUsers[i].point}</td>
                            </tr>
                          );
                        })
                      )
                    ) : null}
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
                    <h2 className="text-bold text-2xl font-mono">
                      Checkpoints
                    </h2>
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
          </div>
        </div>
      ) : null}
    </>
  );
}
