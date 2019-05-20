$(function(){
	
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
	$('#nav .catalogs').hover(function(){
		//鼠标移入出现
		$('#nav .catalogs .catalogs-list').css({'display':'block','height':'463'});
	},function(){
		//鼠标移出消失
		$('#nav .catalogs .catalogs-list').css('display','none');
	});
	
	//二级导航
	$('#nav .catalogs-list .item').hover(function(){
		//鼠标移入显示
		var index = $(this).index();
		$('#nav .catalogs-list .item .sub-item').eq(index).addClass('itemblock');
		
	},function(){
		//鼠标移出消失
		var index = $(this).index();
		$('#nav .catalogs-list .item .sub-item').eq(index).removeClass('itemblock');
	});
	
	
	//吸顶菜单
	var logoH = $('#logo').outerHeight();
	$(window).scroll(function() {
		var iH = window.scrollY;//滚动条的距离
		if(iH > logoH){
			$('#logo').addClass('fix');
		}else{
			$('#logo').removeClass('fix');
		}
		
		//回到顶部的按钮出现
		if(iH > 500){
			$('#backtop .topbtn').css('display','block');
		}else{
			$('#backtop .topbtn').css('display','none');
		}
		
		//左边侧栏显示
		if(iH > 310){
			$('#floor-jump').css('display','block');
		}else{
			$('#floor-jump').css('display','none');
		}
		
	});
	
	//回到顶部 缓慢回到顶部
		$('#backtop .topbtn').click(function() {
			var scrolltop = window.scrollY;
			var timer = setInterval(function() {
				scrolltop -= 80;//步长
				if(scrolltop <= 0){
					clearInterval(timer);
					$(window).scrollTop(0);
				}else{
					$(window).scrollTop(scrolltop);
				}
			},24);
		});
	
	
	//轮播图
	var iw = $('.banner li').eq(0).outerWidth();
	//把图片移到右边
	$('.banner li').css('left',iw);
	//把第一张图片放到可视区
	$('.banner li').eq(0).css('left',0);
	
	//自动轮播
	var timer = null;
	var now = 0;//获取可视区图片下标
	timer = setInterval(next,2500);
	//下一张
	function next(){
//		$('.banner li').stop();
		$('.banner li').eq(now).stop().animate({'left':-iw},1000,'linear');
		now++;
		if(now >= $('.banner li').size()){
			now = 0;
		}
		//新图先马上放到右边
		$('.banner li').eq(now).css('left',iw);
		//新图进入
		$('.banner li').eq(now).stop().animate({'left':0},1000,'linear');
		
//		$('.banner li img').eq(now).css('transform','scale(1.1)');
		//焦点跟随
		light();
		
		
	}
	
	//上一张
	function prev(){
		$('.banner li').eq(now).stop().animate({'left':iw},1500,'linear');
		now--;
		if(now <= -1){
			now = $('.banner li').size() -1;
		}
		//新图先马上放到左边
		$('.banner li').eq(now).css('left',-iw);
		//新图进入
		$('.banner li').eq(now).stop().animate({'left':0},1500,'linear');
		
		//焦点跟随
		light();
	}
	
	//鼠标移入，停止轮播图
	$('#banner').hover(function(){
		clearInterval(timer);
		$('#prev').css('display','block');
		$('#next').css('display','block');
		
	},function(){
		$('#prev').css('display','none');
		$('#next').css('display','none');
		timer = setInterval(next,2500);
	});
	//点击切换 上一张
	$('#prev').click(function(){
		prev();
	});
	//点击切换 下一张
	$('#next').click(function(){
		next();
	});
	
	//创建焦点 生成跟轮播图数量相同的焦点
	var html = '';
	$('.banner li').each(function(i,item) {
		html += "<li>" + (i+1) + "</li>";
	});
	$('.light').html(html);
	$('.light').children().eq(0).addClass('active');
	
	//焦点跟随
	function light(){
		$('.light').children().eq(now)
		.addClass('active').siblings()
		.removeClass('active');
	}
	
	//点击焦点
	$('.light').on('click','li',function() {
		var index = $(this).index();
		if(index > now){
			$('.banner li').eq(now).animate({'left' : -iw},1000,'linear');
			$('.banner li').eq(index).css('left',iw);
			$('.banner li').eq(index).animate({'left' : 0},1000,'linear');
		}
		if(index < now){
			$('.banner li').eq(now).animate({'left' : iw},1000,'linear');
			$('.banner li').eq(index).css('left',-iw);
			$('.banner li').eq(index).animate({'left' : 0},1000,'linear');
		}
		now = index;
		light();
	});
	
	//楼层跳跃
	$('#floor-jump a').hover(function() {
		$(this).addClass('hov');
	},function(){
		$(this).removeClass('hov');
	});
	
		//楼层跟随
		$('#floor-jump a').click(function() {
			//点击的时候高亮显示
			$(this).addClass('hov1').siblings().removeClass('hov1');
			//获取a的下标
			var num = $(this).index();
			//第n个main到顶部的距离 
			var mh = $('#main .main1').eq(num).offset().top;
			//调到所点击的楼层		
			$(window).scrollTop(mh);

		});

	//滚动楼层到达临界点，按钮跟着高亮显示
		$(window).scroll(function() {
			var scrolltop = window.scrollY;
			var mainH = $('#main .main1').outerHeight();//获取每一个main的高度 500
			var first_mh = $('#main .main1').offset().top;//第1个main到顶部的距离  888 
			for(var i = 0; i < $('#main .main1').size(); i++){
				var res = first_mh + mainH*(i-1);//第n个main到顶部的距离
				if(scrolltop > res + 200){
					$('#floor-jump a').eq(i).addClass('hov1').siblings().removeClass('hov1','hov');
				}
			}
		});
		
		//解码。获取网页?后的内容
		var str = location.search;
		var u_Name = str.slice(1);
		
		//getcookie 获取用户名
		var cookie = getCookie('username');
		if(cookie == u_Name){
			$('#login').css('display','none');
			$('#registers').css('display','none');
			var timer2 = setTimeout(function(){
				$('#loginName').html(cookie).css('display','inline-block');
				$('#loginout').css('display','inline-block');
			},1500);
			
		}else{
			$('#login').css('display','block');
			$('#registers').css('display','block');
			$('#loginName').css('display','none');
			$('#loginout').css('display','none');
		}
		
		//点击退出的时候清除cookie
		$('#loginout a').click(function() {
			removeCookie('username','',-1);
			$('#loginName').css('display','none');
			$('#loginout').css('display','none');
			location.href = 'main.html';			
		});
		
	var info = '';
			//搜索商品
	$('.search-btn').click(function() {
		sleok = true;//开关变为true
		//点击获取内容
		 info = $('#keyword').val();
		//发送请求
		$.ajax({
			type: "get",
			url: "api/list.php",
			async: true,
			data: {
				find: info
			},
			success: function(str) {
				var arr = JSON.parse(str);
				window.open('html/list.html?' + info);
//				console.log(arr);
			}
		});

	});
	
	
	
	//一开始显示数据库的内容
	function start(){
		$.ajax({
			type: "get",
			url: "api/price.php",
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