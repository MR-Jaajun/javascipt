$(function() {
	//获取网址内容
	var val = decodeURI(location.search);;
	var searchVal = val.slice(1);
//	console.log(searchVal);
	$('#keyword').val(searchVal);
	
	
	//getcookie 获取用户名
	var cookie = getCookie('username');
	if(cookie) {
		$('#login').css('display', 'none');
		$('#registers').css('display', 'none');
		var timer2 = setTimeout(function() {
			$('#loginName').html(cookie).css('display', 'inline-block');
			$('#loginout').css('display', 'inline-block');
		}, 1500);

	} else {
		$('#login').css('display', 'block');
		$('#registers').css('display', 'block');
		$('#loginName').css('display', 'none');
		$('#loginout').css('display', 'none');
	}

	//点击退出的时候清除cookie
	$('#loginout a').click(function() {
		removeCookie('username', '', -1);
		$('#loginName').css('display', 'none');
		$('#loginout').css('display', 'none');
		location.href = '../main.html';
	});
	
		//城市的选择
	$('.top .citytab span').hover(function(){
		$(this).addClass('active').siblings().removeClass();

		var index = $(this).index();
//		console.log($(this).index());
		$('.top .citylist').eq(index)
		.addClass('listblock').siblings()
		.removeClass('listblock');
	});
	
	//一级导航
	$('#nav .catalogs').hover(function() {
		//鼠标移入出现
		$('#nav .catalogs .catalogs-list').css({
			'display': 'block',
			'height': '463'
		});
	}, function() {
		//鼠标移出消失
		$('#nav .catalogs .catalogs-list').css('display', 'none');
	});

	//二级导航
	$('#nav .catalogs-list .item').hover(function() {
		//鼠标移入显示
		var index = $(this).index();
		$('#nav .catalogs-list .item .sub-item').eq(index).addClass('itemblock');

	}, function() {
		//鼠标移出消失
		var index = $(this).index();
		$('#nav .catalogs-list .item .sub-item').eq(index).removeClass('itemblock');
	});

	//吸顶菜单
	var logoH = $('#logo').outerHeight();
	$(window).scroll(function() {
		var iH = window.scrollY; //滚动条的距离
		if(iH > logoH) {
			$('#logo').addClass('fix');
		} else {
			$('#logo').removeClass('fix');
		}

		//回到顶部的按钮出现
		if(iH > 500) {
			$('#backtop .topbtn').css('display', 'block');
		} else {
			$('#backtop .topbtn').css('display', 'none');
		}

		//左边侧栏显示
		if(iH > 310) {
			$('#floor-jump').css('display', 'block');
		} else {
			$('#floor-jump').css('display', 'none');
		}

	});
	
	var num = 12; //每一页显示10条数据
	var nowpage = 0; //当前是第几页
	var pages = 0; //总共的页数
	var types = ''; //按照什么排序
	var orders = ''; //默认升序
	//封裝渲染的方法
	function creat(str) {
		var arr = JSON.parse(str);
		var res = arr.glist.map(function(item) {
			return `<li class="listinf" data-id="${item.gid}">
	                        <div class="p_img">
	                            <a href="javascript:" target="_blank">
	                                <img src="${item.img}" width="290" height="290" class="j_product_img">
	                            </a>
	                        </div>
	                        <div class="p_info clearfix">
	                            <div class="p_name"><a href="javascript:" target="_blank">${item.ginfo}/个</a></div>
	                            <div class="p_price">
	                                <span class="price">
	                                    <strong>¥${item.gprice}</strong>
	                                </span>   
	                            </div>
	                        </div>
	                        <div class="p-buy">
	                            <span>${item.gdescribe}</span>
								<a class="btn-buy" href="javascript:;">加入购物车</a>
	                        </div>
	                    </li>`;
		}).join('');

		//渲染到頁面
		$('#list').html(res);
		
		pages = Math.ceil(arr.total / num);
//		console.log(pages);
		var html = "";
			for(var i = 0; i < pages; i++) {
				html += '<a href="javascript:;">' + (i + 1) + '</a>';
			}
		$('#btn .btn').html(html);
		$('.btn').find('a').eq(arr.page-1).addClass('active');
		nowpage = arr.page;

	}
	//上一页
	var btnup = `<input type="button" class="up" id="up" value="上一页" />`;
	//下一页
	var btndown = `<input type="button" class="down" id="down" value="下一页" />`;
	$('#btn').append(btnup);
	$('#btn').append(btndown);
	
	$('#btn').on('click','#up',function(){
		nowpage--; //页数减小
		//临界值的判断
		if(nowpage < 1) {
			nowpage = 1;
		}
		init(nowpage, orders);
	});
	$('#btn').on('click','#down',function(){
		nowpage++; //页数变大
		//临界值的判断
		if(nowpage > pages) {
			nowpage = pages;
		}
		init(nowpage, orders);
	});
	
	
	//數據的渲染
	function init(ipage,orders){
		$.ajax({
			type: "get",
			url: "../api/list.php",
			async: true,
			data:{
				page : ipage,
				num : num,
				typ : types,
				order : orders,
				find: info
			},
			success: function(str) {
				creat(str);
			}
		});
	}
	init(1,'');
	//默認排序
	$('.filter_sort .on').click(function() {
		sleok = false;
		types = '';
		$.ajax({
			type:"get",
			url:"../api/list.php",
			async:true,
			data :{
				page : 1,
				num : 12
			},
			success :function(str){
				creat(str);
			}
		});
		$('.sort_down').css('background-position', '-20px 0');
		$('.select li').children().removeClass('active');
	
	});
	
	//点击哪一页就跳到那一页
	$('#btn').on('click','.btn a',function(){
		var num = $(this).index() + 1;
		init(num,orders);
	});
	
	
	var info = ''; //获取关键字
	var sleok = false; //新建一个查找的开关
	//筛选
	$('.select li').click(function() {
		//点击高亮
		$(this).children().addClass('active');
		$(this).siblings().children().removeClass('active');
		
		sleok = true;//开关变为true
		//点击获取内容
		info = $(this).children().html();
		$.ajax({
			type: "get",
			url: "../api/list.php",
			async: true,
			data: {
				find: info
			},
			success: function(str) {
				creat(str);
				$('.btn').find('a').eq(0).addClass('active').siblings().removeClass('active');
			}
		});

	});
	
	//价格排序
	var isok = true;
	$('.filter_sort .price').click(function() {
		types = 'gprice';
		if(isok) { //升序
			orders = 'ASC';
			$('.sort_down').css('background-position', '-40px 0');
		} else { //降序
			orders = 'DESC';
			$('.sort_down').css('background-position', '-30px 0');
		}
		//开关制反
		isok = !isok;
		if(sleok) {
			init(1,orders);
			
		} else {
			$.ajax({
				type: "get",
				url: "../api/list.php",
				async: true,
				data: {
					page : 1,
					num : num,
					typ: types,
					order: orders
				},
				success: function(str) {
					creat(str);
				}
			});
		}

	});
	
	//搜索商品
	$('.search-btn').click(function() {
		sleok = true;//开关变为true
		//点击获取内容
		 info = $('#keyword').val();
		//发送请求
		init(1,orders);

	});
	
	//给加入购物车绑定点击事件
	$('#list').on('click','li .p-buy a',function() {
		var goodsid = $(this).parent().parent().attr('data-id');
		var imgsrc = $(this).parent().parent().find('.j_product_img').attr('src');
		var info = $(this).parent().parent().find('.p_name a').html();
		var price = $(this).parent().parent().find('.price strong').html().slice(1)*1;
//		console.log(goodsid,imgsrc,info,price);
		$.ajax({
			type: "post",
			url: "../api/car.php",
			async: true,
			data: {
				gid: goodsid,
				gimg: imgsrc,
				ginfo: info,
				gprice: price,
				quantity: "1"
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
	
	});
	//给每一个list绑定点击事件
	$('#list').on('click','li .p_img,li .p_info',function() {
		var num = $(this).parent().attr('data-id');
		console.log(num);
		window.open('detail.html?' + num);
	});
	
	
	
	
	
	//一开始显示数据库的内容
	function start(){
		$.ajax({
			type: "get",
			url: "../api/price.php",
			async: true,
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
	start();

	
	
	
	
	
	
});