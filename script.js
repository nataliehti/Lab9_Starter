

TrackJS.track('Testing TrackJS!');


class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = document.querySelector('#first-num').value;
  const s = document.querySelector('#second-num').value;
  const op = document.querySelector('#operator').value;
  document.querySelector('output').innerHTML = eval(`${f} ${op} ${s}`);
});

window.onerror = function(message, source, lineno, colno, errorObj) {
  console.log('Caught global error:', message);
  if (window.TrackJS && typeof TrackJS.track === 'function') {
    TrackJS.track({ message, file: source, line: lineno, column: colno, error: errorObj });
    console.log('▶ forwarded error to TrackJS');
  }
  return true;
};

document.querySelector('#throw-custom-error').addEventListener('click', () => {
  try {
    const f = document.querySelector('#first-num').value;
    const s = document.querySelector('#second-num').value;
    if (isNaN(f) || isNaN(s)) {
      throw new ValidationError('Both inputs must be valid numbers');
    }
    console.log('Inputs are valid:', f, s);
  } catch (err) {
    if (err instanceof ValidationError) {
      console.error('ValidationError:', err.message);
    } else {
      throw err;
    }
  } finally {
    console.log('Done handling custom error');
  }
});

document.querySelector('#console-log').addEventListener('click', () => {
  console.log('Console log clicked');
});
document.querySelector('#console-error').addEventListener('click', () => {
  console.error('Console error clicked');
});
document.querySelector('#console-count').addEventListener('click', () => {
  console.count('console count');
});
document.querySelector('#console-warn').addEventListener('click', () => {
  console.warn('Console warn clicked');
});
document.querySelector('#console-assert').addEventListener('click', () => {
  const x = 2, y = 3;
  console.assert(x === y, 'Assertion failed');
});
document.querySelector('#console-clear').addEventListener('click', () => {
  console.clear();
});
document.querySelector('#console-dir').addEventListener('click', () => {
  console.dir(document.body);
});
document.querySelector('#console-dirxml').addEventListener('click', () => {
  console.dirxml(document.querySelector('main'));
});
document.querySelector('#console-group-start').addEventListener('click', () => {
  console.group('group');
  console.log('Inside group message 1');
  console.log('Inside group message 2');
});
document.querySelector('#console-group-end').addEventListener('click', () => {
  console.groupEnd();
});
document.querySelector('#console-table').addEventListener('click', () => {
  console.table([]);
});
document.querySelector('#start-timer').addEventListener('click', () => {
  console.time('timer');
  console.log('Timer started');
});
document.querySelector('#end-timer').addEventListener('click', () => {
  console.timeEnd('timer');
});
document.querySelector('#console-trace').addEventListener('click', () => {
  function a() { function b() { console.trace('Trace'); } b(); }
  a();
});
document.querySelector('#trigger-global-error').addEventListener('click', () => {
  console.log(document.querySelector('#does-not-exist').value);
});

console.log('▶ end of main script');

// TrackJS verification
console.log('▶ TrackJS present?', typeof TrackJS);
if (window.TrackJS && typeof TrackJS.track === 'function') {
  TrackJS.track('Manual TrackJS test');
  console.log('▶ Called TrackJS.track()');
} else {
  console.log('⛔ TrackJS did not load');
}
