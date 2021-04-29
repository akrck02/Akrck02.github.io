export const resolveAfter = (x, time) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(x), time * 1000);
  });
};

export const asyncForeach = (list, func, time) => {
  const max = list.length;
  let index = 0;
  execute(list, func, time, max, index);
};

const execute = (list, func, time, max, index) => {
  resolveAfter(() => {
    func(list[index]);
    index++;

    return index;
  }, time)
    .then((funct) => {
      index = funct();
      if (index < max) execute(list, func, time, max, index);
    })
    .catch((error) => {
      console.error("Error: " + error);
    });
};

export const executeAsync = (func, time) => {
    let promise = new Promise((resolve) => resolve()).then(() => {
      setTimeout(() => {
        func()
        executeAsync(func,time)
      }, time);
    });
};

