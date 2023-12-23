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

    /*if (style == "christmas") {
        const deco = document.createElement("div");
        deco.className = "decor";
        deco.style.cssText = "position:relative;display:flex;justify-content:space-between;bottom:1331px;";
        document.getElementById("page").appendChild(deco);

        for (let i = 0; i < 4; i++) {
            const decimg = document.createElement("img");
            decimg.style.cssText = "flex-basis:5px;";
            decimg.src = "/images/themes/christmas/snow1.png";
            deco.appendChild(decimg);
        }
    } else {
        const deco = document.querySelector(".decor");
        if (deco != null || deco != undefined) {
            deco.remove();
        }
    }*/
}
window.onload = changeStyle();

//enable style selector if javascript is enabled (if it isnt, well this wouldnt work)
function waitLoad(){
    var selector = document.getElementById("selector");
    selector.disabled = false;
  }
window.onload = waitLoad();