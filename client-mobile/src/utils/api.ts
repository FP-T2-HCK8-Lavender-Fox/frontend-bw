import axios from "axios";

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

let baseURL = "https://0a2e-103-3-220-183.ngrok-free.app/";
if (!development) baseURL = "https://xx";

export const api = axios.create({ baseURL });
