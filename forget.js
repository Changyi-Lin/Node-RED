$(document).ready(function()
    {   
        $("#input").click(function()
        {   
           forget();
        })
    }
)

function forget(){
    var stdid = $("#stdid").val();
    var email = $("#email").val();
    var check=1;
    if(!stdid)
    {
        check=0;
        $("#stdid").attr("class","form_alart");
        $("#stdid_alarm").attr("class","alarm");
    }
    else 
    {
        $("#stdid").attr("class","form");
        $("#stdid_alarm").attr("class","nothing");
    }
    if(!email)
    {
        check=0;
        $("#email").attr("class","form_alart");
        $("#email_alarm").attr("class","alarm");
    }
    else
    {
        $("#email").attr("class","form");
        $("#email_alarm").attr("class","nothing");
    }
    
    if(check==1)
    {
        var API = "http://127.0.0.1:1880/forget";
        $.post
        (
            API,
            {
                Std_id:stdid,
                Email:email
            },
                function(res)
                {
                    var info=res.Info;
                    var status=res.Status;
                    var password=res.Password;
                    if (info == 0)
                    {
                        window.alert("此帳號尚未註冊。");
                        window.location.reload(); 
                    }
                    else
                    {
                        if(info==2)
                        {
                            window.alert("此信箱與註冊時的信箱不符。\n\n若忘記原註冊信箱請洽管理單位。");
                            window.location.reload(); 
                        }
                        else
                        {     
                        
                            if(status == 1)
                            {
                            var API = "http://127.0.0.1:1880/web/forget/send";
                             $.post
                                (
                                    API,
                                    {
                                      Email:email,
                                      Password:password
                                    },
                                );
                           window.alert("已將密碼寄至信箱");
                           window.location.href="http://127.0.0.1:1880/web/signin";
                            }
                        
                            else
                            {
                            window.alert("帳號尚未認證");
                            }
                        }    
                    }
                }
        );
    }              
}

function IsEnterKeyPress(){
    var lKeyCode = (navigator.appname=="Netscape")?event.which:window.event.keyCode;
    if ( lKeyCode == 13 ) {
        forget();
    }
}