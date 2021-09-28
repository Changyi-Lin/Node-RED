$(document).ready(function()
    {
        //當日的年月日
        var Today = new Date();
        var today_year = Today.getFullYear();
        var today_month = Today.getMonth()+1;
        var today_day = Today.getDate()+1;
        if(today_day<10)
        { 
            today_day='0'+today_day;
        } 
        if(today_month<10)
        { 
            today_month='0'+today_month; 
        } 
        window.today = today_year+"-"+today_month+"-"+(today_day);
        document.getElementById("selectdate").setAttribute("min", window.today); 
        //初始化
        window.date_checked=0;

        //登出
        $("#signout").click(function()
        {   
            var API = "http://127.0.0.1:1880/delete_uid";
            $.get
                (API);
            window.location.href="http://127.0.0.1:1880/web/signin"
        })

        //確認時間
        $("#selectdate").change(function()
        {
            //檢查逾時
            var API = "http://127.0.0.1:1880/web/check_uid";
            $.get
            (
                API
            );
            
            //重新初始化選單
            window.date_checked=1;
            window.time_checked=0;
            var id_list=["#myCheck1","#myCheck2","#myCheck3","#myCheck4","#myCheck5","#myCheck6","#myCheck7","#myCheck8"];
            var label_id_list=["#myCheck1_lb","#myCheck2_lb","#myCheck3_lb","#myCheck4_lb","#myCheck5_lb","#myCheck6_lb","#myCheck7_lb","#myCheck8_lb"];
            for(i=0;i<8;i++)
            {
                document.myform.mycheck[i].checked = false;
            }
            for(i=0;i<8;i++)
            {
                $(id_list[i]).attr("disabled",false);
            }
            var Time = document.getElementById("selectdate").value;
            var API="http://127.0.0.1:1880/check_time";
            window.time=Time;
            $.post
                (
                    API,
                    {
                        Time:window.time
                    },
                    function(res)
                    {
                        var id_list=["#myCheck1","#myCheck2","#myCheck3","#myCheck4","#myCheck5","#myCheck6","#myCheck7","#myCheck8"];
                        var label_id_list=["#myCheck1_lb","#myCheck2_lb","#myCheck3_lb","#myCheck4_lb","#myCheck5_lb","#myCheck6_lb","#myCheck7_lb","#myCheck8_lb"];
                        window.feedback_time=res.Feedback;//回傳借閱情況
                        window.status=res.Status;//借閱狀態:Part/All
                        if(window.feedback_time)
                        {
                            for(i=0;i<8;i++)
                            {
                                if (window.feedback_time[i]) 
                                {
                                    $(id_list[i]).attr("disabled",true); 
                                } 
                            }
                        }
                        else 
                        {
                            for(i=0;i<8;i++)
                            {
                                $(id_list[i]).attr("disabled",false); 
                            }
                        }
                    }
                )
            }      
        )

        //確定借閱
        $("#btnset").click(function()
        {
            //檢查逾時
            var API = "http://127.0.0.1:1880/web/check_uid"
            $.get
            (
                API
            );

            var lend = new Array(8)
            var settime=document.myform.mycheck;//所選時段
            window.time_checked=0;
            for (i=0;i<8;i++)
            {
                if (settime[i].checked==true) 
                {
                    window.time_checked=2;
                    lend[i]=window.user_id;
                }
                else lend[i]=0;
            }
            var send_checked=window.date_checked+window.time_checked;
            if(send_checked==3)
            {
                var API="http://127.0.0.1:1880/check_time";
                $.post
                (
                    API,
                    {
                        Time:window.time
                    },
                    function(res)
                    {
                        var dbchecked=res.Feedback;
                        window.alarm=0;
                        if(dbchecked!=0)
                        {
                            for(i=0;i<8;i++)
                            {
                                console.log("dbchecked");
                                if(lend[i]==window.user_id && dbchecked[i]!=0)
                                {
                                    window.alarm=1;
                                    break;

                                }
                            }
                        }
                        if(window.alarm==0)
                        {
                            if(confirm("確定借閱?"))
                            {
                                var API="http://127.0.0.1:1880/lend";
                                $.post
                                (
                                API,
                                {
                                    Lend:lend,
                                    Lend_status:window.status,
                                    Lend_date:window.time,
                                    Time:window.feedback_time,
                                    Stdid:window.uid
                                },
                                function(res)
                                {
                                    var ok=res.OK;
                                    if(ok=="OK")
                                    {
                                        var lendtimes=res.Lendtimes+1;
                                        alert("借閱成功! \n您目前已借閱"+lendtimes+"筆。");
                                        document.location.reload();
                                    }
                                    else if(ok=="OVER")
                                    {
                                        alert("您已達借閱次數上限(5筆)");
                                        document.location.reload();
                                    }
                                });
                            }
                        }
                        else 
                        {
                            alert("有時段已被借閱。") ;
                            document.location.reload();
                        }
                    });
            }
            else if(send_checked==2) alert("請選擇預約日期!");
            else if(send_checked==1) alert("請選擇預約時段!");
            else alert("請選擇預約日期與時段。");
        })
    }
)