import React from "react";
import { useQuery } from "react-query";

import Page from "./Page";

function fetchPage(_, { page }) {
  return new Promise((resolve) => {
    fetch(`http://localhost:8080/api/${page}`)
      .then((resp) => resp.json())
      .then(resolve);
  });
}

const EmbedPage = ({ page }) => {
  const { data } = useQuery(["getPage", { page }], fetchPage);
  return data ? <Page {...data} /> : null;
};

export default EmbedPage;
