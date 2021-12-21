$(document).ready(function() {
    var inf = Cookies.get("uid");
    console.log(inf);
    if (inf) window.location.href = "http://140.125.217.135:1880/web/lend";
    else console.log("No");
})