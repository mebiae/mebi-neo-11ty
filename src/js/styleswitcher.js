//credits to https://kalechips.net/stuff/snippets.php?p=styleswitcher.
function changeStyle(style) {
    if (style == null)
        style = localStorage.getItem("style");
        if (style == null) 
            style = "welcome";
    document.querySelector("link[type='text/css']").setAttribute("href", "/css/styles/" + style + ".css");
    localStorage.setItem("style", style);

    var banner = document.getElementById("banner");
    if (style != "welcome") {
        banner.src = "/images/themes/" + style + "/banner_sign.png";
    } else {
        banner.src = "/images/themes/banner_sign.png";
    }
}
window.onload = changeStyle();

//enable style selector if javascript is enabled (if it isnt, well this wouldnt work)
function waitLoad(){
    var selector = document.getElementById("selector");
    selector.disabled = false;
  }
window.onload = waitLoad();