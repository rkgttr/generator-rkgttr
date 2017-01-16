export default function() {
  let d = Date.now();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now();
  }
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 3 | 8).toString(16);
  });
  return uuid;
}
