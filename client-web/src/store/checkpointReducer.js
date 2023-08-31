import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import QRCode from "qrcode";

const baseUrl = "http://localhost:3000";

const initialState = {
  checkpointLoading: false,
  checkpoints: [],
  chekcpointError: "",
  checkpoint1: {
    name: "",
    lat: "",
    long: "",
    question: "",
    trueAnswer: "",
    wrongAnswerOne: "",
    wrongAnswerTwo: "",
  },
  checkpoint2: {
    name: "",
    lat: "",
    long: "",
    question: "",
    trueAnswer: "",
    wrongAnswerOne: "",
    wrongAnswerTwo: "",
  },
  checkpoint3: {
    name: "",
    lat: "",
    long: "",
    question: "",
    trueAnswer: "",
    wrongAnswerOne: "",
    wrongAnswerTwo: "",
  },
  qr: [],
};

export const generateQR = createAsyncThunk(
  "checkpoints/generateQr",
  async (checkpoints) => {
    let qr = [];
    try {
      for (const i of checkpoints) {
        let temp = await QRCode.toDataURL(JSON.stringify(i));
        qr.push(temp);
      }
      return qr;
    } catch (err) {
      return err;
    }
  }
);

export const fetchCheckpointsByEventId = createAsyncThunk(
  "checkpoints/fetchCheckpointsByEventId",
  async (id) => {
    try {
      let options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(baseUrl + "/checkpoints/" + id, options);
      const checkpoints = await response.json();
      return checkpoints;
    } catch (error) {
      return error;
    }
  }
);

const checkpointsSlice = createSlice({
  name: "checkpoints",
  initialState,
  reducers: {
    setMsg(state, action) {
      state.msg = action.payload;
    },
    setCheckpoint1(state, action) {
      state.checkpoint1 = action.payload;
    },
    setCheckpoint2(state, action) {
      state.checkpoint2 = action.payload;
    },
    setCheckpoint3(state, action) {
      state.checkpoint3 = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckpointsByEventId.pending, (state) => {
        state.checkpointLoading = true;
      })

      .addCase(fetchCheckpointsByEventId.fulfilled, (state, action) => {
        state.checkpointLoading = false;
        state.checkpoints = action.payload;
        // state.qr = state.payload.qr;
      })

      .addCase(fetchCheckpointsByEventId.rejected, (state, action) => {
        state.checkpointLoading = false;
        state.chekcpointError = action.error.message;
      })

      .addCase(generateQR.pending, (state) => {
        state.checkpointLoading = true;
      })

      .addCase(generateQR.fulfilled, (state, action) => {
        state.checkpointLoading = false;
        state.qr = action.payload;
      })

      .addCase(generateQR.rejected, (state, action) => {
        state.checkpointLoading = false;
        state.chekcpointError = action.error.message;
      });
  },
});

export const { setMsg, setCheckpoint1, setCheckpoint2, setCheckpoint3 } =
  checkpointsSlice.actions;

export default checkpointsSlice.reducer;
