import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchEvents,
  editEventById,
  setMsgEvent,
  fetchEventById,
  setEventForm,
} from "../store/eventReducer";
import { fetchCategories } from "../store/categoryReducer";
import moment from "moment";
import { useParams } from "react-router-dom";
import MapModal from "../components/MapModal";
import { Link } from "react-router-dom";

export default function AddEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();

  const { eventForm } = useSelector((state) => state.event);

  const [mapModal, setMapModal] = useState(false);
  const handleOnCloseMap = () => setMapModal(false);

  const {
    event: { dataEvent },
    error,
  } = useSelector((state) => state.event);

  const { categories, loading } = useSelector((state) => state.category);

  const onChangeInput = ({ target: { name, value, files } }) => {
    if (name === "pics")
      dispatch(setEventForm({ ...eventForm, [name]: files[0] }));
    else dispatch(setEventForm({ ...eventForm, [name]: value }));
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    await dispatch(editEventById(eventForm));
    await dispatch(fetchEvents());
    navigate("/");
    setTimeout(() => {
      dispatch(setMsgEvent(""));
    }, 2000);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
      dispatch(setEventForm(dataEvent));
    }
    dispatch(fetchCategories());
  }, []);


  const changeOnDrag = async ({ address, lat, long }) => {
    try {
      dispatch(
        setEventForm({
          ...eventForm,
          address: address,
          lat: lat,
          long: long,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const changeOnClick = async ({ address, lat, long }) => {
    try {
      dispatch(
        setEventForm({
          ...eventForm,
          address: address,
          lat: lat,
          long: long,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const changeOnSelect = async ({ address, lat, long }) => {
    try {
      dispatch(
        setEventForm({
          ...eventForm,
          address: address,
          lat: lat,
          long: long,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && (
        <div className="mt-72 ml-96 pl-48 min-h-screen ">
          <span className="  loading loading-spinner w-28 text-neutral"></span>
        </div>
      )}
      {!loading && error ? <div>Error: {error}</div> : null}
      {!loading && categories ? (
        <div
          className={
            dataEvent
              ? "border shadow-2xl rounded-2xl mt-10 mb-12 w-screen h-full overflow-y-auto"
              : "border shadow-2xl rounded-2xl mt-10 mb-12 w-screen h-full overflow-y-auto"
          }
        >
          <div className="hero-content flex-col w-screen">
            <div className="card-body text-black">
              <button
                className="my-2 btn btn-primary btn-sm lg:btn-md"
                onClick={() => setMapModal(true)}
              >
                Map
              </button>
              <MapModal
                visible={mapModal}
                onClose={handleOnCloseMap}
                handleOnDrag={changeOnDrag}
                handleOnClick={changeOnClick}
                handleOnSelect={changeOnSelect}
                lati={eventForm.lat}
                longi={eventForm.long}
              />
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
                    value={eventForm.name}
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
                      value={eventForm.CategoryId}
                      onChange={onChangeInput}
                      className="select select-bordered"
                    >
                      <option>--- Select ---</option>
                      {categories.map((el, i) => {
                        return (
                          <option key={i} value={el.id}>
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
                      value={eventForm.amount}
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
                      value={moment(eventForm.startDate).format(
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
                      value={moment(eventForm.endDate).format(
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
                      Description
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    placeholder="Description"
                    name="description"
                    value={eventForm.description}
                    id="description"
                    onChange={onChangeInput}
                  ></textarea>
                </div>
                <br />
                {dataEvent ? (
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
              {dataEvent ? null : (
                <Link to="/checkpoint-1">
                  <button
                    className="btn btn-shadow btn-primary w-full"
                    value="next"
                  >
                    next
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
