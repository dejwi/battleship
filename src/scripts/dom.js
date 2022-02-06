function domMain() {
  function removeHover() {
    document
      .querySelectorAll('.hoverfit')
      .forEach((el) => el.classList.remove('hoverfit'));
    document
      .querySelectorAll('.hovernofit')
      .forEach((el) => el.classList.remove('hovernofit'));
  }
  function checkSize(depth, element) {
    return {
      check: +element.getAttribute('data-x') + depth <= 10,
      renderSize:
        10 - +element.getAttribute('data-x') < depth
          ? 10 - +element.getAttribute('data-x')
          : depth,
    };
  }

  function addHover(depth, element, isFit) {
    if (element === null) return; // to not throw error when off screen
    if (depth >= 1) {
      element.classList = isFit ? 'hoverfit' : 'hovernofit';
      addHover(depth - 1, element.nextElementSibling, isFit);
    }
  }
  document.querySelector('.player').addEventListener('mouseover', (e) => {
    const length = 6;
    // safety check
    if (!e.target.classList.value) {
      const x = checkSize(length, e.target);
      addHover(x.renderSize, e.target, x.check);
      e.target.addEventListener('mouseout', removeHover);
      // console.log({
      //   x: e.target.getAttribute('data-x'),
      //   y: e.target.getAttribute('data-y'),
      // });
    }
  });
}

export { domMain };
