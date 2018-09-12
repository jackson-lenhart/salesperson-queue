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
