/* When the user clicks on the button,
toggle between hiding and showing the dropdown content
function drop() {
    for (i = 0; i < document.getElementsByClassName("drop-content").length; i++) {
      document.getElementsByClassName("drop-content")[i].style.display = "block";
    }
}

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (event.target.matches('.drop')) {
      var dropdowns = document.getElementsByClassName("drop");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.hasAttribute("open")) {
          openDropdown.toggleAttribute("open");
        }
      }
    }
  }*/