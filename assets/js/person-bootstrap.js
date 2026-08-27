(() => {
  'use strict';
  const assetRoot = new URL('../../assets/', location.href);
  const fallbackVersion = '263';

  const loadScript = (relativePath, version) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const url = new URL(relativePath, assetRoot);
    if (location.protocol !== 'file:') url.searchParams.set('v', version || fallbackVersion);
    script.src = url.href;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const getVersion = async () => {
    if (location.protocol === 'file:') return fallbackVersion;
    try {
      const url = new URL('site-version.json', assetRoot);
      url.searchParams.set('_', String(Date.now()));
      const response = await fetch(url.href, { cache: 'no-store' });
      if (!response.ok) return fallbackVersion;
      const payload = await response.json();
      return String(payload.version || fallbackVersion);
    } catch {
      return fallbackVersion;
    }
  };

  (async () => {
    const version = await getVersion();
    await loadScript('js/people.js', version);
    await loadScript('js/person-page.js', version);
  })().catch(() => {
    const root = document.getElementById('personApp');
    if (root) root.innerHTML = '<main style="max-width:760px;margin:80px auto;padding:28px;text-align:center"><h1>לא ניתן לטעון את הדף</h1><p>אירעה תקלה בטעינת דף ההנצחה. אנא נסו לרענן את העמוד.</p></main>';
  });
})();
