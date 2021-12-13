    $(document).ready(function()
        {
            window.num = 0;
            window.Today  = new Date(); // 今天的日期
            Init_Show(window.Today);
            
            // 登出
            $("#signout").click(function()
            {   
                var API = "http://127.0.0.1:1880/delete_uid";
                $.get
                    (API);
                window.location.href="http://127.0.0.1:1880/web/signin"
            })
            // 前往使用介面
            $("#ToSwitchButton").click(function()
            {   
                var API = "http://127.0.0.1:1880/check_uid";
                $.get
                    (API);
                Check_toSwitchWeb();
            })
            $("#previous").click(function()
            {   
                window.num -= 1;
                if(!window.num) $("#previous").attr("disabled", true);
                if(window.num==2) $("#next").attr("disabled", false);

                Find_and_Show(window.Today, window.num);
            })
            $("#next").click(function()
            {   
                window.num += 1;
                if(window.num==3) $("#next").attr("disabled", true);
                if(window.num>0) $("#previous").attr("disabled", false);

                Find_and_Show(window.Today, window.num);
            })
        }
    )
    function Init_Show(date){
        var rangetime = RangeTime(date);
        var week      = Build_week(date);
        Show_WeekData(rangetime, week);
    }
    function Find_and_Show(date, num){
        var rangetime = RangeTime(addDaysToDate(date, num*7));
        var week      = Build_week(addDaysToDate(date, num*7));
        Show_WeekData(rangetime, week);
    }
    function Show_WeekData(range, week){
        var API = "http://127.0.0.1:1880/getData";
        $.post
        (
            API,
            {
                Range:range
            },
            function(res)
            {
                var rangedatas = lendData_formate(res.RangeDatas); //後端回傳資料
                var length     = rangedatas.length;
                const Day_ID = ["#Day1","#Day2","#Day3","#Day4","#Day5","#Day6","#Day7"];
                const Time_ID = [["#1-1","#2-1","#3-1","#4-1","#5-1","#6-1","#7-1","#8-1"],
                                 ["#1-2","#2-2","#3-2","#4-2","#5-2","#6-2","#7-2","#8-2"],
                                 ["#1-3","#2-3","#3-3","#4-3","#5-3","#6-3","#7-3","#8-3"],
                                 ["#1-4","#2-4","#3-4","#4-4","#5-4","#6-4","#7-4","#8-4"],
                                 ["#1-5","#2-5","#3-5","#4-5","#5-5","#6-5","#7-5","#8-5"],
                                 ["#1-6","#2-6","#3-6","#4-6","#5-6","#6-6","#7-6","#8-6"],
                                 ["#1-7","#2-7","#3-7","#4-7","#5-7","#6-7","#7-7","#8-7"]];
                for(i=0; i<7; i++)
                {
                    $(Day_ID[i]).text(week[i][1]);
                    if(week[i][2]==0 || week[i][2]==6) 
                    {
                        for(j=0; j<8; j++) {
                            $(Time_ID[i][j]).text("X");
                            $(Time_ID[i][j]).attr("class", "status_X");
                        }
                    }
                    else
                    {
                        for(k=0; k<length; k++)
                        {
                            if(week[i][0]==rangedatas[k][0])
                            {
                                for(n=0; n<8; n++)
                                {
                                    if(rangedatas[k][1][n]) 
                                    {
                                        $(Time_ID[i][n]).text("L");
                                        $(Time_ID[i][n]).attr("class", "status_L");
                                    }
                                    else
                                    {
                                        $(Time_ID[i][n]).text("O");
                                        $(Time_ID[i][n]).attr("class", "status_O");
                                    } 
                                }
                                break;
                            }
                            else
                            {
                                for(m=0; m<8; m++) {
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
    function Build_week(date){
        var res = [];
        for(i=0; i<7; i++) res.push([date_formate(addDaysToDate(date, i)), getMD(addDaysToDate(date, i)), addDaysToDate_getWeek(date, i)]);
        return res; 
    }

    // 格式借用資料(JSON To Array)
    function lendData_formate(data)
    {
        var length = data.length;
        var res    = [];
        for(i=0; i<length; i++) res.push([date_formate(data[i].Time), [data[i].A, data[i].B, data[i].C, data[i].D, data[i].F, data[i].G, data[i].H, data[i].I]]);
        return res;
    }

    // 找出第一天與第七天的日期，並格式化
    function RangeTime(date)
    {
        var res = [date_formate(date)];
        res.push(date_formate(addDaysToDate(date, 6)));
        return res;
        // 回傳第一天至第七天
    }

    // 格式化日期(月/日(星期))
    function getMD(date){
        date = new Date(date);
        var date_month = date.getMonth()+1;
        var date_day = date.getDate();
        var week = date.getDay();
        const week_text = ["日", "一", "二", "三", "四", "五", "六"]
        var res = date_month+"/"+date_day+" ("+week_text[week]+")";
        return res;
    }

    // 格式化日期
    function date_formate(date)
    {
        date = new Date(date);
        var date_year = date.getFullYear();
        var date_month = date.getMonth()+1;
        var date_day = date.getDate();
        if(date_day<10)
            { 
                date_day='0'+date_day;
            } 
            if(date_month<10)
            { 
                date_month='0'+date_month; 
            } 
        var res = date_year+"-"+date_month+"-"+date_day;
        return res;
        // 僅格式化 年-月-日
    }

    // 增加天數
    function addDaysToDate(date, days){
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }

    // 增加天數-得星期
    function addDaysToDate_getWeek(date, days){
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        res = res.getDay();
        return res;
    }

    function Check_toSwitchWeb()
    {
        window.check_flag = 0;
        var API = "http://127.0.0.1:1880/check";
        $.post
        (
            API,
            {
                Uid:window.uid
            },
            function(res)
            {
                window.inf=res.Inf;
                window.inf_length = window.inf.length; 
                
                var Tdate=new Date();
                window.Tyear=Tdate.getFullYear();
                window.Tmonth=Tdate.getMonth();
                window.Tday=Tdate.getDate();
                window.currrent_h=Tdate.getHours();
                
                var hour_index = ["A","B","C","D","F","G","H","I"];
                
                if(window.currrent_h>=8 && window.currrent_h<=17)
                {
                    if(window.currrent_h<12 && window.currrent_h>=8)
                    {
                        var j = window.currrent_h-8;
                    }
                    if(window.currrent_h>=13 && window.currrent_h<18)
                    {
                        var j = window.currrent_h-13+4;
                    }
                    window.current_index = hour_index[j];
                }

                for(i=0;i<window.inf_length;i++)
                {
                    window.date_index = new Date(window.inf[i].Time);
                    var index = window.inf[i].lend.split("");
                    var index_length = index.length;
                    for(k=0;k<index_length;k++)
                    {
                        if(index[k] == window.current_index)
                        {
                            window.check_flag = 1;
                        }
                    }
                }

                if(window.check_flag==0)
                {
                    window.alert("目前非您的借閱時間");
                }
                else window.location.href="http://127.0.0.1:1880/web/switch";
            }
        )
    }