import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchEvents, editEventById, setMsgEvent } from "../store/eventReducer";
import { fetchCategories } from "../store/categoryReducer";
import moment from "moment";

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

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const onChangeInput = ({ target: { name, value, files } }) => {
    if (name === "pics") setEventState({ ...eventState, [name]: files[0] });
    else setEventState({ ...eventState, [name]: value });
    // console.log(eventState);
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
    dispatch(fetchCategories());
  }, [event, dispatch]);

  if (!visible) return null;
  return (
    <>
      <div
        id="container"
        onClick={handleOnClose}
        className={
          "fixed z-50 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        }
      >
        <div className={"overflow-y-auto h-5/6"}>
          <div className={"hero-content text-center bg-neutral"}>
            <div className={"card bg-neutral w-96"}>
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
