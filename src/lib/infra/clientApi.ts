async function callInternal(path: string) {
  console.log('[ClientAPI][Request]', path);
  const res = await fetch(path);
  const json = await res.json();
  console.log('[ClientAPI][Response]', { path, status: res.status, body: json });
  return { status: res.status, json };
}
