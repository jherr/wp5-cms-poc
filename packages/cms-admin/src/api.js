export const fetchPage = (_, { page }, host = "") => {
  return new Promise((resolve) => {
    fetch(`${host}/api/${page}`)
      .then((resp) => resp.json())
      .then(resolve);
  });
};

export const postPage = (data, host = "") => {
  return new Promise((resolve) => {
    fetch(`${host}/api/${data.page}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(resolve);
  });
};
