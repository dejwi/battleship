function domMain() {
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

  function addHover(depth, element, isFit, isHorizontal = true) {
    const classAdd = isFit ? 'hoverfit' : 'hovernofit';
    const startPos = {
      x: element.getAttribute(`data-x`),
      y: element.getAttribute(`data-y`),
    };

    for (let i = 0; i < depth; i++) {
      if (isHorizontal) {
        document.querySelector(
          `.player div[data-x="${+startPos.x + i}"][data-y="${startPos.y}"]`
        ).classList = classAdd;
      } else {
        document.querySelector(
          `.player div[data-x="${startPos.x}"][data-y="${+startPos.y + i}"]`
        ).classList = classAdd;
      }
    }
  }

  function shipPlacement(size, element, isHorizontal) {
    const x = checkSize(size, element, isHorizontal);
    addHover(x.renderSize, element, x.check, isHorizontal);
    element.addEventListener('mouseout', removeHover);
  }
  document.querySelector('.player').addEventListener('mouseover', (e) => {
    const length = 3;
    const isHorizontal = false;
    // safety check
    if (!e.target.classList.value) {
      shipPlacement(length, e.target, isHorizontal);

      // console.log({
      //   x: e.target.getAttribute('data-x'),
      //   y: e.target.getAttribute('data-y'),
      // });
    }
  });
}

export { domMain };
