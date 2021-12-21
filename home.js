    $(document).ready(function() {
        window.page_num = 0;
        window.Today = new Date(); // 今天的日期
        Check_toSwitchWeb();
        Find_and_Show(window.Today, 0);

        // 登出
        $("#signout").click(function() {
                sign_out();
            })
            // 前往使用介面
        $("#ToSwitchButton").click(function() {
            check_signing_in();
            window.location.href = "http://127.0.0.1:1880/web/switch";
        })
        $("#previous").click(function() {
            check_signing_in();
            window.page_num -= 1;
            if (!window.page_num) $("#previous").attr("disabled", true);
            if (window.page_num == 2) $("#next").attr("disabled", false);

            Find_and_Show(window.Today, window.page_num);
        })
        $("#next").click(function() {
            check_signing_in();
            window.page_num += 1;
            if (window.page_num == 3) $("#next").attr("disabled", true);
            if (window.page_num > 0) $("#previous").attr("disabled", false);

            Find_and_Show(window.Today, window.page_num);
        })
    })

    function Find_and_Show(date, num) {
        var rangetime = RangeTime(addDaysToDate(date, num * 7));
        var week = Build_week(addDaysToDate(date, num * 7));
        Show_WeekData(rangetime, week);
    }

    function Show_WeekData(range, week) {
        var API = "http://127.0.0.1:1880/getData";
        $.post(
            API, {
                Range: range,
                Uid: window.uid
            },
            function(res) {
                var rangedatas = lendData_formate(res.RangeDatas); //後端回傳資料
                var length = rangedatas.length;
                const Day_ID = ["#Day1", "#Day2", "#Day3", "#Day4", "#Day5", "#Day6", "#Day7"];
                const Time_ID = [
                    ["#1-1", "#2-1", "#3-1", "#4-1", "#5-1", "#6-1", "#7-1", "#8-1"],
                    ["#1-2", "#2-2", "#3-2", "#4-2", "#5-2", "#6-2", "#7-2", "#8-2"],
                    ["#1-3", "#2-3", "#3-3", "#4-3", "#5-3", "#6-3", "#7-3", "#8-3"],
                    ["#1-4", "#2-4", "#3-4", "#4-4", "#5-4", "#6-4", "#7-4", "#8-4"],
                    ["#1-5", "#2-5", "#3-5", "#4-5", "#5-5", "#6-5", "#7-5", "#8-5"],
                    ["#1-6", "#2-6", "#3-6", "#4-6", "#5-6", "#6-6", "#7-6", "#8-6"],
                    ["#1-7", "#2-7", "#3-7", "#4-7", "#5-7", "#6-7", "#7-7", "#8-7"]
                ];
                for (i = 0; i < 7; i++) {
                    // 顯示日期
                    $(Day_ID[i]).text(week[i][1]);
                    // 篩選假日
                    if (week[i][2] == 0 || week[i][2] == 6) {
                        for (j = 0; j < 8; j++) {
                            $(Time_ID[i][j]).text("X");
                            $(Time_ID[i][j]).attr("class", "status_X");
                        }
                    } else {
                        for (k = 0; k < length; k++) {
                            if (week[i][0] == rangedatas[k][0]) {
                                for (n = 0; n < 8; n++) {
                                    if (rangedatas[k][1][n]) {
                                        if (rangedatas[k][1][n] == window.uid) {
                                            $(Time_ID[i][n]).text("U");
                                            $(Time_ID[i][n]).attr("class", "status_U");
                                        } else {
                                            $(Time_ID[i][n]).text("L");
                                            $(Time_ID[i][n]).attr("class", "status_L");
                                        }

                                    } else {
                                        $(Time_ID[i][n]).text("O");
                                        $(Time_ID[i][n]).attr("class", "status_O");
                                    }
                                }
                                break;
                            } else {
                                for (m = 0; m < 8; m++) {
                                    $(Time_ID[i][m]).text("O");
                                    $(Time_ID[i][m]).attr("class", "status_O");
                                }
                            }
                        }
                    }
                }
            }
        );
    }
    // 建立一週的時間(年/月/日)
    function Build_week(date) {
        var res = [];
        for (i = 0; i < 7; i++) res.push([date_formate(addDaysToDate(date, i)), getMD(addDaysToDate(date, i)), addDaysToDate_getWeek(date, i)]);
        return res;
    }

    // 格式借用資料(JSON To Array)
    function lendData_formate(data) {
        var length = data.length;
        var res = [];
        for (i = 0; i < length; i++) res.push([date_formate(data[i].Time), [data[i].A, data[i].B, data[i].C, data[i].D, data[i].F, data[i].G, data[i].H, data[i].I]]);
        return res;
    }

    // 找出第一天與第七天的日期，並格式化
    function RangeTime(date) {
        var res = [date_formate(date)];
        res.push(date_formate(addDaysToDate(date, 6)));
        return res;
        // 回傳第一天至第七天
    }

    // 格式化日期(月/日(星期))
    function getMD(date) {
        date = new Date(date);
        var date_month = date.getMonth() + 1;
        var date_day = date.getDate();
        var week = date.getDay();
        const week_text = ["日", "一", "二", "三", "四", "五", "六"]
        var res = date_month + "/" + date_day + " (" + week_text[week] + ")";
        return res;
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

    // 增加天數
    function addDaysToDate(date, days) {
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }

    // 增加天數-得星期
    function addDaysToDate_getWeek(date, days) {
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        res = res.getDay();
        return res;
    }
    // 檢查當前時段是否為使用者借閱時段
    function Check_toSwitchWeb() {
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

                if (inf[j] == window.uid) {
                    $("#ToSwitchButton").attr("disabled", false);
                    document.getElementById("ToSwitchButton").style['background-color'] = '#FF792C';
                    document.getElementById("ToSwitchButton").innerHTML = "前往控制介面";
                }
            }
        )
    }
    // 檢查登入狀態
    function check_signing_in() {
        var API = "http://127.0.0.1:1880/web/check_cookie";
        $.get(API);
    }

    function check_lending_time() {
        var API = "http://127.0.0.1:1880/lending";
        $.post(
            API, {
                Uid: window.uid
            },
            function(res) {
                window.inf = res.Inf;
                var length = window.inf.length;
                for (i = 0; i < length; i++) {
                    window.inf[i].Time = date_formate(window.inf[i].Time);
                }
                console.log(window.inf);
            }
        )
    }

    function sign_out() {
        var API = "http://127.0.0.1:1880/delete_uid";
        $.get(API);
        window.location.href = "http://127.0.0.1:1880/web/signin";
    }