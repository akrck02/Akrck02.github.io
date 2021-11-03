export function resolveAfter (func, time : number) : void {
    sleep(time).then(func);
};

export function resolveAfterMs (func, time : number ) : void {
    return resolveAfter(func, time / 1000);
};

export function executeAsync (func , time : number) : void {
    new Promise((resolve) => resolve(0)).then(() => {
        setTimeout(() => {
            func();
            executeAsync(func, time);
        }, time);
    });
};

export function sleep (ms : number) : Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
