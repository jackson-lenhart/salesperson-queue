export function nameToLabel(name) {
  const narr = name.split('');
  return [narr[0].toUpperCase()]
  .concat(narr.slice(1)
    .map(c => /[A-Z]/.test(c)
      ? ' ' + c.toLowerCase()
      : c
    )
  )
  .join('');
}

export function calculateWaitedSeconds(signedIn) {
  const currentSeconds = Math.floor(Date.now() / 1000);
  return currentSeconds - signedIn;
}

export function formatWaitedSeconds(waitedSeconds) {
  const minutes = Math.floor(waitedSeconds / 60);
  const seconds = waitedSeconds % 60;
  return `${minutes}:${seconds}`;
}
