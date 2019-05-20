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
		var size = randomNum(10, 22);
		$('.tx_yzm').css('font-size', size + 'px');
		//生成验证码
		var code = randomCode();
		$('.tx_yzm').html(code);
	});


	//解码。获取网页?后的内容
	var str = location.search;
	var u_Name = str.slice(1);
	//	console.log(u_Name);
	$('#UserName').val(u_Name);


	//点击登录
	$('#btnLogin').click(function() {
		if($('#yzm').val()) { //非空判断
			if($('.tx_yzm').html().toLocaleLowerCase() == $('#yzm').val().toLocaleLowerCase()) {
				//验证正确的时候发生请求
				$.ajax({
					type: "post",
					url: "../api/login.php",
					async: true,
					data: {
						name: $('#UserName').val(),
						pwd: $('#pwd').val()
					},
					success: function(str) {
						//						console.log(str);
						if(str == 'yes') {
							alert('登录成功！');
							location.href = '../index.html?' + $('#UserName').val();
							setCookie('username', $('#UserName').val(), 1)
						} else {
							$('.inf').html('账 号 或 密 码 错误 !').css('display', 'block');
						}
					}
				});
			} else { //验证码错误
				$('.inf').html('验 证 码 错误 !').css('display', 'block');
			}
		} else { //验证码为空的时候
			$('.inf').html('请 填 写 验 证 码 !').css('display', 'block');
		}

	});
	
	//按下回车键登录
	$(window).keydown(function(ev) {
		if(ev.keyCode == 13) {
			if($('#yzm').val()) { //非空判断
				if($('.tx_yzm').html().toLocaleLowerCase() == $('#yzm').val().toLocaleLowerCase()) {
					//验证正确的时候发生请求
					$.ajax({
						type: "post",
						url: "../api/login.php",
						async: true,
						data: {
							name: $('#UserName').val(),
							pwd: $('#pwd').val()
						},
						success: function(str) {
							//						console.log(str);
							if(str == 'yes') {
								alert('登录成功！');
								location.href = '../main.html?' + $('#UserName').val();
								setCookie('username', $('#UserName').val(), 1)
							} else {
								$('.inf').html('账 号 或 密 码 错误 !').css('display', 'block');
							}
						}
					});
				} else {
					$('.inf').html('验 证 码 错误 !').css('display', 'block');
				}
			} else {
				$('.inf').html('请 填 写 验 证 码 !').css('display', 'block');
			}
		}
	})
}


);