import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById } from "../store/eventReducer";
import { useParams } from "react-router-dom";

export default function Admin() {
  const dispatch = useDispatch();
  let { id } = useParams();

  const { event, loading, error } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, []);

  return (
    <>
      {loading && (
        <span className="loading loading-spinner text-neutral"></span>
      )}
      {!loading && error ? <div>Error: {error}</div> : null}
      {!loading && Object.values(event).length > 1 ? (
        <div className="hero bg-base-100">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={event.pics}
              className="max-w-sm rounded-lg shadow-2xl bg-neutral"
            />
            <div>
              <h1 className="text-5xl font-bold">{event.name.toUpperCase()}</h1>
              <p>by {event.Admin.username}</p>
              <div className="flex pt-6 justify-around">
                <p className="text-left">Address: {event.address}</p>
                <p>hahah</p>
              </div>
              <p className="py-2 text-left">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
                labore, id facere ut veniam tempora impedit inventore? Maiores
                magni reprehenderit consectetur quia veritatis ab facere ipsa
                doloremque aliquid tempora dolore deserunt laboriosam, quis unde
                totam? Et commodi obcaecati veniam sunt quod iste velit ducimus.
                Magni quaerat distinctio fugiat perspiciatis voluptatum.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
