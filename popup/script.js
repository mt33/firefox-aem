browser.tabs.executeScript({file: "/content_scripts/redirect.js"})
  .then(() => {
    document.addEventListener("click", (event) => {

      let command = '', arg = '';
      switch(event.target.tagName.toLowerCase()) {
          case 'div':
              command = event.target.getAttribute("data-target");
              break;
          case 'span':
              command = event.target.parentElement.getAttribute("data-target");
              arg = event.target.textContent;
              break;
      }

      browser.tabs.query({active: true, currentWindow: true})
        .then((tabs) => {
          browser.tabs.sendMessage(tabs[0].id, {
            command: command,
            arg: arg
          });
          window.close();
        })
        .catch(error => {
          console.error('Oh shit', error);
        });
    });
  })
  .catch(error => {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute AEM Shortcuts content script: ${error.message}`);
  });
