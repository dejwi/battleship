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
    if (depth === 1) return { check: true, renderSize: 1 };
    const elements = [];
    function inner(depthh, elementt) {
      if (elementt === null) return; // wont add to list | tried with throw error but it broke lol
      if (depthh >= 1) {
        elements.push(elementt);
        inner(depthh - 1, elementt.nextElementSibling);
      }
    }
    inner(depth, element);
    if (elements.length !== depth)
      return { check: false, renderSize: elements.length }; // safety check if element is off gameboard

    let counter = 0;
    let helper = 1;
    elements.reduce((prev, now) => {
      // check if prev is not null + if on diffrent levels
      if (prev && now)
        if (now.getAttribute('data-y') !== prev.getAttribute('data-y'))
          helper = 0;
      counter += helper;
      return now;
    }, null);

    if (counter === depth) return { check: true, renderSize: depth };

    return { check: false, renderSize: counter };
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
