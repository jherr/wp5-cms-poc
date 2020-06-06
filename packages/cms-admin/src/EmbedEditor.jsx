import React from "react";
import { Button } from "semantic-ui-react";
import { useQuery, useMutation } from "react-query";
import Editor from "./Editor";
import { fetchPage, postPage } from "./api";

const PageAdmin = ({ page }) => {
  const { data } = useQuery(["getPage", { page }], (_, args) =>
    fetchPage(_, args, "http://localhost:8080")
  );
  const [state, setState] = React.useState({});
  const [mutate] = useMutation((data) =>
    postPage(data, "http://localhost:8080")
  );

  React.useEffect(() => {
    setState(data);
  }, [data]);

  const onSave = () => {
    mutate({
      page,
      ...state,
    });
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <Editor {...state} onChange={(k, v) => setState({ ...state, [k]: v })} />
      <Button
        type="primary"
        onClick={onSave}
        style={{
          marginTop: "1em",
        }}
        primary
      >
        Save
      </Button>
    </>
  );
};

export default PageAdmin;
