import * as React from "react";

/**
 *
 * @param callbackFn pass a callback function to be called every interval.
 * @param seconds default: 10s long. How long the interval should be.
 * @param init default: false. Init interval.
 * @returns
 */
function useInterval(callbackFn?: () => void, seconds = 10, init = false) {
  const [count, setCount] = React.useState<number>(seconds);

  const idInterval = React.useRef<NodeJS.Timer | null>(null);

  React.useEffect(() => {
    if (init) {
      if (idInterval.current === null) {
        const id = setInterval(() => {
          setCount((c) => c - 1);
          callbackFn?.();
        }, 1000);
        idInterval.current = id;
      }
    }
  }, [init, callbackFn]);

  React.useEffect(() => {
    if (count === 0 && idInterval.current !== null) {
      return () => {
        clearInterval(Number(idInterval.current));
        idInterval.current = null;
      };
    }
  });

  return null;
}

export default useInterval;
