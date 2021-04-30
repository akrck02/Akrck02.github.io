export const resolveAfter = (x, time) => {
  sleep(time).then(x);
};

export const resolveAfterMs = (x, time) => {
  return resolveAfter(x,time / 1000);
};

export const executeAsync = (func, time) => {
  new Promise((resolve) => resolve()).then(() => {
    setTimeout(() => {
      func();
      executeAsync(func, time);
    }, time);
  });
};

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}