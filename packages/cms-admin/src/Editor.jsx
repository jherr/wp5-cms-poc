import React from "react";
import { Input, TextArea, Form } from "semantic-ui-react";

const Editor = ({ title, text, img1, img2, img3, onChange }) => (
  <Form>
    <Input
      placeholder="Title"
      value={title}
      onChange={(evt) => onChange("title", evt.target.value)}
      style={{ width: "100%" }}
    />
    <TextArea
      placeholder="Text"
      value={text}
      onChange={(evt) => onChange("text", evt.target.value)}
      style={{
        marginTop: "1em",
      }}
    />
    <Input
      placeholder="Image 1"
      value={img1}
      onChange={(evt) => onChange("img1", evt.target.value)}
      style={{
        marginTop: "1em",
        width: "100%",
      }}
    />
    <Input
      placeholder="Image 2"
      value={img2}
      onChange={(evt) => onChange("img2", evt.target.value)}
      style={{
        marginTop: "1em",
        width: "100%",
      }}
    />
    <Input
      placeholder="Image 3"
      value={img3}
      onChange={(evt) => onChange("img3", evt.target.value)}
      style={{
        marginTop: "1em",
        width: "100%",
      }}
    />
  </Form>
);

export default Editor;
