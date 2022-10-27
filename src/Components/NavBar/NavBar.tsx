import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import "./NavBar.sass";

interface INavBar {
  filter: Function;
  favorite: Function;
}

export default function NavBar(props: INavBar) {
  const [checked, setChecked] = useState(false);
  console.log("start checked ", checked);
  const handleChange = () => {
    props.favorite(!checked);
    setChecked(!checked);
  };

  return (
    <div className="NavBar">
      <h1 style={{ marginLeft: "10px" }}>Mon Bar</h1>
      <div style={{ marginRight: "10px" }}>
        <Checkbox
          style={{ marginRight: "40px" }}
          checked={checked}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          onClick={handleChange}
        />
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => props.filter(e.target.value)}
        />
      </div>
    </div>
  );
}
