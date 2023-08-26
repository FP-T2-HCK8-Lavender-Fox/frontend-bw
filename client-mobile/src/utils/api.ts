import axios from "axios";

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

let baseURL =
  "https://8c06-2001-448a-2012-dff-34a4-c3b4-9a8b-de38.ngrok-free.app";
if (!development) baseURL = "https://xx";

export const api = axios.create({ baseURL });
