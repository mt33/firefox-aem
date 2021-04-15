(function() {

  function json(selector) {
    if(selector === '.inf') selector = '.infinity';

    let href = document.location.pathname
      .replace('/editor.html/','/')
      .replace('.html', selector + '.json');

    document.location.href = document.location.origin + href;
  }

  function toggle() {
    let href = '',
        pathname = document.location.pathname,
        search = document.location.search;

    if(pathname.indexOf('/editor.html/') > -1) {
      href = pathname.replace('/editor.html/','/');
      if(search.indexOf('wcmmode=disabled') < 0) {
        href += '?wcmmode=disabled'
      }
    } else {
      href = '/editor.html' + pathname
    }

    document.location.href = document.location.origin + href;
  }

  function redirectTo(path) {
    document.location.href = document.location.origin + path;
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command.charAt(0) === '/' ) {
      redirectTo(message.command);
    } else {
      switch(message.command) {
        case 'toggle': toggle(); break;
        case 'json': json(message.arg); break;
      }
    }
  });
})();