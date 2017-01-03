export function one(selector, parent = document) {
  return parent.querySelector(selector) || parent.createElement('div');
}
export function all(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}
export function id(selector) {
  return document.getElementById(selector) || document.createElement('div');
}
export function classname(selector, parent = document) {
  return Array.from(parent.getElementsByClassName(selector));
}
export function tag(selector, parent = document) {
  return Array.from(parent.getElementsByTagName(selector));
}
