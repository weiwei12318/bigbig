/*
 * @Author: your name
 * @Date: 2021-01-03 15:46:56
 * @LastEditTime: 2021-01-03 21:44:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigEvent\assets\js\login.js
 */
$(function(){
  // 切换登录和注册
    // 去注册账号
    $("#goregi").on("click",function(){
      $("#loginForm").hide();
    $("#registerForm").show();
    
    })
    // 去登录账号
$("#gologin").on("click",function(){
  $("#registerForm").hide();
  $("#loginForm").show();
})
// 配置根路径
$.ajaxPrefilter(
  function(option){
    option.url='http://ajax.frontend.itheima.net'+option.url
     }
)
    // 注册-发送请求
$("#registerForm").on("submit",function(e){
  e.preventDefault();
  let data=$(this).serialize();
  $.ajax({
    type:"POST",
    url:"/api/reguser",
    data,
  success:function(res){
    console.log(res)
    if(res.status!==0){
         return layer.msg(res.message);
    }
    else {
      $("#gologin").click();
    //  $("#loginForm [name=username]").click();
      return layer.msg('注册成功');
    }
  }}
  )
})
// 登录-发送请求
$("#loginForm").on("submit",function(e){
  e.preventDefault();
  let data=$(this).serialize();
  $.ajax({
    type:"POST",
    url:'/api/login',
    data,
    success:function(res){
      console.log(res)
      if(res.status!==0){
                return layer.msg(res.message);
      }
      else {
                layer.msg('登录成功,等待即将跳转', {
               time: 2000 //2秒关闭（如果不配置，默认是3秒）
        }, function(){
          return location.href="index.html";
        }); 
            }
    }}
    )
  })



let form = layui.form
form.verify({
    repwd: function(value, item){
// value：表单的值、item：表单的DOM对象
console.log(value)
console.log(item)
let pwd=$("#registerForm [name=password]").val();
if(pwd!==value){return alert("两次输入的密码不一致,请重试")}
    }
        //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    ,pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] 
});     
})