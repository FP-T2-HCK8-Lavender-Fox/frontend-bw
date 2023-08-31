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
            ? "card my-2 sm:w-11/12 h-full bg-base-100 shadow-lg mx-2 hover:scale-105 ease-in duration-200 overflow-hidden"
            : "card my-2 sm:w-11/12 h-full bg-base-100 shadow-lg mx-2 hover:scale-105 ease-in duration-200 overflow-hidden"
        }
      >
        <figure>
          <Link to={`/events/` + event.id}>
            <img src={event.pics} alt="Shoes" className="min-w-max max-h-52" />
          </Link>
        </figure>
        <div className="card-body w-full pt-2 h-10 hover:h-full transition-all">
          <div className="flex leading-4 ">
            <h2 className="card-title">{event.name}</h2>
            <p className="m-1 badge badge-neutral">{event.Category.name}</p>
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
                <span className="label-text mr-1">Active</span>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={event.active}
                  onChange={patchStatus}
                />
              </label>
            </div>
            <div>
              <Link to={"/detail/" + event.id} >
                <button
                  className="my-2 btn btn-primary btn-sm lg:btn-md"
                  value="next"
                >
                  Edit
                </button>
              </Link>
              {/* <button
                className="my-2 btn btn-primary btn-sm lg:btn-md"
                onClick={() => setEventModal(true)}
              >
                Edit
              </button> */}
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
