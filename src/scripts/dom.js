function removeHover() {
  document
    .querySelectorAll('.hoverfit')
    .forEach((el) => el.classList.remove('hoverfit'));
  document
    .querySelectorAll('.hovernofit')
    .forEach((el) => el.classList.remove('hovernofit'));
}
function checkSize(depth, element, isHorizontal = true) {
  const orient = isHorizontal ? 'x' : 'y';
  return {
    check: +element.getAttribute(`data-${orient}`) + depth <= 10,
    renderSize:
      10 - +element.getAttribute(`data-${orient}`) < depth
        ? 10 - +element.getAttribute(`data-${orient}`)
        : depth,
  };
}

function addClasses(depth, element, isFit, isHorizontal = true, place = false) {
  let classAdd = isFit ? 'hoverfit' : 'hovernofit';
  if (place) classAdd = 'pship';

  const startPos = {
    x: element.getAttribute(`data-x`),
    y: element.getAttribute(`data-y`),
  };

  for (let i = 0; i < depth; i++) {
    if (isHorizontal) {
      const e = document.querySelector(
        `.player div[data-x="${+startPos.x + i}"][data-y="${startPos.y}"]`
      );
      if (!e.classList.value.includes('pship')) e.classList = classAdd;
    } else {
      const e = document.querySelector(
        `.player div[data-x="${startPos.x}"][data-y="${+startPos.y + i}"]`
      );
      if (!e.classList.value.includes('pship')) e.classList = classAdd;
    }
  }
}
function doShipColide(size, element, isHorizontal = true) {
  const startPos = {
    x: +element.getAttribute(`data-x`) - 1,
    y: +element.getAttribute(`data-y`) - 1,
  };
  if (isHorizontal) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < size + 2; j++) {
        const e = document.querySelector(
          `.player div[data-x="${j + startPos.x}"]` +
            `[data-y="${i + startPos.y}"]`
        );
        if (e && e.classList.value.includes('pship')) return true;
      }
    }
  } else {
    for (let i = 0; i < size + 2; i++) {
      for (let j = 0; j < 3; j++) {
        const e = document.querySelector(
          `.player div[data-x="${j + startPos.x}"]` +
            `[data-y="${i + startPos.y}"]`
        );
        if (e && e.classList.value.includes('pship')) return true;
      }
    }
  }
  return false;
}
function shipHover(size, element, isHorizontal) {
  const x = checkSize(size, element, isHorizontal);
  const isValid = !doShipColide(size, element, isHorizontal) && x.check;
  addClasses(x.renderSize, element, isValid, isHorizontal);
  element.addEventListener('mouseout', removeHover);
}
function markSunk(data, boardClass) {
  // boards class: 'player' || 'enemy'
  // x: 0,
  //       y: 0,
  //       length: 3,
  //       isHorizontal: true,
  if (data.isHorizontal)
    for (let i = 0; i < data.length; i++)
      document.querySelector(
        `.${boardClass} div[data-x="${data.x + i}"][data-y="${data.y}"]`
      ).classList = 'sunk';
  else
    for (let i = 0; i < data.length; i++)
      document.querySelector(
        `.${boardClass} div[data-x="${data.x}"][data-y="${data.y + i}"]`
      ).className = 'sunk';
}

export { shipHover, doShipColide, checkSize, addClasses, markSunk };
