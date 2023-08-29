import axios from "axios";

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

let baseURL =
  "https://5f7a-2001-448a-2012-dff-bc7c-3b16-9e97-c6f4.ngrok-free.app";
if (!development) baseURL = "https://xx";

export const api = axios.create({ baseURL });
