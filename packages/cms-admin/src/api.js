export const fetchPage = (_, { page }, { host = "" }) => {
  console.log([page, host]);
  return fetch(`${host}/api/${page}`).then((resp) => resp.json());
};

export const postPage = (data, { host = "" }) =>
  fetch(`${host}/api/${data.page}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  }).then((resp) => resp.json());
