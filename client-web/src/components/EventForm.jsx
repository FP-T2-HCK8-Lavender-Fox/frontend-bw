import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  fetchEvents,
  postEvent,
  editEventById,
  setMsgEvent,
} from "../store/eventReducer";
import { fetchCategories } from "../store/categoryReducer";

export default function EventForm({ visible, onClose, event }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.event);
  const { categories } = useSelector((state) => state.category);

  const [eventState, setEventState] = useState({
    name: "",
    startDate: "",
    endDate: "",
    active: true,
    description: "",
    amount: "",
    address: "",
    lat: "",
    long: "",
    CategoryId: 0,
    pics: "",
  });

  const [checkpointState, setCheckpointState] = useState({
    0: {
      name: "",
      lat: "",
      long: "",
      question: "",
      trueAnswer: "",
      wrongAnswerOne: "",
      wrongAnswerTwo: "",
    },
    1: {
      name: "",
      lat: "",
      long: "",
      question: "",
      trueAnswer: "",
      wrongAnswerOne: "",
      wrongAnswerTwo: "",
    },
    2: {
      name: "",
      lat: "",
      long: "",
      question: "",
      trueAnswer: "",
      wrongAnswerOne: "",
      wrongAnswerTwo: "",
    },
  });

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const onChangeInput = ({ target: { name, value, files } }) => {
    if (name === "pics") setEventState({ ...eventState, [name]: files[0] });
    else setEventState({ ...eventState, [name]: value });
    console.log(eventState);
  };

  const onChangeCheckpointInput = ({ target: { id, name, value } }) => {
    setCheckpointState({
      ...checkpointState,
      [id]: { ...checkpointState[id], [name]: value },
    });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    eventState.checkpoints = JSON.stringify(Object.values(checkpointState));
    await dispatch(postEvent(eventState));
    await dispatch(fetchEvents());
    setEventState({
      name: "",
      startDate: "",
      endDate: "",
      active: true,
      description: "",
      amount: "",
      address: "",
      lat: "",
      long: "",
      CategoryId: 0,
    });
    setCheckpointState({
      0: {
        name: "",
        lat: "",
        long: "",
        question: "",
        trueAnswer: "",
        wrongAnswerOne: "",
        wrongAnswerTwo: "",
      },
      1: {
        name: "",
        lat: "",
        long: "",
        question: "",
        trueAnswer: "",
        wrongAnswerOne: "",
        wrongAnswerTwo: "",
      },
      2: {
        name: "",
        lat: "",
        long: "",
        question: "",
        trueAnswer: "",
        wrongAnswerOne: "",
        wrongAnswerTwo: "",
      },
    });
    onClose();
    setTimeout(() => {
      dispatch(setMsgEvent(""));
    }, 2000);
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    await dispatch(editEventById(eventState));
    await dispatch(fetchEvents());
    setEventState({
      name: "",
      startDate: "",
      endDate: "",
      active: true,
      description: "",
      amount: "",
      address: "",
      lat: "",
      long: "",
      CategoryId: 0,
    });
    onClose();
    setTimeout(() => {
      dispatch(setMsgEvent(""));
    }, 2000);
  };

  useEffect(() => {
    if (event) setEventState(event);
    // console.log(new Date());
    // console.log(-new Date().getTimezoneOffset() / 60);
    // console.log(new Date().toJSON().toLocaleString());
    console.log(new Date().toJSON().split(/:\d\d\D\d\d\d/)[0]);
    console.log(event)
    dispatch(fetchCategories());
  }, [event, dispatch]);

  if (!visible) return null;
  return (
    <>
      <div
        id="container"
        onClick={handleOnClose}
        className={
          event
            ? "fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
            : "fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center"
        }
      >
        <div
          className={
            event ? "overflow-y-auto h-5/6" : "overflow-y-auto h-5/6 w-full"
          }
        >
          <div
            className={
              event
                ? "hero-content text-center bg-neutral"
                : "hero-content bg-neutral max-w-full"
            }
          >
            <div
              className={
                event
                  ? "card bg-neutral w-96"
                  : "card bg-neutral w-full justify-start"
              }
            >
              <button
                onClick={onClose}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <div className="card-body text-black lg:flex-row">
                <form>
                  <h1 className="card-title font-mono">Add Event</h1>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-black font-bold font-mono text-lg">
                        Name
                      </span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={eventState.name}
                      onChange={onChangeInput}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-black font-bold font-mono text-lg">
                        Start Date
                      </span>
                    </label>
                    <input
                      id="startDate"
                      type="datetime-local"
                      name="startDate"
                      min={new Date().toJSON()}
                      value={eventState.startDate}
                      onChange={onChangeInput}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-black font-bold font-mono text-lg">
                        End Date
                      </span>
                    </label>
                    <input
                      id="endDate"
                      type="datetime-local"
                      name="endDate"
                      min={new Date().toJSON()}
                      value={eventState.endDate}
                      onChange={onChangeInput}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-black font-bold font-mono text-lg">
                        Category
                      </span>
                    </label>
                    <select
                      id="CategoryId"
                      name="CategoryId"
                      value={eventState.CategoryId}
                      onChange={onChangeInput}
                      className="select select-bordered"
                    >
                      <option selected>--- Select ---</option>
                      {categories.map((el) => {
                        return (
                          <option key={el.id} value={el.id}>
                            {el.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-black font-bold font-mono text-lg">
                        Description
                      </span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      placeholder="Description"
                      name="description"
                      value={eventState.description}
                      id="description"
                      onChange={onChangeInput}
                    ></textarea>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-black font-bold font-mono text-lg">
                        Amount
                      </span>
                    </label>
                    <input
                      id="amount"
                      type="number"
                      name="amount"
                      value={eventState.amount}
                      onChange={onChangeInput}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-black font-bold font-mono text-lg">
                        address
                      </span>
                    </label>
                    <input
                      id="address"
                      type="text"
                      name="address"
                      value={eventState.address}
                      onChange={onChangeInput}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-black font-bold font-mono text-lg">
                        Longitude
                      </span>
                    </label>
                    <input
                      id="long"
                      type="number"
                      name="long"
                      value={eventState.long}
                      onChange={onChangeInput}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-black font-bold font-mono text-lg">
                        Latitude
                      </span>
                    </label>
                    <input
                      id="lat"
                      type="number"
                      name="lat"
                      value={eventState.lat}
                      onChange={onChangeInput}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-black font-bold font-mono text-lg">
                        Choose image
                      </span>
                    </label>
                    <input
                      type="file"
                      id="pics"
                      name="pics"
                      onChange={onChangeInput}
                      className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                    />
                  </div>
                  <br />
                  {event ? (
                    loading ? (
                      <button className="btn btn-shadow btn-primary w-1/2">
                        <span className="loading loading-spinner loading-md "></span>
                      </button>
                    ) : (
                      <button
                        className="btn btn-shadow btn-primary w-1/2"
                        onClick={handleEditEvent}
                        value="Edit"
                        // type="submit"
                      >
                        Edit
                      </button>
                    )
                  ) : null}
                </form>
                {event
                  ? null
                  : Object.keys(checkpointState).map((checkpoint, index) => {
                      return (
                        <>
                          <div
                            className="divider lg:divider-horizontal"
                            key={checkpoint}
                          />
                          <form>
                            <h1 className="card-title font-mono">
                              Add Checkpoint {index + 1}
                            </h1>
                            {Object.keys(checkpointState[checkpoint]).map(
                              (el, index) => {
                                return (
                                  <div
                                    className="form-control w-full max-w-xs"
                                    key={checkpoint + index}
                                  >
                                    <label className="label">
                                      <span className="label-text text-black font-bold font-mono text-lg">
                                        {el}
                                      </span>
                                    </label>
                                    {el === "long" || el == "lat" ? (
                                      <input
                                        id={checkpoint}
                                        type="number"
                                        name={el}
                                        value={checkpointState[checkpoint][el]}
                                        onChange={onChangeCheckpointInput}
                                        className="input input-bordered w-full max-w-xs"
                                      />
                                    ) : (
                                      <input
                                        id={checkpoint}
                                        type="text"
                                        name={el}
                                        value={checkpointState[checkpoint][el]}
                                        onChange={onChangeCheckpointInput}
                                        className="input input-bordered w-full max-w-xs"
                                      />
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </form>
                        </>
                      );
                    })}
                {event ? null : loading ? (
                  <button className="btn btn-shadow btn-primary w-1/6 absolute right-2 bottom-2">
                    <span className="loading loading-spinner loading-md "></span>
                  </button>
                ) : (
                  <button
                    className="btn btn-shadow btn-primary w-1/6 absolute top-24 right-2"
                    onClick={handleAddEvent}
                    value="Add"
                    // type="submit"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

EventForm.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  event: PropTypes.object,
  // categories: PropTypes.array,
};