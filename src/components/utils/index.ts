import React from "react";

export const useWindowSizes = () => {
  const [windowSize, setwindowSize] = React.useState({ width: 0, height: 0 });
  const getWindowSizes = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  };

  React.useEffect(() => {
    setwindowSize(getWindowSizes());
    function resize() {
      setwindowSize(getWindowSizes());
    }

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return windowSize;
};

export const useWindowScrollHeight = () => {
  const [scrollPosition, setPosition] = React.useState(0);
  console.log(scrollPosition, "scroll position");

  React.useLayoutEffect(() => {
    function updateHeight() {
      setPosition(window.pageYOffset);
    }

    window.addEventListener("scroll", updateHeight);
    updateHeight();

    return () => window.removeEventListener("scroll", updateHeight);
  }, []);

  return { scrollPosition };
};

export const binary_search = (arr: number[], item: number) => {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.round((low + high) / 2);
    let guess = arr[mid];

    if (guess === item) return mid;
    if (guess > item) high = mid - 1;
    else low = mid + 1;

    return null;
  }
};

export const funny_func = (arr: number[]) => {
  if (Array.isArray(arr)) {
    return `this ${arr} is a funny func`;
  }
};

export const comment_bot = (arr: number[], item: number) => {
  console.log("Comment bot is for fresh eyes");

  return arr.find((i) => i === item);
};
