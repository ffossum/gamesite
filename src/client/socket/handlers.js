export function createHandlers(store) {
  return {
    'news': data => {
      console.log(data);
    }
  };
}
