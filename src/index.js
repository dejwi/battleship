// import "./style.scss";

const shipFactory = (len, posx, posy) => {
  const length = len;
  const startPos = {
    x: posx,
    y: posy,
  };
  const hitPos = [];
  const isSunk = () => {
    return hitPos.length === length;
  };
  const hit = (n) => {
    if (hitPos.includes(n)) return false;
    if (n > length || n < length) return false;

    hitPos.push(n);
    return true;
  };
  return { length, startPos, hitPos, isSunk, hit };
};

export { shipFactory };
