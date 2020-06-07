import React from "react";
import ReactDOM from "react-dom";
import { Header, Container, Menu, Grid, Button } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { useQuery, useMutation } from "react-query";

import "semantic-ui-css/semantic.min.css";

import Page from "./Page";
import Editor from "./Editor";
import { fetchPage, postPage } from "./api";

const PageAdmin = ({}) => {
  let { pageId } = useParams();
  const { data } = useQuery(
    ["getPage", { page: pageId }, { host: "" }],
    fetchPage
  );
  const [state, setState] = React.useState({});
  const [mutate] = useMutation(postPage);

  React.useEffect(() => {
    setState(data);
  }, [data]);

  const onSave = () => {
    mutate({
      page: pageId,
      ...state,
    });
  };

  return (
    <Grid>
      {data && (
        <Grid.Row>
          <Grid.Column width={8}>
            <Editor
              {...state}
              onChange={(k, v) => setState({ ...state, [k]: v })}
            />
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
          </Grid.Column>
          <Grid.Column width={8}>
            <Page {...state} />
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
};

const App = () => (
  <Router>
    <Container>
      <Menu fixed="top" inverted>
        <Container style={{ marginTop: "1em", marginBottom: "1em" }}>
          <Header>
            <h1 style={{ color: "white" }}>CMS Editor</h1>
          </Header>
        </Container>
      </Menu>
      <Container style={{ paddingTop: "7em" }}>
        <Switch>
          <Route path="/:pageId">
            <PageAdmin />
          </Route>
          <Route path="/">
            <div>Home</div>
          </Route>
        </Switch>
      </Container>
    </Container>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("app"));
