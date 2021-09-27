$(document).ready(function()
    {
        //初始化
        $("#table1").hide();
        var API="http://127.0.0.1:1880/lending";
        $.post
        (
            API,
            {
                Uid:window.uid
            },
            function(res)
            {
                window.inf=res.Inf;
                var length=window.inf.length;
                for(i=0;i<length;i++)
                {
                    window.inf[i].Time = timechange(window.inf[i].Time);
                }
                if(length!=0)
                {
                    $("#inf").hide();
                    $("#table1").show();
                    var tb=["#tb1","#tb2","#tb3","#tb4","#tb5"];
                    var tblist=
                    [
                        ["#tb1_td1","#tb1_td2"],
                        ["#tb2_td1","#tb2_td2"],
                        ["#tb3_td1","#tb3_td2"],
                        ["#tb4_td1","#tb4_td2"],
                        ["#tb5_td1","#tb5_td2"]
                    ];
                    for(i=0;i<5;i++)
                    {
                        if(i<length)
                        {
                            $(tblist[i][0]).text(window.inf[i].Time);
                            $(tblist[i][1]).text(window.inf[i].lend);
                        }
                        else
                        {
                            $(tb[i]).hide();
                        }
                    }
                }
            }
        )
        
        //取消預約按鈕
        $("button").click(function() 
        {
            //檢查逾時
            var API = "http://127.0.0.1:1880/web/check_uid"
            $.get
            (
                API
            );
            
            var btn_list=["btn1","btn2","btn3","btn4","btn5"]
            var btn_id=$(this).attr("id");
            for(i=0;i<5;i++)
            {
                if(btn_id==btn_list[i])
                {
                    if(confirm("確定取消此預約嗎?"))
                    {
                        API="http://127.0.0.1:1880/web/delete_lending";
                        $.post
                        (
                        API,
                        {
                            Inf:window.inf[i],
                            Uid:window.uid
                        },
                        function(res) 
                        {
                            var inf=res.Inf;
                            if(inf==1)
                            {
                                alert("取消預約成功!");
                                document.location.reload();
                            }    
                            else alert("取消失敗...");    
                        })
                    }
                }
            }
        })

        //登出
        $("#signout").click(function()
        {   
            var API = "http://127.0.0.1:1880/delete_uid";
            $.get
                (API);
            window.location.href="http://127.0.0.1:1880/web/signin"
        })
    }
)

//時間轉換
function timechange(time) 
{
    var t = new Date(time);
    var year = t.getFullYear();
    var month = t.getMonth()+1;
    var day = t.getDate();
    if(month<10)
    {
        month="0"+month;
    }
    if(day<10)
    {
        day="0"+day;
    }
    time=year+"-"+month+"-"+day;
    return time;    
}