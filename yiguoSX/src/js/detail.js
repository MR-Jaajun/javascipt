$(function() {

	//获取网址内容
	var str = location.search;
	var goodsid = str.slice(1);
	$.ajax({
		type: "get",
		url: "../api/list.php",
		async: true,
		data: {
			page: 1,
			gid: goodsid
		},
		success: function(str) {
			creat(str);
		}
	});
	//封装渲染的方法
	function creat(str) {
		var arr = JSON.parse(str);
		var res = arr.glist.map(function(item) {
			return `<div class="crumbs">
						<a class="ml0" href="/">首页</a>&gt;
						<a href="list.html">进口水果</a>&gt;
						<span>${item.ginfo}</span>
					</div>
					<div class="content clearfix">
						<div class="product-img clearfix">
							<div class="big-img">
								<img src="${item.dimg1}" class="on"/>
								<img src="${item.dimg2}" />
								<img src="${item.dimg3}" />
								<div id="move"></div>
								<div class="imgbox"></div>
							</div>
							<div class="fdj">
								<img src="${item.dimg1}" class="big-on"/>
								<img src="${item.dimg2}" />
								<img src="${item.dimg3}" />	
							</div>
							<div class="small-img">
								<ul>
									<li><img src="${item.dimg1}" /></li>
									<li><img src="${item.dimg2}" /></li>
									<li><img src="${item.dimg3}" /></li>
								</ul>
							</div>
						</div>
						<div class="product-info">
							<div class="summary-name">
								<h1>${item.ginfo}</h1>
								<p>${item.gdescribe}</p>
							</div>
							<div class="summary-price clearfix">
								<div class="pro-price">
									<div>
										<span class="tt">价格：</span>
										<span><i>¥</i><b>${item.gprice}</b></span>
									</div>
									<div class="pro-m2">更多商品优惠，尽在易果生鲜APP</div>
								</div>
							</div>
						</div>
						
					<div class="summary-other clearfix">
						<div class="left">
							<div class="choose clearfix">
								<div class="dt">规格：</div>
								<div class="dd">
									<ul>
										<li class="selected">
											<a href="">
												<span>￥${item.gprice}</span>
												<span>500g/盒</span>
												<i></i>
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="pro-service">满百包邮，<b>20:00</b> 前完成订单 预计明日<b>(5月16日)</b>送达</div>
							<div class="pro-service">
								<i class="mr5"><img src="../img/listimg/icon1.png"></i>
								不支持7天无理由退货
							</div>
							

						</div>

					</div>
							</div>
						</div>
					</div>`;
		}).join('');

		$('#main .main').html(res);
	}

	$('.main').on('click', '.content .product-img ul li', function() {
		//获取点击图片的下标
		var num = $(this).index();
		//选项卡
		$(this).parent().parent().parent().
		find('.big-img img').eq(num).addClass('on')
			.siblings().removeClass('on');

		$(this).parent().parent().parent().
		find('.fdj img').eq(num).addClass('big-on')
			.siblings().removeClass('big-on');
	});

	//放大镜
	//鼠标移入的时候盒子出现
	$('.main').on('mouseenter', '.imgbox', function() {
		$(this).parent().find('#move').css('display', 'block');
		$(this).parent().parent().find('.fdj').css('display', 'block');
	});
	//鼠标移入的时候盒子消失
	$('.main').on('mouseleave', '.imgbox', function() {
		$(this).parent().find('#move').css('display', 'none');
		$(this).parent().parent().find('.fdj').css('display', 'none');
	});

	//鼠标在盒子里移动
	$('.main').on('mousemove', '.imgbox', function(ev) {
		var left = ev.clientX - $(this).offset().left - ($(this).parent().find('#move').outerWidth()) / 2;
		var top = ev.clientY - $(this).offset().top - ($(this).parent().find('#move').outerHeight()) / 2;

		//临界值
		if(left < 0) {
			left = 0;
		} else if(left > $(this).outerWidth() - $(this).parent().find('#move').outerWidth()) {
			left = $(this).outerWidth() - $(this).parent().find('#move').outerWidth();
		}

		if(top < 0) {
			top = 0;
		} else if(top > $(this).outerHeight() - $(this).parent().find('#move').outerHeight()) {
			top = $(this).outerHeight() - $(this).parent().find('#move').outerHeight();
		}

		$(this).parent().find('#move').css('left', left);
		$(this).parent().find('#move').css('top', top);

		//计算移动比例
		var scaleX = left / ($(this).outerWidth() - $(this).parent().find('#move').outerWidth());
		var scaleY = top / ($(this).outerHeight() - $(this).parent().find('#move').outerHeight());

		//大图走的距离
		var bigX = -scaleX * ($(this).parent().parent().find('.fdj img').outerWidth() - $(this).parent().parent().find('.fdj').outerWidth());
		var bigY = -scaleY * ($(this).parent().parent().find('.fdj img').outerHeight() - $(this).parent().parent().find('.fdj').outerHeight());

		$(this).parent().parent().find('.fdj img').css('left', bigX);
		$(this).parent().parent().find('.fdj img').css('top', bigY);

	});

	//减
	$('#main .decrease').click(function() {
		var nums = $('#p_number').val();
		nums--;
		if(nums < 1) {
			nums = 1;
		}
		$('#p_number').val(nums);
	});
	//加
	$('#main .increase').click(function() {
		var nums = $('#p_number').val();
		nums++;
		$('#p_number').val(nums);
	});
	
	
	//一开始显示数据库的内容
	function init() {
		var imgsrc = $('.main').find('.big-img').children().eq(0).attr('src');
		var info = $('.main').find('h1').html();
		var price = $('.main').find('.content .summary-price b').html();
		var sum = $('#p_number').val();
		$.ajax({
			type: "post",
			url: "../api/car.php",
			async: true,
			data: {
				gid: goodsid,
				gimg: imgsrc,
				ginfo: info,
				gprice: price,
				quantity: sum,
			},
			success: function(str) {
				var arr = JSON.parse(str);
				var resNum = arr.total[0]['SUM(quantity)']; //所有商品总数量
				var resPrice = arr.sPrice[0]['SUM(sumprice)']; //所有商品总价格
				//					console.log(resNum,resPrice);
				$('.totleNum b').html(resNum);
				$('.totlePrice').html(resPrice);

			}
		});
	}
	init();
	
	$('#main').on('click', '.btn-gn', function() {
		init();
	});

});