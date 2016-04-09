/**
 * Created by qc on 2016/4/7.
 */
var today=new Date();
var year=today.getFullYear();//获取今天的年份
var month=today.getMonth();//获取今天的月份
var holidays=["0101 元旦","0214 情人节","0308 妇女节","0312 植树节","0315 消费权利日","0318 爱肝日",
    "0401 愚人节","0404 清明节","0422 地球日","0501 劳动节","0504 青年节","0512 护士节","0601 儿童节",
    "0701 建党节","0722 世界人口日","0801 建军节","0910 教师节","1001 国庆节","1201 艾滋病日","1225 圣诞节"];
var getDay=document.getElementsByClassName("addDay");
var getSy=document.getElementById("selectYear");
var getSm=document.getElementById("selectMonth");
var getml=document.getElementById("ml");
var getmr=document.getElementById("mr");
var getDate=document.getElementsByTagName("tr")[1];
(function initYearAndMonth()
{
    for(var i=-50;i<50;i++)
    {
        var obj=document.createElement("option");
        obj.innerHTML=today.getFullYear()+i;
        obj.value=today.getFullYear()+i;
        getSy.appendChild(obj);
    }
    for(var i=0;i<12;i++)
    {
        var  obj=document.createElement("option");
        obj.innerHTML=i+1;
        obj.value=i;
        getSm.appendChild(obj);
    }
    getSy.selectedIndex=50;
    getSy.style.fontWeight="bold";
    getSm.selectedIndex=today.getMonth();
    getSm.style.fontWeight="bold";
    show(year,month);
})();


function isLeapYear(year){
    if(year%4==0 && year%100!=0){
        return true;
    }
    else{
        if(year%400==0){
            return true;
        }
        else{
            return false;
        }
    }
}


function isToday(year,month,date)
{
    if(today.getFullYear()==year&&today.getMonth()==month&&today.getDate()==date)
    {
        if(today.getMonth()==month)
        {
            if(today.getDate()==date)
            {
                return true;
            }
        }
    }
    return false;
}


function thisDays(year,month)//计算该年该月的天数
{
    month++;
    if(month==1||month==3||month==5||month==7||month==8||month==10||month==12)return 31;
    else if(month==4||month==6||month==9||month==11)return 30;
    else if(month==2)
    {
        if(isLeapYear(year))return 29;
        return 28;
    }
}


function show(year,month)
{
    var first=new Date(year,month,1);//该年该月1日
    var before=parseInt(first.getDay());//该年该月的第一天之前的空余天数
    for(var i=0;i<before;i++)//显示每月开始前的空余天数
    {
       var d=document.createElement("td");
        d.className="addDay";
        getDate.appendChild(d);
    }
    for(var i=0;i<thisDays(year,month);i++)
    {
       var d=document.createElement("td");
        d.className="addDay";
        getDate.appendChild(d);
        d.innerHTML="<span>"+(i+1)+"</span>";
        var date=i+1;
        if(isToday(year,month,date))
        {
            d.style.background="#68b1ed";
        }
    }
    for(var i=0;i<holidays.length;i++)
    {
        var mon=parseInt(holidays[i].slice(0,2))-1;
        var day=parseInt(holidays[i].slice(2,4))-1;
        var ho=holidays[i].slice(5);
        if(month==mon)
        {
            getDay[before+day].innerHTML+="<br>";
            getDay[before+day].innerHTML+="<span>"+ho+"</span>";
            getDay[before+day].style.background="#64dcff";
        }
    }
    if(month==4)
    {
        getDay[7].innerHTML+="<br>";//每年5月的第二个星期日
        getDay[7].innerHTML+="<span>"+"母亲节"+"</span>";
    }
    if(month==5)
    {
        getDay[7+7].innerHTML+="<br>";//每年6月的第三个星期日
        getDay[7+7].innerHTML+="<span>"+"父亲节"+"</span>";
    }
    if(month==10)
    {
        getDay[3*7+4].innerHTML+="<br>";//每年11月的第四个星期四
        getDay[3*7+4].innerHTML+="感恩节";
    }

}



function selected(s)
{
    switch(s.id)
    {
        case "selectYear":year= s.value;break;
        case "selectMonth":month= s.value;break;
    }
    getDate.innerHTML="";
    show(year,month);
    if(getSm.value==0)
    {
        getml.disabled=true;
    }
    else if(getSm.value==11)
    {
        getmr.disabled=true;
    }
    else  {getmr.disabled=false;
        getml.disabled=false;
    }
}


getml.onclick=function()
{
    getmr.disabled=false;
    getDate.innerHTML="";
    show(year,--month);
    getSm.value--;
    if(getSm.value==0)
    {
        getml.disabled=true;
    }
}


getmr.onclick=function()
{
    getml.disabled=false;
    getDate.innerHTML="";
    show(year,++month);
    getSm.value++;
    if(getSm.value==11)
    {
        getmr.disabled=true;
    }
}

document.getElementById("yl").onclick=function()
{
    getDate.innerHTML="";
    show(--year,month);
    getSy.value--;
}

document.getElementById("yr").onclick=function()
{
    getDate.innerHTML="";
    show(++year,month);
    getSy.value++;
}





