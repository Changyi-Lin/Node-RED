$(document).ready(function()
    {
        check();

        $("#switchon").click(function()
        {   
            check_uid();
            check();
            switch_on();
        })

        $("#switchoff").click(function()
        {   
            check_uid();
            check();
            switch_off();
        })
    }
    
)

function check()
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
            var length = window.inf.length; 
            
            var Tdate=new Date();
            window.Tyear=Tdate.getFullYear();
            window.Tmonth=Tdate.getMonth();
            window.Tday=Tdate.getDate();
            window.currrent_h=Tdate.getHours();
            if(window.currrent_h>=8 && window.currrent_h<=17)
            {
                if(window.currrent_h<12)
                {
                    var j = window.currrent_h-8;
                }
                else
                {
                    var j = window.currrent_h-13+4;
                }
                var hour_index = ["A","B","C","D","F","G","H","I"];
                var current_index = hour_index[j];
            }

            for(i=0;i<length;i++)
            {
                var date_index = new Date(window.inf[i].Time);
                if( date_index.getFullYear() == window.Tyear)
                {
                    console.log(1);
                    if( date_index.getMonth() == window.Tmonth)
                    {
                        if( date_index.getDate() == window.Tday)
                        {
                            var index = window.inf[i].lend.split("");
                            var index_length = index.length;
                            console.log(index);
                            for(i=0;i<index_length;i++)
                            {
                                if(index[i] == current_index)
                                {
                                    window.check_flag = 1;
                                }
                            }
                            
                        }    
                    }
                }
            }

            if(window.check_flag!=1)
            {
                switch_off();
                window.alert("目前非您的借閱時間");
                //window.location.href="http://127.0.0.1:1880/web/lending";
            }
        }
    )
}

function switch_on()
{
    var info=1;
    var API ="http://127.0.0.1:1880/switch";
    $.post
        (
            API,
            {
                Info:info
            }
        );
}

function switch_off()
{
    var info=0;
    var API ="http://127.0.0.1:1880/switch";
    $.post
        (
            API,
            {
                Info:info
            }
        );
}

function check_uid()
{
    var API = "http://127.0.0.1:1880/web/check_uid"
            $.get
            (
                API
            );
}