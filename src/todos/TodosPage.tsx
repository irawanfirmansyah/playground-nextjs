import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import Head from "next/head";

const TodosPage = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  /**
   * ----
   * Handlers
   * ----
   */
  const onClickSave = () => {
    console.log({ title, description });
  };

  return (
    <>
      <Head>
        <title key="title">Todos</title>

        <meta
          property="og:title"
          content="Todos' title content that will be shown when shared on social media"
        />
        <meta
          property="og:description"
          content="This is Todos Page Description content that will be shown when shared on social media"
        />
      </Head>
      <Box display={"flex"} flexDirection="column" height="100vh">
        <header
          style={{
            flex: 0.2,
            backgroundColor: "#1e3d59",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" color="HighlightText">
            Write anything to do in here, and open it anytime
          </Typography>
        </header>
        <main
          style={{
            flex: 1,
            backgroundColor: "#f5f0e1",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <div
            id="formWrapper"
            style={{
              backgroundColor: "#ff6e40",
              display: "flex",
              flexDirection: "column",
              width: "360px",
              margin: "auto",
              rowGap: "16px",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <Typography variant="h4">Add your todo here</Typography>
            <TextField
              label="Title"
              style={{ backgroundColor: "white", borderRadius: "4px" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Description"
              style={{ backgroundColor: "white", borderRadius: "4px" }}
              value={description}
              multiline
              maxRows={3}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              style={{ backgroundColor: "#1e3d59" }}
              variant="contained"
              type="submit"
              color="primary"
              onClick={onClickSave}
            >
              Save
            </Button>
          </div>
          <div
            id="todosContainer"
            style={{
              backgroundColor: "#ffc13b",
            }}
          >
            <div style={{ padding: "10px" }}>Inside todowrapper</div>
          </div>
        </main>
        <footer
          style={{
            flex: 0.2,
            backgroundColor: "#1e3d59",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" color="HighlightText">
            You can close and open again to see your todos anytime!!
          </Typography>
        </footer>
      </Box>
    </>
  );
};

export default TodosPage;
