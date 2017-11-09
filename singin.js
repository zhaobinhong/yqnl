/**
 * Created by Hovace on 17/10/30.
 */

var tagg=0;
//判断用户名是否存在
function isusername(){
    var username=$("#username").val();
    $.post("/index.php/Home/Login/isusername",{"username":username},function(data){
        if(data==1){
            $("#username_ts").css('display','block');
            $("#username_tss").text("用户名已存在");
        }else{
            $("#username_ts").css('display','none');
            $("#username_tss").text("");
        }
    });
}
//填写下一项时就比对密码是否一致
function bd_pass(){
    var password=$("#password").val();
    var password_qr=$("#password_qr").val();
    if(password!=password_qr){
        $("#password_qr_ts").css('display','block');
        $("#password_qr_tss").text("两次密码输入不一致");
        return false;
    }else{
        $("#password_qr_ts").css('display','none');
        $("#password_qr_tss").text("");
    }
}
//账号格式
function gs_username(){
    var reg = /^[a-zA-Z0-9_]{1,}$/;
    var username=$("#username").val();
    if(!reg.test(username)){
        $("#username_ts").css('display','block');
        $("#username_tss").text("用户名只允许数字,字母和下划线组成");
        return false;
    }
}
//姓名判断
function isname(){
    var name=$("#name").val();
    var ishanzi=/^[\u4e00-\u9fa5]+$/;
    var namel=name.length;
    if(ishanzi.test(name)){
        $("#name_ts").css('display','none');
        $("#name_tss").text("");
    }else{
        $("#name_ts").css('display','block');
        $("#name_tss").text("请输入真实姓名");
        return false;
    }
    if(namel>=2&&namel<6){
        $("#name_ts").css('display','none');
        $("#name_tss").text("");
    }else{
        $("#name_ts").css('display','block');
        $("#name_tss").text("请输入真实姓名");
        return false;
    }
    //姓名前3个字不能相同
    var name1=name.substr(0,1);
    var name2=name.substr(1,1);
    var name3=name.substr(2,1);
    if(name1==name2 && name1==name3 && name2==name3 || name1==name2){
        $("#name_ts").css('display','block');
        $("#name_tss").text("请输入真实姓名");
        return false;
    }else{
        $("#name_ts").css('display','none');
        $("#name_tss").text("");
    }
}
//判断身份证号
function iscode(){
    var code=$("#code").val();
    //判断身份证信息
    var iscode18=/^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X))+$/;
    if(iscode18.test(code)){
        $("#code_ts").css('display','none');

        $("#code_tss").text("");
    }else{
        $("#code_ts").css('display','block');
        $("#code_tss").text("您输入的身份证号码有误");
        return false;
    }
    var d=new Date();
    var nowyear=d.getFullYear();
    var qianyear=nowyear-70;
    var houyear=nowyear-18;
    var myyear=Number(code.substr(6,4));
    if(myyear<qianyear || myyear>houyear){
        $("#code_ts").css('display','block');
        $("#code_tss").text("请输入正确身份证号");
        return false;
    }else{
        $("#code_ts").css('display','none');
        $("#code_tss").text("");
    }
    //身份证中根据年份月份判断当前月份的天数
    var mymonth=Number(code.substr(10,2));
    var  maxday = new Date(myyear,mymonth,0).getDate();
    var myday=Number(code.substr(12,2));
    if(myday>maxday){
        $("#code_ts").css('display','block');
        $("#code_tss").text("请输入正确身份证号");
        return false;
    }else{
        $("#code_ts").css('display','none');
        $("#code_tss").text("");
    }
    var res= IdentityCodeValid(code);
    if(res==false){
        $("#code_ts").css('display','block');
        $("#code_tss").text("请输入正确身份证号");
        return false;
    }else{
        $("#code_ts").css('display','none');
        $("#code_tss").text("");
    }
}

function isMobil(s)
{
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(s)))
    {
        return false;
    }
    return true;
}

//判断手机号
function isphone()
{
    var res = isMobil($("#phone").val());
    if(res==false){
        $("#phone_ts").css('display','block');
        $("#phone_tss").text("请输入正确手机号");
        return false;
    }else{
        $("#phone_ts").css('display','none');
        $("#phone_tss").text("");
    }
}

//判断输入的值是否为空
$("#acceptbtn").click(function(){

    var username=$("#username").val();
    var password=$("#password").val();
    var password_qr=$("#password_qr").val();
    var name=$("#name").val();
    var email=$("#email").val();
    var code=$("#code").val();


    if(username==""){
        $("#username_ts").css('display','block');
        $("#username_tss").text("请输入账号");
        return false;
    }else{
        $("#username_ts").css('display','none');
        $("#username_tss").text("");
    }
    if(password==""){
        $("#password_ts").css('display','block');
        $("#password_tss").text("请输入密码");
        return false;
    }else{
        $("#password_ts").css('display','none');
        $("#password_tss").text("");
    }
    if(password_qr==""){
        $("#password_qr_ts").css('display','block');
        $("#password_qr_tss").text("请再次输入密码");
        return false;
    }else{
        $("#password_qr_ts").css('display','none');
        $("#password_qr_tss").text("");
    }
    if(name==""){
        $("#name_ts").css('display','block');
        $("#name_tss").text("请输入真实姓名");
        return false;
    }else{
        $("#name_ts").css('display','none');
        $("#name_tss").text("");
    }
    if(code==""){
        $("#code_ts").css('display','block');
        $("#code_tss").text("请输入身份证号");
        return false;
    }else{
        $("#code_ts").css('display','none');
        $("#code_tss").text("");
    }

    if(phone==""){
        $("#phone_ts").css('display','block');
        $("#phone_tss").text("请输入手机号");
        return false;
    }else{
        $("#phone_ts").css('display','none');
        $("#phone_tss").text("");
    }

    //判断两次密码是否一致
    if(password!=password_qr){
        $("#password_qr_ts").css('display','block');
        $("#password_qr_tss").text("两次密码输入不一致");
        return false;
    }else{
        $("#password_qr_ts").css('display','none');
        $("#password_qr_tss").text("");
    }
    //判断身份证信息
    var iscode18=/^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X))+$/;
    if(iscode18.test(code)){
        $("#code_ts").css('display','none');
        $("#code_tss").text("");
    }else{
        $("#code_ts").css('display','block');
        $("#code_tss").text("您输入的身份证号码有误");
        return false;
    }
    var d=new Date();
    var nowyear=d.getFullYear();
    var qianyear=nowyear-70;
    var houyear=nowyear-18;
    var myyear=Number(code.substr(6,4));
    if(myyear<qianyear || myyear>houyear){
        $("#code_ts").css('display','block');
        $("#code_tss").text("请输入正确身份证号");
        return false;
    }else{
        $("#code_ts").css('display','none');
        $("#code_tss").text("");
    }
    //身份证中根据年份月份判断当前月份的天数
    var mymonth=Number(code.substr(10,2));
    var  maxday = new Date(myyear,mymonth,0).getDate();
    var myday=Number(code.substr(12,2));
    if(myday>maxday){
        $("#code_ts").css('display','block');
        $("#code_tss").text("请输入正确身份证号");
        return false;
    }else{
        $("#code_ts").css('display','none');
        $("#code_tss").text("");
    }
    var res= IdentityCodeValid(code);
    if(res==false){
        $("#code_ts").css('display','block');
        $("#code_tss").text("请输入正确身份证号");
        return false;
    }else{
        $("#code_ts").css('display','none');
        $("#code_tss").text("");
    }

    //判断用户名是否真实
    var ishanzi=/^[\u4e00-\u9fa5]+$/;
    var namel=name.length;
    if(ishanzi.test(name)){
        $("#name_ts").css('display','none');
        $("#name_tss").text("");
    }else{
        $("#name_ts").css('display','block');
        $("#name_tss").text("请输入真实姓名");
        return false;
    }
    if(namel>=2&&namel<6){
        $("#name_ts").css('display','none');
        $("#name_tss").text("");
    }else{
        $("#name_ts").css('display','block');
        $("#name_tss").text("请输入真实姓名");
        return false;
    }
    //姓名前3个字不能相同
    var name1=name.substr(0,1);
    var name2=name.substr(1,1);
    var name3=name.substr(2,1);
    if(name1==name2 && name1==name3 && name2==name3 || name1==name2){
        $("#name_ts").css('display','block');
        $("#name_tss").text("请输入真实姓名");
        return false;
    }else{
        $("#name_ts").css('display','none');
        $("#name_tss").text("");
    }
    var tagg=0;
    /*注册账号到数据库*/
//  $.cookie('the_cookie'); // 读取 cookie
    $.cookie('username', username); // 存储 cookie
    $.cookie('password', password); // 存储 cookie
    $.cookie('name', name); // 存储 cookie
    $.cookie('email', email); // 存储 cookie
    $.cookie('code', code); // 存储 cookie
    alert('注册成功');
    return;

    if(tagg==1){
        $("#username_ts").css('display','block');
        $("#username_tss").text("用户名已存在");
        return false;
    }
    if(tagg==0){
        $("#username_ts").css('display','none');
        $("#username_tss").text("");
        return true;
    }
})
function showRegistBtn(id){
    if(document.getElementById("acceptcheckbox").checked){
        document.getElementById('acceptbtn').className = 'regsiter_btn corner ffyahei';
        document.getElementById("acceptbtn").disabled=false;
    }else{

        document.getElementById('acceptbtn').className = 'regsiter_btn_disabled corner ffyahei';
        document.getElementById("acceptbtn").disabled=true;
    }
}
