require("dotenv").config();

import express from "express";
import cors from "cors";

const app: express.Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./routes/player")(app);
require("./routes/champions")(app);
require("./routes/champion")(app);

app.listen(process.env.LOLDATA_PORT || 5004, () =>
  console.log(`Listening on PORT ${process.env.LOLDATA_PORT || 5004}`)
);
