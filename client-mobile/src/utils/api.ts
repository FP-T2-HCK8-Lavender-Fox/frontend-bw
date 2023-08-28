import axios from "axios";

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

let baseURL =
  "https://903e-2001-448a-2012-dff-88ac-b72d-3063-6177.ngrok-free.app";
if (!development) baseURL = "https://xx";

export const api = axios.create({ baseURL });
