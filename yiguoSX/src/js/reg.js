$(function() {
	//显示验证码
	var code = randomCode();
	$('.tx_yzm').html(code);
	//点击切换验证码
	$('.huan').click(function() {
		//验证码随机颜色
		var newcolor = randomColor(16);
		$('.tx_yzm').css('color', newcolor);
		//随机大小
		var size = randomNum(10, 30);
		$('.tx_yzm').css('font-size', size + 'px');
		//生成验证码
		var code = randomCode();
		$('.tx_yzm').html(code);
	});

	//验证表单的提示信息
	function inf(ele, ele1, html, color, bg) {
		$(ele).html('<i></i>' + html).css('color', color);
		$(ele1).css('background', 'url(../img/bg_login.png) no-repeat' + ' ' + bg + ' ' + '-200px');
	}

	//验证验证码是否正确
	$('#yzm').blur(function() {
		if($(this).val().trim()) { //非空判断
			//this指该input框
			if($(this).val().toLocaleLowerCase() == $('.tx_yzm').html().toLocaleLowerCase()) {
				//正确的时候
				inf('.form .inf1 .inf', '.form .inf1 .inf i', '验证码正确', '#58bc58', '0px');
			} else { //输入错误的时候
				inf('.form .inf1 .inf', '.form .inf1 .inf i', '验证码错误', 'red', '-40px');
			}
		} else { //为空的时候
			inf('.form .inf1 .inf', '.form .inf1 .inf i', '验证码不能为空', '#444444', '-20px');
		}
	});

	//验证手机号
	$('#phone').blur(function() {
		if($(this).val().trim()) { //非空
			if(checkReg.tel($(this).val()) || checkReg.email($(this).val())) {
				inf('.form .inf2 .inf', '.form .inf2 .inf i', '格式正确', '#58bc58', '0px');
				//格式正確的時候發送ajax，查询数据库是否有相同的手机号
				$.ajax({
					type:"post",
					url:"../api/checkname.php",
					async:true,
					data : {
						name : $('#phone').val(), 
						pwd : $('#pwd').val()
					},
					success : function(str) {
						if(str == 'no'){
							$('#ajax_inf').html('已存在该账号').css('color','red');
						}else{
							$('#ajax_inf').html('可以注册').css('color','#58bc58');
						}
					}
				});
				
			} else {//错误的时候
				inf('.form .inf2 .inf', '.form .inf2 .inf i', '手机号格式错误', 'red', '-20px');
			}
		} else {
			inf('.form .inf2 .inf', '.form .inf2 .inf i', '手机号不能为空', '#444444', '-20px');
		}
	});

	//密码验证
	$('#pwd').blur(function() {
		if($(this).val().trim()) { //非空判断
			if(checkReg.psweasy($(this).val())) {
				inf('.form .inf4 .inf', '.form .inf4 .inf i', '密码格式正确', '#58bc58', '0px');
				//密码的确认
				$('#re_pwd').blur(function() {
					if($(this).val().trim()) { //非空判断
						if(checkReg.pwwagain($(this).val(), $('#pwd').val())) {
							inf('.form .inf5 .inf', '.form .inf5 .inf i', '两次密码一致', '#58bc58', '0px');
						} else {
							inf('.form .inf5 .inf', '.form .inf5 .inf i', '两次密码不一致', 'red', '-40px');
						}
					} else {
						inf('.form .inf5 .inf', '.form .inf5 .inf i', '请再次填写', '#444444', '-20px');
					}
				});
			} else { //密码错误
				inf('.form .inf4 .inf', '.form .inf4 .inf i', '密码格式不正确', 'red', '-40px');
			}
		} else { //密码为空
			inf('.form .inf4 .inf', '.form .inf4 .inf i', '密码不能为空', '#444444', '-20px');
		}
	});

	//勾选复选框登录按钮变色
	$('#tab1chk').click(function() {
		if($('#tab1chk').prop("checked") == true) {
			$('.main .form #PhoneReg').css('background', '#008842');
		} else {
			$('.main .form #PhoneReg').css('background', '#666666');
		}
	});
	
	var code = "";
	//点击获取手机验证码
	$('#Phone_SendCode').click(function(){
		var ph_yzm = $('#phone').val().trim();
		
		$.ajax({
			type:"post",
			url:"../api/message.php",
			async:true,
			data:{
				userphone : ph_yzm
			},
			success :function(str){
				var arr = JSON.parse(str);
				code = arr.phonecode;
			}
			
		});
	});
	
	$('#ph_yzm').blur(function() {
		if($(this).val()){
			if($(this).val() == code){
				inf('.form .inf3 .inf', '.form .inf1 .inf i', '验证码正确', '#58bc58', '0px');	
			}else{
				inf('.form .inf3 .inf', '.form .inf1 .inf i', '验证码正确', 'red', '-40px');
				
			}
		}else{
			inf('.form .inf3 .inf', '.form .inf3 .inf i', '手机验证码不能为空', '#444444', '-20px');
		}
	});
	
	//点击注册
	$('#PhoneReg').click(function() {
		if($('#tab1chk').prop("checked") == true) {
			inf('.main .form .clause .pass-error', '.main .form .clause .pass-error i', '', '', '50');
			if($('#yzm').val() && $('#phone').val() && $('#pwd').val() == $('#re_pwd').val() && $('#ph_yzm').val() && $('#tab1chk').prop("checked")){
				//发送ajax 所有信息都为正确的时候
				$.ajax({
					type:"post",
					url:"../api/reg.php",
					async:true,
					data : {
						name : $('#phone').val(), 
						pwd : $('#pwd').val()
					},
					success : function(str) {					
						if(str == 'yes'){
							location.href = 'login.html?' + $('#phone').val();
						}else{
							alert('注册失败，请检查所填写信息是否有误');
						}
					}
				});
				
				
			}else{
				alert('有信息填写错误喔！')
			}
		} else {
			inf('.main .form .clause .pass-error', '.main .form .clause .pass-error i', '请接受服务协议', 'red', '-40px')
		}
	});
	

});