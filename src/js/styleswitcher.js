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

    if (style == "christmas") {
        /*const deco = document.querySelector(".decor");
        deco.style.cssText = "position:relative;display:flex;justify-content:space-between;";

        for (let i = 0; i < 4; i++) {
            let v = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
            const decimg = document.createElement("img");
            decimg.style.cssText = "position:absolute;";
            decimg.src = "/images/themes/christmas/snow" + [v] + ".png";
            deco.appendChild(decimg);
        }*/

        const canvas = document.body.getElementsByTagName("canvas")[0]
        const snowele = document.querySelector("head > script[src='/js/snow.js']")
        if (snowele == null || snowele == undefined) {
            const snow = document.createElement("script");
            snow.src = "/js/snow.js";
            document.head.appendChild(snow);
            console.log("created snow script");
        } else {
            console.log("script already exists");
            if (canvas == null || canvas == undefined) {
                createcanvas();
            }
        }
    } else {
        /*const deco = document.querySelector(".decor");
        if (deco != null || deco != undefined) {
            while (deco.firstChild) {
                deco.removeChild(deco.firstChild);
            }
        }*/
        const canvas = document.body.getElementsByTagName("canvas")[0]
        if (canvas != null || canvas != undefined) {
            canvas.remove();
        }
    }
}
window.onload = changeStyle();

//enable style selector if javascript is enabled (if it isnt, well this wouldnt work)
function waitLoad(){
    var selector = document.getElementById("selector");
    selector.disabled = false;
  }
window.onload = waitLoad();