import axios from "axios";

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

let baseURL = "https://1c30-114-122-5-171.ngrok-free.app/";
if (!development) baseURL = "https://xx";

export const api = axios.create({ baseURL });
