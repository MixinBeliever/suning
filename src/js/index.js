var count = 0;
var img_lis = $('.banner li');
var lis_count = $('.banner li').length;
var point_lis = $('.point_lists li');
var prev = $('.prev');
var next = $('.next');
var id;
function sliderTo(index){
    if(index > lis_count -1){
        index = 0 ;
        count = 0 ;
    }
    if(index < 0){
        index = lis_count - 1;
        count = lis_count - 1;
    }
    $('li.point_cur').removeClass('point_cur');
    $('.point_lists li').eq(index).addClass('point_cur');
    $('.banner li.cur').removeClass('cur');
    $('.banner li').eq(index).addClass('cur');
}

prev.on('click',function(){
    count--;
    sliderTo(count);
})
next.on('click',function(){
    count++;
    sliderTo(count);
})

point_lis.on('click',function(){
   //console.log($(this).index());
   count = $(this).index();
   sliderTo(count);
})

function autoPlay() {
   id = setInterval(function() {
        count++;
        sliderTo(count);
    }, 3000) 
}
autoPlay();
function stopPlay() {
    clearInterval(id);
}

img_lis.on('mouseover',function () {
    stopPlay();
})
img_lis.on('mouseout',function () {
    autoPlay();
})

//头顶打广告

document.querySelector('.top-active .close').onclick = function(){
    console.log('aaa');
    document.querySelector('.top-active').style.display = 'none';
}
window.onload = function(){
    setTimeout(function(){
        document.querySelector('.top-active').style.display = 'block';
    },3000)
}
//header部分的js
//左边的ul
var header_lis = $('ul.l li.first_lay');
header_lis.hover(function(){
    $(this)[0].style.borderBottom = '1px solid #fff;';
    $(this).find('div.two_menu').slideDown(500);
}, function () {
    $(this).find('div.two_menu').hide();
})  
//右边的ul
var header_right_lis = $('ul.r li.right_lis');
    header_right_lis.hover(function () {
        $(this)[0].style.borderBottom = '1px solid #fff;';
        $(this).find('div:first').slideDown(500);
    }, function () {
        $(this).find('div:first').hide();
    }) 
//a.add
document.querySelector('a.add').onclick = function(){
    document.querySelector('.top-active').style.display = 'block';
}
//nav部分
$('#input_search,#history_box').click(function (evt) {
    $('#history_box').slideDown(200);
        evt.stopPropagation();//阻止事件冒泡
        return;
})

$('#close').on('click', function (evt) {
        evt.stopPropagation();
        $('#history_box').hide();

    })

$(document).on('click',function(evt) {
    $('#history_box').hide();
    $('.jsonp-data').hide();
})


//nav部分cookie存储
var search_arr;  
if(localStorage.getItem('search_list')){
    search_arr =JSON.parse(localStorage.getItem('search_list'));
}else{
    search_arr = [];
}
$('#btn_search').click(function(){
    var entry_value = $('#input_search').val();
    entry_value  =   entry_value.replace(/^\s+|\s+$/g,"");
    if(entry_value !== ''){
        var confident = search_arr.indexOf(entry_value);
        if(confident !== -1){
            search_arr.splice(confident,1);
        }
        search_arr.unshift(entry_value);
        if(search_arr.length >= 7){
        search_arr.length = 7;
    }
        localStorage.setItem('search_list',JSON.stringify(search_arr));  
    }
})
$('#input_search').focus(function(){
    $('#search_history li:not(".need")').remove();
    var search_value =JSON.parse(localStorage.getItem('search_list'));
    if(search_value==''){
        return;
    }
    for(var i = 0; i< search_value.length;i++){
        var li = $('<li></li>');
        li.html(search_value[i]+'<span class="liqing" >X</span>');
        li.appendTo('#search_history');
    }
})
$('#search_history').on('click','.liqing',function(evt){
    $(this).parents('li').remove();
    var del_v = $(this)[0].previousSibling.nodeValue;
    var search_value =JSON.parse(localStorage.getItem('search_list'));
    var confident = search_value.indexOf(del_v);
        if(confident !== -1){
            search_value.splice(confident,1);
        }
    search_arr = search_value;    
    localStorage.setItem('search_list',JSON.stringify(search_value));
    evt.stopPropagation();
})
$('#search_history').on('click','li:not(".need")',function(evt){
    $('#input_search').val($(this)[0].childNodes[0].nodeValue); 
    $('#history_box').hide();
    evt.stopPropagation();
})

//navJsonP
https://ds.suning.cn/ds/his/new/-des-0-1_0-autoComplateCallback_184b31b125a59d8c382d3d8382d23350.jsonp?callback=autoComplateCallback_184b31b125a59d8c382d3d8382d23350&_=1551232224401
var jsonpdata = document.querySelector('.jsonp-data');   
function resData(data){
    var res = data.words;
    var allp = jsonpdata.children;
    $(allp).remove();
    console.log(allp);
    for(var i = 2; i<res.length; i++){
        var p = document.createElement('p');
        p.innerHTML  = res[i].keyword;
        jsonpdata.appendChild(p);
        p.onclick = function(){
            document.querySelector('#input_search').value = this.innerHTML;
            jsonpdata.style.display = 'none';
        }
       
    }
}
document.querySelector('#input_search').onkeyup = function(){
    var entryValue = this.value;
    if(entryValue !== ''){
        jsonpdata.style.display = 'block';
    }
    var script = document.createElement('script');
    script.src = 'https://ds.suning.cn/ds/his/new/-'+entryValue+'-0-1_0-resData.jsonp?callback=resData';
    document.body.appendChild(script);
}

//头条部分
var toutiao_ul = $('.toutiao .clearfix.first');
var half_ul = toutiao_ul.height() / 2;
setInterval(function(){
    var res =parseInt(toutiao_ul.css('margin-top'));
    var final = res - half_ul;
    if(final == (-half_ul*3)){
        toutiao_ul[0].style.transitionDuration = '0s';
        toutiao_ul[0].style.marginTop = 0 + 'px';
        setTimeout(function(){
            final = -half_ul;
            toutiao_ul[0].style.transitionDuration = '';
            toutiao_ul[0].style.marginTop = final + 'px';
        },16)
        return; 
    }
    toutiao_ul[0].style.marginTop = final + 'px';
},3000)

//轮播下面那块  

//调场次那个
var allP = document.querySelectorAll('.toggle p');
var display_ul = document.querySelectorAll('.discover ul');
for( var i = 0; i<allP.length; i++){
allP[i].index = i;
allP[i].onmouseover = function(){
    document.querySelector('.toggle .current').className = '';
    document.querySelector('.discover ul#current').id = '';
    this.className = 'current';
    display_ul[this.index].id = 'current';
}
}

//出来俩按钮的那个
$('.discover .first_toggle,.discover span.control').mouseenter(function(){
$('.discover span.control').show();
}).mouseleave(function(){
$('.discover span.control').hide();
})


var first_toggle = document.querySelector('.first_toggle');
var toggle_index = 0;
var toggle_W = 1000;
document.querySelector('.next-btn.control').onclick = function() {
toggle_index++;
if(toggle_index == 4){
    toggle_index = 0;
    first_toggle.style.transitionDuration = '0s';
    first_toggle.style.left = toggle_W*-toggle_index +'px';
    setTimeout(function(){
        toggle_index = 1;
        first_toggle.style.transitionDuration = '';
        first_toggle.style.left = toggle_W*-toggle_index +'px';
    },50)
    return;
}
first_toggle.style.transitionDuration = '';
first_toggle.style.left = toggle_W*-toggle_index +'px';
}  
document.querySelector('.prev-btn.control').onclick = function() {
toggle_index--;
console.log(toggle_index);
if(toggle_index == -1){
    toggle_index = 3;
    first_toggle.style.transitionDuration = '0s';
    first_toggle.style.left = toggle_W*(-toggle_index) +'px';
    setTimeout(function(){
        toggle_index = 2;
        first_toggle.style.transitionDuration = '';
        first_toggle.style.left = toggle_W*-toggle_index +'px';
    },50)
    return;
}
first_toggle.style.transitionDuration = '';
first_toggle.style.left = toggle_W*-toggle_index +'px';
}

//必抢清单
