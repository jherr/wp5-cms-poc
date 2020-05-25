import React from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Breadcrumb, Row, Col, Input, Button } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { useQuery, useMutation } from "react-query";

import "antd/dist/antd.css";
import "./index.css";
import Page from "./Page";

const { Header, Content } = Layout;
const { TextArea } = Input;

function fetchPage(_, { page }) {
  return new Promise((resolve) => {
    fetch(`/api/${page}`)
      .then((resp) => resp.json())
      .then(resolve);
  });
}

function postPage(data) {
  console.log(["postPage", data]);
  return new Promise((resolve) => {
    fetch(`/api/${data.page}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(resolve);
  });
}

const Editor = ({ title, text, onChange }) => (
  <>
    <Input
      placehold="Title"
      value={title}
      onChange={(evt) => onChange("title", evt.target.value)}
    />
    <TextArea
      placehold="Text"
      value={text}
      onChange={(evt) => onChange("text", evt.target.value)}
      style={{
        marginTop: "1em",
      }}
    />
  </>
);

const PageAdmin = ({}) => {
  let { pageId } = useParams();
  const { data } = useQuery(["getPage", { page: pageId }], fetchPage);
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
    <Row gutter={16}>
      {data && (
        <>
          <Col span={12}>
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
            >
              Save
            </Button>
          </Col>
          <Col span={12}>
            <Page {...state} />
          </Col>
        </>
      )}
    </Row>
  );
};

const App = () => (
  <Router>
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <Switch>
            <Route path="/:pageId">
              <PageAdmin />
            </Route>
            <Route path="/">
              <div>Home</div>
            </Route>
          </Switch>
        </div>
      </Content>
    </Layout>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("app"));
