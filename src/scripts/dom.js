function domMain() {
  function removeHover(e) {
    e.target.classList.remove('hover');
    document
      .querySelectorAll('.hover')
      .forEach((el) => el.classList.remove('hover'));
  }
  function checkSize(depth, element) {
    if (depth === 1) return true;
    let elements = [];
    function inner(depthh, elementt) {
      if (elementt === null) return; // wont add to list | tried with throw error but it broke lol
      if (depthh >= 1) {
        elements.push(elementt);
        console.log(elementt);
        inner(depthh - 1, elementt.nextElementSibling);
      }
    }
    inner(depth, element);
    if (elements.length !== depth) return false; // safety check if element is off gameboard

    if (elements.length === 2) {
      if (
        elements[0].hasAttribute('data-edge') &&
        elements[1].hasAttribute('data-edge')
      )
        return false;
      return true;
    }

    elements = elements.slice(1, -1); // remove first and last element
    let check = 0;
    elements.forEach((e) => {
      if (e.hasAttribute('data-edge')) check++;
    });
    return !check > 0; // stupid method but its 4am and i hope it works
  }

  function addHover(depth, element) {
    if (element === null) return;
    if (depth >= 1) {
      element.classList = 'hover';
      addHover(depth - 1, element.nextElementSibling);
    }
  }
  document.querySelector('.player').addEventListener('mouseover', (e) => {
    // console.log(e);
    const length = 4;
    if (!e.target.classList.value) {
      e.target.addEventListener('mouseout', removeHover);
      addHover(length, e.target);

      if (checkSize(length, e.target)) console.log('jest ok');
      else console.log('nie ok');
    }
  });
}

export { domMain };
