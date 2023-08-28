import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById } from "../store/eventReducer";
import { useParams } from "react-router-dom";

export default function Admin() {
  const dispatch = useDispatch();
  let { id } = useParams();

  const { event } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchEventById(id));
    console.log(event);
  }, []);

  return (
    <>
      <div className="hero bg-base-100 overflow-y-auto">
        <div className="hero-content">
          <div>
            <div className="hero-content justify-between">
              <h1 className="font-mono font-bold text-4xl">{event.name}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
