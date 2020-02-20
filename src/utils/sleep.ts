export async function sleep(ms: number): Promise<void> {
  let timer: NodeJS.Timeout = null;
  return new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      resolve();
    }, ms);
  }).then(() => {
    clearTimeout(timer);
    return Promise.resolve();
  });
}
