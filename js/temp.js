// We make a new listener that is waiting for us to click
AFRAME.registerComponent('click-listener', {  // We name this click listener
    schema: {type: 'string'},

    // This code runs when page loads
    init: function () {

        // This says "run this code when click"
        this.el.addEventListener('click', function () {
          // Make a new div with JavaScript
          var tempContainer = document.createElement('div');
          // Make new HTML (this will be our popup)
          var newMenu = tempContainer.innerHTML;

          // Make our popup, the same as HTML
          tempContainer.innerHTML = '<a-plane">' +
              '<a-text value="SPOOKY!" color="#000000"></a-text>' +
              '</a-plane>';

          // Grab our popup and call it newMenu
          newMenu = tempContainer.firstChild;

          document.getElementById("scene").appendChild(newMenu);
        });
    }
});
