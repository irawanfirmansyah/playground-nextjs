import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import Head from "next/head";
import Navbar from "@components/Navbar";

const operator = ["plus", "minus", "multiply"];

const RandomArithmeticPage = () => {
  const [angka1, setAngka1] = React.useState(0);
  const [angka2, setAngka2] = React.useState(0);
  const [operasi, setOperasi] = React.useState("");

  const [timer, setTimer] = React.useState(20);
  const [preparationTimer, setPreparationTimer] = React.useState(3);

  const [showGetReady, setShowGetReady] = React.useState(false);

  const [gameOver, setGameOver] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);

  const [ans, setAns] = React.useState("");

  const [score, setScore] = React.useState(0);

  const idInterval = React.useRef<NodeJS.Timer | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setAngka1(Math.floor(Math.random() * 10));
    setAngka2(Math.floor(Math.random() * 10));
    setOperasi(operator[Math.floor(Math.random() * 3)]);
  }, []);

  /**
   * ----
   * Lifecycles
   * ----
   */

  React.useEffect(() => {
    if (ans) {
      let result = 0;
      if (operasi === "plus") {
        result = angka1 + angka2;
      }
      if (operasi === "minus") {
        result = angka1 - angka2;
      }
      if (operasi === "multiply") {
        result = angka1 * angka2;
      }

      if (result === Number(ans)) {
        setScore((s) => s + 1);
        setAns("");
        setAngka1(Math.floor(Math.random() * 10));
        setAngka2(Math.floor(Math.random() * 10));
        const nextOperasi = operator[Math.floor(Math.random() * 3)];
        setOperasi(nextOperasi ?? operasi[0]);
      }
    }
  }, [angka1, angka2, ans, operasi]);

  // Init interval for preparation
  React.useEffect(() => {
    if (showGetReady) {
      const id = setInterval(() => {
        setPreparationTimer((s) => s - 1);
      }, 1000);

      idInterval.current = id;
    }
  }, [showGetReady]);

  // // Clear preparation interval
  React.useEffect(() => {
    if (preparationTimer === 0 && showGetReady && idInterval.current) {
      clearInterval(idInterval.current);
      idInterval.current = null;
      setShowGetReady(false);
      setGameStarted(true);
    }
  }, [preparationTimer, showGetReady]);

  // // Init interval for game duration
  React.useEffect(() => {
    if (gameStarted) {
      if (idInterval.current === null) {
        const id = setInterval(() => {
          setTimer((s) => s - 1);
        }, 1000);

        idInterval.current = id;
      }
    }
  }, [gameStarted]);

  // // Clear game duration's interval
  React.useEffect(() => {
    if (timer === 0 && idInterval.current) {
      clearInterval(idInterval.current);
      idInterval.current = null;
      setGameOver(true);
    }
  }, [timer]);

  return (
    <>
      <Head>
        <title>Random Arithmetic</title>
      </Head>
      <Navbar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          {showGetReady && (
            <Typography variant="h1">{preparationTimer}</Typography>
          )}
          {!gameStarted && !gameOver && !showGetReady && (
            <>
              <Typography variant="h4" sx={{ marginBottom: "12px" }}>
                Random Arithmetic Game
              </Typography>
              <Box
                display="flex"
                sx={{
                  columnGap: "8px",
                }}
              >
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setShowGetReady(true);
                  }}
                >
                  Mulai Main
                </Button>
              </Box>
            </>
          )}
          {gameOver && (
            <>
              <Box>
                <Typography variant="h1">Game Selesai!!</Typography>
                <Typography variant="body1">Score: {score}</Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    setGameOver(false);
                    setGameStarted(false);

                    setPreparationTimer(3);
                    setTimer(20);

                    setShowGetReady(true);
                  }}
                  sx={{
                    marginTop: "8px",
                  }}
                >
                  Coba Lagi!!
                </Button>
              </Box>
            </>
          )}

          {timer !== 0 && gameStarted && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "12px",
              }}
            >
              <div>
                <h1>
                  <span>
                    {angka1}{" "}
                    {operasi === "plus" ? "+" : operasi === "minus" ? "-" : "x"}{" "}
                    {angka2}
                  </span>
                </h1>
              </div>
              <div>Sisa waktu: {timer}</div>
              <div>Score: {score}</div>
              <TextField
                label="Jawaban"
                value={ans}
                variant="filled"
                onChange={(e) => setAns(e.target.value)}
                inputRef={inputRef}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default RandomArithmeticPage;
