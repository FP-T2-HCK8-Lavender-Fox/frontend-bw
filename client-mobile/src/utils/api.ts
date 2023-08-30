import axios from "axios";

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

let baseURL = "https://0daa-114-122-22-117.ngrok-free.app/";
if (!development) baseURL = "https://xx";

export const api = axios.create({ baseURL });
