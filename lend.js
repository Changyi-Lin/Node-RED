$(document).ready(function() {
    // 初始化
    var Today = new Date();
    window.today = date_formate(Today);
    document.getElementById("selectdate").setAttribute("min", window.today);

    window.date_checked = 0;
    window.time_checked = 0;

    //登出
    $("#signout").click(function() {
        var API = "http://127.0.0.1:1880/delete_uid";
        $.get(API);
        window.location.href = "http://127.0.0.1:1880/web/signin"
    })

    //確認時間
    $("#selectdate").change(function() {

        // 檢查逾時
        check_signing_in();

        var id_list = ["#myCheck1", "#myCheck2", "#myCheck3", "#myCheck4",
            "#myCheck5", "#myCheck6", "#myCheck7", "#myCheck8"
        ];

        // 重新初始化選單
        window.date_checked = 1;
        window.time_checked = 0;
        for (i = 0; i < 8; i++) {
            document.myform.mycheck[i].checked = false;
            $(id_list[i]).attr("disabled", false);
        }

        // 抓取選擇的日期
        window.select_date = document.getElementById("selectdate").value;
        check_selecttime(window.select_date);

        // 查詢借閱情況
        lend_status();

    })

    //確定借閱
    $("#btnset").click(function() {

        // 檢查逾時
        check_signing_in();

        window.alarm = 0;

        var lend = new Array(8);
        var select_time = document.myform.mycheck; //所選時段
        for (i = 0; i < 8; i++) {
            if (select_time[i].checked == true) {
                window.time_checked = 1;
                lend[i] = window.uid;
            } else lend[i] = 0;
        }

        double_check(window.select_date, lend);

        if (window.date_checked && window.time_checked) {
            if (window.alarm == 0) {
                if (confirm("確定預約?")) {
                    var API = "http://127.0.0.1:1880/lend";
                    $.post(
                        API, {
                            Lend: lend,
                            Lend_status: window.status,
                            Lend_date: window.select_date,
                            Time: window.feedback_time,
                            Uid: window.uid,
                            Today: window.today
                        },
                        function(res) {
                            var ok = res.OK;
                            if (ok == "OK") {
                                var lendtimes = res.Lendtimes + 1;
                                alert("預約成功! \n您目前已預約" + lendtimes + "筆。");
                                document.location.reload();
                            } else if (ok == "OVER") {
                                alert("您已達預約次數上限(5筆)");
                                document.location.reload();
                            }
                        });
                }
            } else {
                alert("有時段已被預約。");
                document.location.reload();
            }
        } else if (!window.date_checked && window.time_checked) alert("請選擇預約日期!");
        else if (window.date_checked && !window.time_checked) alert("請選擇預約時段!");
        else alert("請選擇預約日期與時段。");
    })
})

function date_formate(date) {
    date = new Date(date);
    var date_year = date.getFullYear();
    var date_month = date.getMonth() + 1;
    var date_day = date.getDate() + 1;
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

function check_signing_in() {
    var API = "http://127.0.0.1:1880/web/check_cookie";
    $.get(API);
}

function lend_status() {
    var API = "http://127.0.0.1:1880/check_time";
    $.post(
        API, {
            Time: window.select_date
        },
        function(res) {
            var id_list = ["#myCheck1", "#myCheck2", "#myCheck3", "#myCheck4",
                "#myCheck5", "#myCheck6", "#myCheck7", "#myCheck8"
            ];
            window.feedback_time = res.Feedback; // 回傳借閱情況
            window.status = res.Status; // 借閱狀態:Part/All
            if (window.feedback_time) {
                for (i = 0; i < 8; i++) {
                    if (window.feedback_time[i]) {
                        $(id_list[i]).attr("disabled", true);
                    }
                }
            } else {
                for (i = 0; i < 8; i++) {
                    $(id_list[i]).attr("disabled", false);
                }
            }
        }
    )
}

function double_check(select_date, lend) {
    var API = "http://127.0.0.1:1880/check_time";
    $.post(
        API, {
            Time: select_date
        },
        function(res) {
            window.feedback_time = res.Feedback;
            if (window.feedback_time != 0) {
                for (i = 0; i < 8; i++) {
                    if (lend[i] && window.feedback_time[i]) {
                        window.alarm = 1;
                        break;
                    }
                }
            }
        });
}

function check_selecttime(time) {
    time = new Date(time);
    var time_day = time.getDay();
    if (time_day == 0 || time_day == 6) {
        alert("假日不可預約!");
        window.location.reload();
    }
}