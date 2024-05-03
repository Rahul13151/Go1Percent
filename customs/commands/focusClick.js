exports.command = function customClick(type, selector) {
    this.execute(
      function (type, selector) {
        if (type === 'css') {
          return document.querySelector(selector).click();
        } else {
          return document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        }
      },
      [type, selector]
    );
  
    return this;
  };