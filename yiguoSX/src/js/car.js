$(function() {

	function creat(str) {
		var arr = JSON.parse(str);
		//		console.log(arr);
		var res = arr.map(function(item) {
			return `<tbody>
						<tr data-id="${item.gid}">
			                <td class="cart-t-check"><input type="checkbox"></td>
			                    <td class="cart-t-img"><a href="javascript:"><img src="${item.gimg}"></a></td>
			                    <td class="cart-t-info"><a href="javascript:">${item.ginfo}</a></td>		                       
			                    <td class="cart-t-price" data-price="${item.gprice}">￥${item.gprice}</td>
			                    <td class="cart-t-num">
			                        <div class="quantity-form">
			                            <a href="javascript:;" class="decrement"></a>
			                            <input id="goodsnum" type="text" class="itxt" oldnum="1" value="${item.quantity}" >
			                            <a href="javascript:;" class="increment"></a>
			                        </div>
			                    </td>
			                    <td class="cart-t-total">￥${item.sumprice}</td>
			                    <td class="cart-t-spec">1盒/份</td>
			                    <td class="cart-t-opera">
			                        <a href="javascript:;" style="color: #444444;" id="del">删除</a>
			                    </td>
                    		</tr>
						</tbody>`;

		}).join('');
		$('#res').html(res);
	}

	$.ajax({
		type: "get",
		url: "../api/carinfo.php",
		async: true,
		success: function(str) {
			creat(str);
		}
	});

	function costAll(ele, type) {
		var imgscr = $(ele).parent().parent().parent().find('img').attr('src');
		var title = $(ele).parent().parent().parent().find('.cart-t-info a').html();
		var price = $(ele).parent().parent().parent().find('.cart-t-price').html().slice(1) * 1;
		var num = $(ele).parent().find('#goodsnum').val() * 1;
		var id = $(ele).parent().parent().parent().data('id');

		if(type == 'add') {
			num++;
		}
		if(type == 'cut') {
			num--;
		}

		if(num < 1) { //小于1的时候删除该商品数据
			num = 1;
			var res = confirm("你确定要删除吗？");
			if(res) {
				$.ajax({
					type: "get",
					url: "../api/carinfo.php",
					async: true,
					data: {
						gid: id
					},
					success: function(str) {
						alert('删除成功');
					}
				});
				$(this).parent().parent().parent().remove();
			}
		}
		//数量
		$(ele).parent().find('#goodsnum').val(num);

		re_init(id, imgscr, title, price, num);

		var arr = $('body').find('.cart-t-check input');
		var sum = 0;
		arr.each(function(i, item) {
			if($(item).is(':checked')) {
				sum += $(item).parent().parent().find('.cart-t-price').data('price') * $(item).parent().parent().find('#goodsnum').val();
			}
		});
		console.log(sum.toFixed(2));
		var xiaoji = price * num;
		$(ele).parent().parent().parent().find('.cart-t-total').html('￥' + xiaoji.toFixed(2));
		$('.allprice').html('总计（不含运费）：￥' + sum.toFixed(2));

	}

	//减商品数量
	$('#res').on('click', '.decrement', function() { //减
		costAll(this, 'cut');
	});
	//增加商品数量
	$('#res').on('click', '.increment', function() { //加
		costAll(this, 'add');

	});
	//失去焦点的时候
	$('#res').on('blur', '#goodsnum', function() {
		var imgscr = $(this).parent().parent().parent().find('img').attr('src');
		var title = $(this).parent().parent().parent().find('.cart-t-info a').html();
		var price = $(this).parent().parent().parent().find('.cart-t-price').html().slice(1) * 1;
		var id = $(this).parent().parent().parent().data('id'); //商品id
		var num = $(this).parent().find('#goodsnum').val(); //商品数量
		if(num < 0) {
			num = 1;
		}
		$(this).parent().find('#goodsnum').val(num);
		//		console.log(num,id,price,imgscr,titel);
		re_init(id, imgscr, title, price, num);
		costAll(this, '')
	});
	
	//重新渲染的方法
	function re_init(id, imgscr, title, price, num) {
		$.ajax({
			type: "post",
			url: "../api/car2.php",
			async: true,
			data: {
				gid: id,
				gimg: imgscr,
				ginfo: title,
				gprice: price,
				quantity: num
			},
			success: function(str) {
				//数据库已经更新，网页需要刷新
			}

		});
		//		all();

	}

	//点击删除按钮，删除该商品
	$('#res').on('click', '#del', function() {

		var id = $(this).parent().parent().data('id');
		var res = confirm("你确定要删除吗？");
		if(res) {
			$.ajax({
				type: "get",
				url: "../api/carinfo.php",
				async: true,
				data: {
					gid: id
				},
				success: function(str) {
					alert('删除成功');
				}
			});
			$(this).parent().parent().remove();
		}

	});

	//清空购物车
	$('#clear').click(function() {
		//		costAll(this,'');
		var res = confirm("你确定要删除吗？");
		if(res) {
			$.ajax({
				type: "get",
				url: "../api/delcar.php",
				async: true,
				success: function(str) {
					if(str == 'yes') {
						alert('清空购物车成功');
					}
				}
			});
			$('#res').find('tbody').remove();
			$('.allprice').html('总计（不含运费）：￥');

		}

	});

	//最后结算的价格 封装成函数
	function settlementPrice() {
		var arr = $('body').find('.cart-t-check input');
		var sum = 0;
		arr.each(function(i, item) {
			if($(item).is(':checked')) {
				sum += $(item).parent().parent().find('.cart-t-price').data('price') * $(item).parent().parent().find('#goodsnum').val();
			}
		});
		console.log(sum.toFixed(2));
		$('.allprice').html('总计（不含运费）：￥' + sum.toFixed(2));
	}

	//点击复选框
	$('.cart-footer').on('click', '.chkAll', function() {
		var isok = $(this).prop('checked');
		$('#res').find('.cart-t-check input').prop('checked', isok);

		//最后结算的价格
		settlementPrice();

	});

	//点击复选框控制全选
	$('#res').on('click', '.cart-t-check input', function() {
		var len = $('.cart-t-check input:checked').size();
		var total = $('.cart-t-check input').size();
		if(len == total) {
			//证明全部勾选了
			$('.chkAll').prop('checked', true);
		} else {
			$('.chkAll').prop('checked', false);
		}

		//最后结算的价格
		settlementPrice();

	});

	//删除所选中的商品
	$('#del_choose').click(function() {
		var arr = $('body').find('.cart-t-check input');
		arr.each(function(i, item) {
			var id = $(item).parent().parent().data('id');
			if($(item).is(':checked')) {
				$.ajax({
					type: "get",
					url: "../api/carinfo.php",
					async: true,
					data: {
						gid: id
					},
					success: function(str) {
						$(item).parent().parent().remove();
					}
				});
			}
		});
		alert('删除成功');	
	});
	
	//点击結算
	$('#btnSubmit').click(function() {
		if(getCookie('username')){
			alert('支付功能不会做啊，请谅解谅解！');
		}else{
			var res = confirm('你还没有登录哦，点击确定跳转到登录页！');
			if(res){
				location.href = "login.html?";
			}
		}
	});

});