(() => {
  const out = document.getElementById('out');
  const log = (msg) => { out.textContent = (new Date()).toLocaleTimeString() + ' — ' + msg; };

  document.getElementById('start').addEventListener('click', async () => {
    const res = await window.wis.start();
    log(res.started ? 'Keep screen ON started.' : 'Failed to start keep-awake.');
  });

  document.getElementById('stop').addEventListener('click', async () => {
  await window.wis.stop();
  log('Keep-awake stopped. App is still running.');
  });

  document.getElementById('screen').addEventListener('click', async () => {
  const info = await window.wis.screen();
  const status = info.keepAwake ? 'started' : 'stopped';
  log(`Screen: ${info.size.width}x${info.size.height} @${info.scaleFactor}x — keep-awake is ${status}`);
  });

  document.getElementById('update').addEventListener('click', async () => {
    const res = await window.wis.update();
    log(res.message || 'Updates are disabled.');
  });

  document.getElementById('uninstall').addEventListener('click', async () => {
    const res = await window.wis.uninstall();
    if (res.ok) {
      log('Uninstalling...');
    } else if (res.cancelled) {
      log('Uninstall cancelled.');
    } else {
      log('Uninstall failed: ' + (res.error || 'Unknown error'));
    }
  });
})();
