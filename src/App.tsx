import { Typography } from "@mui/material";
import React from "react";
import { ChildrenList } from "./components/ChildrenList/ChildrenList";

const App = () => (
  <div>
    <Typography variant="h4">Children list</Typography>
    <ChildrenList />
  </div>
);

export default App;
