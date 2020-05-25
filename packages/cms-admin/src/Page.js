import React from "react";

const Page = ({ title, text }) => (
  <>
    <h1 style={{ borderBottom: "5px solid black" }}>{title}</h1>
    <p>{text}</p>
  </>
);

export default Page;
