import axios from "axios";

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

let baseURL = "https://c3d6-103-3-221-239.ngrok-free.app/";
if (!development) baseURL = "https://xx";

export const api = axios.create({ baseURL });
