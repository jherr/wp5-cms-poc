import React from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Breadcrumb, Divider } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import "antd/dist/antd.css";
import "./index.css";

const EmbedPage = React.lazy(() => import("admin/EmbedPage"));

const { Header, Content } = Layout;

const Page = () => {
  const { pageId } = useParams();

  return (
    <div>
      Page: {pageId}
      <React.Suspense fallback={<div>Loading</div>}>
        <EmbedPage page={pageId} />
      </React.Suspense>
    </div>
  );
};

const PageTitle = () => {
  const { pageId } = useParams();

  return <h1 style={{ color: "white" }}>{pageId}</h1>;
};

const App = () => (
  <Router>
    <Layout className="layout">
      <Header>
        <Route path="/:pageId">
          <PageTitle />
        </Route>
        <Route path="/">
          <h1 style={{ color: "white" }}>Home Page</h1>
        </Route>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Switch>
            <Route path="/:pageId">
              <Page />
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
