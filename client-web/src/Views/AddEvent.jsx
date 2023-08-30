import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchEvents,
  postEvent,
  editEventById,
  setMsgEvent,
} from "../store/eventReducer";
import { fetchCategories } from "../store/categoryReducer";
import moment from "moment";

export default function AddEvent() {
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

  const onChangeInput = ({ target: { name, value, files } }) => {
    if (name === "pics") setEventState({ ...eventState, [name]: files[0] });
    else setEventState({ ...eventState, [name]: value });
    // console.log(eventState);
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

    setTimeout(() => {
      dispatch(setMsgEvent(""));
    }, 2000);
  };

  useEffect(() => {
    if (event) setEventState(event);
    dispatch(fetchCategories());
  }, [event, dispatch]);

  return (
    <>
      <div
        className={
          event
            ? "border mt-14 mb-20 shadow-2xl rounded-2xl overflow-y-auto h-5/6"
            : "border mt-14 mb-20 shadow-2xl rounded-2xl overflow-y-auto h-5/6 lg:w-full"
        }
      >
        <div className="hero-content flex-col w-screen">
          <div className="card-body text-black">
            <form>
              <h1 className="card-title font-mono">Add Event</h1>
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
              <div className="form-control w-full max-w-lg">
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
              <div className="flex flex-col lg:flex-row">
                <div className="form-control w-full max-w-xs mr-3">
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
                    <option>--- Select ---</option>
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
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className="form-control w-full max-w-xs mr-3">
                  <label className="label">
                    <span className="label-text text-black font-bold font-mono text-lg">
                      Start Date
                    </span>
                  </label>
                  <input
                    id="startDate"
                    type="datetime-local"
                    name="startDate"
                    min={moment(new Date()).format("YYYY-MM-DDThh:mm")}
                    value={moment(eventState.startDate).format(
                      "YYYY-MM-DDThh:mm"
                    )}
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
                    min={moment(new Date()).format("YYYY-MM-DDThh:mm")}
                    value={moment(eventState.endDate).format(
                      "YYYY-MM-DDThh:mm"
                    )}
                    onChange={onChangeInput}
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
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
                    long
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
                    lat
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
              <button className="btn btn-shadow btn-primary w-full">
                <span className="loading loading-spinner loading-md "></span>
              </button>
            ) : (
              <button
                className="btn btn-shadow btn-primary w-full"
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
    </>
  );
}
