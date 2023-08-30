import axios from "axios";

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

let baseURL =
  "https://faf7-2001-448a-2012-dff-fce6-da8c-e9-f651.ngrok-free.app/";
if (!development) baseURL = "https://xx";

export const api = axios.create({ baseURL });
