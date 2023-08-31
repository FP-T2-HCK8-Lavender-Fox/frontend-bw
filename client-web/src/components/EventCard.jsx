import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import EventForm from "../components/EventForm";
import {
  fetchEvents,
  deleteEventById,
  setMsgEvent,
  patchStatusEventById,
} from "../store/eventReducer";
import moment from "moment";

export default function EventCard({ event }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteEventById(event.id));
    await dispatch(fetchEvents());
    setTimeout(() => {
      dispatch(setMsgEvent(""));
    }, 2000);
  };

  const [eventModal, setEventModal] = useState(false);
  const handleOnCloseEvent = () => setEventModal(false);

  const patchStatus = async () => {
    if (event.active) {
      await dispatch(patchStatusEventById({ id: event.id, status: false }));
    } else await dispatch(patchStatusEventById({ id: event.id, status: true }));
    await dispatch(fetchEvents());
    setTimeout(() => {
      dispatch(setMsgEvent(""));
    }, 2000);
  };

  return (
    <>
      <div
        className={
          event.active
            ? "z-20 card group m-4 bg-neutral shadow-lg hover:scale-105 ease-in duration-200 self-start"
            : "z-20 card group m-4 bg-gray-400 shadow-lg hover:scale-105 ease-in duration-200 self-start"
        }
      >
        <figure>
          <Link to={`/events/` + event.id}>
            <img
              src={event.pics}
              alt="Shoes"
              className="z-40 h-40 group-hover:h-72 group-hover:w-full ease-in duration-300 overflow-visible"
            />
          </Link>
        </figure>
        <div className="card-body pt-2 h-10 hover:h-full ease-out duration-500 overflow-hidden">
          <div className="flex leading-4 ">
            <h2 className="card-title">{event.name}</h2>
            <p className="m-1 badge badge-white">{event.Category.name}</p>
          </div>
          <p>
            Prize pool:{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(event.amount)}
          </p>
          <p>Start : {moment(event.startDate).format("LLLL")}</p>
          <p>End : {moment(event.endDate).format("LLLL")}</p>
          <div className="card-actions justify-between">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-1">
                  {event.active ? "Active" : "Inactive"}
                </span>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={event.active}
                  onChange={patchStatus}
                />
              </label>
            </div>
            <div>
              <Link to={"/detail/" + event.id}>
                <button
                  className="mx-2 btn btn-primary btn-sm lg:btn-md"
                  value="next"
                >
                  Edit
                </button>
              </Link>
              <button className="btn btn-primary" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <EventForm
        visible={eventModal}
        onClose={handleOnCloseEvent}
        event={event}
      />
    </>
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
};
