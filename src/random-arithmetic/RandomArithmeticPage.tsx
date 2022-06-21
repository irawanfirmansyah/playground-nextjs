import React from "react";

const operator = ["plus", "minus", "multiply"];

const RandomArithmeticPage = () => {
  const [angka1, setAngka1] = React.useState(Math.floor(Math.random() * 10));
  const [angka2, setAngka2] = React.useState(Math.floor(Math.random() * 10));
  const [operasi, setOperasi] = React.useState(
    operator[Math.floor((Math.random() * 10) / 3)]
  );

  const [timer, setTimer] = React.useState(20);
  const [gameOver, setGameOver] = React.useState(false);
  const [ans, setAns] = React.useState("");

  const [score, setScore] = React.useState(0);

  const idInterval = React.useRef<NodeJS.Timer | null>(null);

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
      console.log(result, Number(ans));

      if (result === Number(ans)) {
        setAns("");
        setScore((s) => s + 1);
        setAngka1(Math.floor(Math.random() * 10));
        setAngka2(Math.floor(Math.random() * 10));
        const nextOperasi = operator[Math.floor(Math.random() * 3)];
        setOperasi(nextOperasi ?? operasi[0]);
      }
    }
  }, [angka1, angka2, ans, operasi]);

  React.useEffect(() => {
    if (idInterval.current === null) {
      const id = setInterval(() => {
        setTimer((s) => s - 1);
      }, 1000);

      idInterval.current = id;
    }
  }, []);

  React.useEffect(() => {
    if (timer === 0 && idInterval.current) {
      clearInterval(idInterval.current);
      setGameOver(true);
    }
  }, [timer]);

  if (gameOver) {
    return (
      <div>
        <h1>Game Selesai!!</h1>
        <div>Score: {score}</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <span>
          {angka1} {operasi === "plus" ? "+" : operasi === "minus" ? "-" : "x"}{" "}
          {angka2}
        </span>
      </div>
      <div>Sisa waktu: {timer}</div>
      <div>Score: {score}</div>
      <input value={ans} onChange={(e) => setAns(e.target.value)} />
    </div>
  );
};

export default RandomArithmeticPage;
