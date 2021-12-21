$(document).ready(function() {
        window.Today = new Date(); // 今天的日期    
        check();

        $("#switchon").click(function() {
            check_cookie();
            check();
            switch_on();
        })

        $("#switchoff").click(function() {
            check_cookie();
            check();
            switch_off();
        })

        $("#backhome").click(function() {
            window.location.href = "http://127.0.0.1:1880/web/home";
        })
    }

)

function check() {
    window.check_flag = 0;
    var today = date_formate(window.Today);
    var API = "http://127.0.0.1:1880/check";
    $.post(
        API, {
            Today: today
        },
        function(res) {
            var inf = res.Inf;
            var currrent_h = window.Today.getHours();
            var j = 0;

            if (currrent_h >= 8 && currrent_h <= 17) {
                if (currrent_h < 12 && currrent_h >= 8) {
                    j = currrent_h - 8;
                }
                if (currrent_h >= 13 && currrent_h < 18) {
                    j = currrent_h - 13 + 4;
                }
            }

            if (inf[j] != window.uid) {
                alert("目前非您借用時間，將返回系統首頁。");
                window.location.href = "http://127.0.0.1:1880/web/home";
            }
        }
    )
}

function switch_on() {
    var info = 1;
    var API = "http://127.0.0.1:1880/switch";
    $.post(
        API, {
            Info: info
        }
    );
}

function switch_off() {
    var info = 0;
    var API = "http://127.0.0.1:1880/switch";
    $.post(
        API, {
            Info: info
        }
    );
}

function check_cookie() {
    var API = "http://127.0.0.1:1880/web/check_cookie";
    $.get(API);
}

function date_formate(date) {
    date = new Date(date);
    var date_year = date.getFullYear();
    var date_month = date.getMonth() + 1;
    var date_day = date.getDate();
    if (date_day < 10) {
        date_day = '0' + date_day;
    }
    if (date_month < 10) {
        date_month = '0' + date_month;
    }
    var res = date_year + "-" + date_month + "-" + date_day;
    return res;
    // 僅格式化 年-月-日
}