export default function() {
  return ([ 10000000 ] + -1000 + -4000 + -8000 + -100000000000).replace(
    /[018]/g,
    a => (a ^ Math.random() * 16 >> a / 4).toString(16)
  );
}
