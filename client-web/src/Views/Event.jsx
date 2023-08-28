import { useEffect, useState } from "react";
import EventRow from "../components/EventRow";
import EventForm from "../components/EventForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../store/eventReducer";

export default function Movie() {
  const dispatch = useDispatch();
  const { events, loading, error, msg } = useSelector((state) => state.event);

  const [eventModal, setEventModal] = useState(false);
  const handleOnClose = () => setEventModal(false);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <>
      {msg && (
        <div className="toast toast-top toast-end">
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
      )}
      <div className="hero bg-base-100 overflow-y-auto">
        <div className="hero-content">
          <div>
            <div className="hero-content justify-between">
              <h1 className="font-mono font-bold text-4xl">Events</h1>
              <button
                className="btn btn-primary btn-md"
                onClick={() => setEventModal(true)}
              >
                add Event
              </button>
            </div>
            <div className="overflow-x-auto">
              {loading && (
                <span className="loading loading-spinner text-neutral"></span>
              )}
              {!loading && error ? <div>Error: {error}</div> : null}
              {!loading && events.length ? (
                <table className="table bg-neutral">
                  <thead>
                    <tr className="font-mono text-black font-bold text-2xl">
                      <th>Name</th>
                      <th>Picture</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Address</th>
                      <th>Created by</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => {
                      return <EventRow key={event.id} event={event} />;
                    })}
                  </tbody>
                </table>
              ) : null}
            </div>
          </div>
        </div>
        <EventForm visible={eventModal} onClose={handleOnClose} />
      </div>
    </>
  );
}
