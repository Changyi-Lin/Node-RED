$(document).ready(function() {
    // 初始化頁面
    $("#table1").hide();
    Init_Show(); // 後端抓取雲端資料(使用者借用的資料)並顯示於前端表單中

    // 點選取消預約按鈕
    $("button").click(function() {
        check_signing_in(); // 檢查登入
        cancel_lend(this); // 取消預約
    })

    //登出
    $("#signout").click(function() {
        sign_out();
    })
})

// ---------- Function ---------- //
// 初始化
function Init_Show() {
    var API = "http://127.0.0.1:1880/lending";
    $.post(
        API, {
            Uid: window.uid
        },
        function(res) {
            window.lending_info = res.Inf;
            var length = window.lending_info.length;
            for (i = 0; i < length; i++) {
                window.lending_info[i].Time = date_formate(window.lending_info[i].Time);
            }
            if (length != 0) {
                $("#inf").hide();
                $("#table1").show();
                var tb = ["#tb1", "#tb2", "#tb3", "#tb4", "#tb5"];
                var tblist = [
                    ["#tb1_td1", "#tb1_td2"],
                    ["#tb2_td1", "#tb2_td2"],
                    ["#tb3_td1", "#tb3_td2"],
                    ["#tb4_td1", "#tb4_td2"],
                    ["#tb5_td1", "#tb5_td2"]
                ];
                for (i = 0; i < 5; i++) {
                    if (i < length) {
                        $(tblist[i][0]).text(window.lending_info[i].Time);
                        $(tblist[i][1]).text(window.lending_info[i].lend);
                    } else {
                        $(tb[i]).hide();
                    }
                }
            }
        }
    )
}
// 取消預約
function cancel_lend(select) {
    var btn_list = ["btn1", "btn2", "btn3", "btn4", "btn5"]
    var btn_id = $(select).attr("id"); // 點選的取消預約按鈕
    for (i = 0; i < 5; i++) {
        if (btn_id == btn_list[i]) {
            if (confirm("確定取消此預約嗎?")) {
                API = "http://127.0.0.1:1880/web/delete_lending";
                $.post(
                    API, {
                        Inf: window.lending_info[i],
                        Uid: window.uid
                    },
                    function(res) {
                        var inf = res.Inf;
                        if (inf == 1) {
                            alert("取消預約成功!");
                            document.location.reload();
                        } else alert("取消預約失敗...");
                    })
            }
        }
    }
}
// 檢查登入
function check_signing_in() {
    var API = "http://127.0.0.1:1880/web/check_cookie";
    $.get(API);
}
// 登出
function sign_out() {
    var API = "http://127.0.0.1:1880/delete_uid";
    $.get(API);
    window.location.href = "http://127.0.0.1:1880/web/signin";
}
// 格式化日期
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