// 其实翻译方法很简单，就是用jQuery做相关的文本替换（注意兼容性），你也可以写
// 如果可以请帮助翻译，如果有其他好方法也可以告诉我。
// 注意，尽量使用jQuery代码翻译，因为jQuery代码在NULL时执行不会报错，
// 而直接用string字符操作改document，容易出现null出错。（经验，小心）
hasLogin=$("a[href='/join'").length==0;
function translate(){
	//保留
	hasTranslatedGithub=true;
	/*标准翻译模板
	为了节省代码运行量和避免出错，使用if结合switch语句辨别页面判断如何翻译。
	*/
	switch(window.location.pathname){
		case "/"://首页
		hasLogin?contentHomePageWithLogin():contentHomePageNoLogin();
		break;
		case "/explore"://浏览界面
		contentExplore();
		break;
		case "/search"://搜索界面
		contentSearch();
		break;
		case "/login":// 登陆界面
		contentLoginUI();
		break;
		case "/blog"://官方博客UI
		contentBlogUI();
		break;
	}
	//if($("div.scope-badge").text()=="This repository"){
	if(('span.mega-octicon.octicon-repo').length!=0){
		// 项目浏览
		contentRepository();
	}
	if($('img.avatar').parent('[href="/account"]').length!=0){
		//用户界面
		
	}
}

//翻译模块函数 用于翻译共同内容
//命名风格 函数 content*(){} 小模板 subContent*(可选特殊参数){}
function contentHomePageNoLogin(){
	subContentHeader();
	subContentTail();
	
	$('h1.heading').text("更好地共同编写软件");
	$('p.subheading').html("为开源或私有项目提供强大的合作机制、代码浏览以及代码管理。需要私有项目吗？"+
	'<a href="/plans">升级计划起步价$7/月.</a>');
	
	$('input[name="user[login]"]').attr("placeholder","挑个用户名");
	$('input[name="user[email]"]').attr("placeholder","你的邮箱");
	$('input[name="user[password]"]').attr("placeholder","创建一个密码");
	$('p.text-muted:first').text("至少有一个小写字母、一个数字、七个字符。");
	$('button[type="submit"]').text("注册Github账号");
	$('p.text-muted:eq(1)').html('点击注册按钮意味着你同意我们的<a href="https://help.github.com/terms" target="_blank">服务条块</a>和<a href="https://help.github.com/privacy" target="_blank">隐私政策</a>。'+
	'<span class="js-email-notice">我们会不定期地向您上述的邮箱推送消息</span>');
	
	$('a[href="https://enterprise.github.com"]:first').text("想在服务器上使用Github");
	$('a[href="https://enterprise.github.com"]:last').text("了解Github企业版");
	
	$('div.marketing-header h1:eq(1)').text("爱上Github的理由。");
	$('div.marketing-header p.lead').html('<a href="/features">强大的功能</a>使软件开发更具合作性。');
	$('.one-half h3').replaceWith(queueDefine('<h3>好的合作开始于交流。</h3>','<h3>在团队中更少的冲突开发。</h3>','<h3>全球最大的开源社区。</h3>','<h3>利用强大的集合功能做更多事。</h3>'));
	$('.one-half p').html(queueDefine('审查更改+评论代码+报告问题并用讨论工具规划您项目的未来','轻松地用机构账户来与协助团队的人合作','向世界分享您的项目，获得反馈，并与<a href="/explore">成千上万的仓库</a>托管人在Github上交流。','为帮助您（与您的团队）更好地合作编写软件，探索应用和工具<a href="/integrations">与Github整合</a>'));
	
	$("h3.show-mac").html(jqReplacers("You can also use","您还可以使用","GitHub on Windows","Github Windows客户端"));
	$("h1.hide-mac").text("在Windows上使用Github的最简单的方式。");
	$("div.hide-mac a:first").text("下载Github Windows客户端");
	$("div.hide-mac p").html(jqReplacers("For","用于","Learn more","了解更多"));
	$("h3.hide-mac").html(jqReplacers("You can also use ","你还可以使用","GitHub on Mac","Github Mac客户端"));
	$("div.show-mac.show-linux").html(jqReplacer("Download GitHub for Mac","下载适用于Mac的Github客户端"));
}
function contentHomePageWithLogin(){
	subContentHeader();
	subContentTail();
	
	$("div.title").html(jqReplacer("Welcome to GitHub! What’s next?","欢迎来到Github！接下来有何贵干？"));
	$("div.details a[href='/new']").text("创建一个仓库");
	$("div.details a[href='https://github.com/account']").text("完善个人资料");
	$("div.details a[href='/repositories']").text("浏览趣味仓库");
	
	$cached=$('div.protip:first');
	if($cached.children("strong").text()=="ProTip!"){
		$cached.children("strong").text("提示!");
		$cached.html(jqReplacers("Edit your feed by updating the users you","当你所","follow","追随的人","and repositories you","或你","watch","关注的仓库",".","有更新时，我们在订阅里会通知你。"));
	}
	
	$(".boxed-group h3").html(jqReplacer("Your repositories","你的仓库"));
	$("a.new-repo").html('<span class="octicon octicon-plus"></span>新建仓库');
	$("#your-repos-filter").attr("placeholder","搜索仓库...");
	$("ul.repo-filterer li a").text(queueDefine("全部","公开","私有","源码","分支"));
	
	$("p.notice").html(jqReplacer("You don’t have any repositories yet!","你现在还没有任何仓库"));
	$("p.notice").html(jqReplacer("or","或"));
	$("p.notice a[href='/new']").text("创建你的首个仓库");
	$("p.notice a[href='https://help.github.com']").text("学习Git技术与Github");
	$('div.protip-callout').html('<strong>提示</strong> <a href="https://github.com/explore">去浏览GitHub</a>，那有不少流行项目需要你的修补');
	$("a.subscribe-feed").html("<span class='octicon octicon-rss'></span>订阅<strong>你的</strong>RSS资讯");
}
function contentSearch(){
	subContentHeader();
	subContentTail();
	
	$("div.container h1").text("搜索");
	$("button[type='submit']").text("搜索");
	
	$("div.codesearch-aside h3").text("编程语言");
	$("p.meta-search-links :first").text("高级搜索");
	
	$("div.blankslate h3").text("我们没找到与'"+$('input[name="q"]').val()+"'相关的仓库。");
	$("div.blankslate p").html('你可以试试<a href="https://github.com/search/advanced?q='+$('input[name="q"]').val()+'&amp;type=Repositories&amp;utf8=%E2%9C%93">高级搜索</a>.');
	
	$("div.sort-bar h3").html(jqReplacers("We’ve found","我们找到了","repository results","个仓库结果"));
}
function contentRepository(){
	subContentHeader();
	subContentTail();
	
	$("div.scope-badge").text("本仓库中");
	$("span.js-select-button span.octicon-eye").parent().html(jqReplacers("Watch","监视","Unwatch","不监视"));
	$("div.select-menu-modal-holder:first").html(jqReplacers("Notifications","通知","Not watching","不监视",">Watching<",">监视<","Be notified of all conversations.","接收一切会话","Ignoring","忽略","Never be notified.","从不提醒"));
	$('button[aria-label="Star this repository"]').html('<span class="octicon octicon-star"></span>收藏').attr("title",jqReplacer("Star","收藏"));
	$('button[aria-label="Unstar this repository"]').html('<span class="octicon octicon-star"></span>不收藏');
	$('button[aria-label="Unstar this repository"]').attr("title",jqReplacer("Unstar","不收藏"));
	$('span.octicon.octicon-repo-forked').parent().html(jqReplacer('Fork','创建分支(Fork)')).attr("title",jqReplacers("Fork your own copy of ","复制一份相同的项目"," to your account","作为分支，保存到你的账号里。"));
	
	$octicon=$('span.octicon');
	$octicon.filter('.octicon-git-branch:first').parent().html('<span class="octicon octicon-git-branch"></span><span class="num text-emphasized">'+$octicon.filter('.octicon-git-branch:first').parent().children('span.num').text()+'</span>个分支');
	$("ul.numbers-summary li a").html(jqReplacers("commits","次提交","releases","次发布","contributor","位贡献者"));
	$octicon.filter('.octicon-list-unordered').parent().attr("aria-label","快速查找文件");
	$octicon.filter('.octicon-git-compare').parent().attr("aria-label","对比，浏览，创建一个合并分支的请求(Pull Request)");
	$('i').text("分支版本：");
	$("div.select-menu-modal-holder:last div div").html(jqReplacers("Switch branches/tags","切换分支/标签","Find or create a branch…","查找或创建一个分支","Branches","分支","Tags","标签"));
	$('div.authorship').html(jqReplacer("authored","创作于"));
	$('a.sha-block').html(jqReplacer("latest commit","最后一次提交"));
	$('button[aria-label="Copy SHA"]').attr("aria-label","复制SHA值");
	
	$('span.full-word').parent().parent().attr('aria-label',queueDefine("代码","问题","合并请求",null,"活动情况","统计图表","配置"));
	$('span.full-word').text(queueDefine("代码","问题","合并请求",null,"活动情况","统计图表","配置"));
	$('div.only-with-full-nav').find("h3").html(jqReplacer("clone URL","复制URL地址")).next().find('button').attr('aria-label','复制到剪切板').parent().parent().parent().nextAll(".clone-options").html(jqReplacers("You can clone with","你可以复制",", or","，或","</form>.","</form>的地址。")).next().html('<span class="octicon octicon-device-desktop"></span> 复制到桌面').next().html('<span class="octicon octicon-cloud-download"></span>下载ZIP文件');
}
function contentExplore(){
	subContentHeader();
	subContentTail();
	
	$("div.container h1").text("浏览Github").prev().children().html(jqReplacers("All","全部","Showcases","展示","Trending","热门"));
	$("div.explore-marketing-header").children("h2").text("浏览").next().text("浏览有趣的项目，解决各种类型的有趣问题。");
	
	$cache=$('span.octicon.octicon-repo');
	$cache.next().text(jqReplacers("Repositorie","个仓库","s","")).parent().next().children("span.text").text("种语言");
	$cache.parent().attr("aria-label",jqReplacers("Repositorie","个仓库","s",""));
	$('a.see-more-link').html(jqReplacer("See all","更多"));
	
	$("h2").html(jqReplacers("Trending repositories","热门仓库","Starred by people you follow","你所追随的人在收藏？"));
	switch(window.location.search){
		case "?since=weekly":
		$("span.js-select-button").text("本周");
		break;
		case "?since=monthly":
		$("span.js-select-button").text("本月");
		break;
		default:
		$("span.js-select-button").text("今天");
	}
	$('span.select-menu-title').text("调整时间范围");
	$("span.select-menu-item-text").text(queueDefine("今天","本周","本月","今天","本周","本月"));
	
	if(hasLogin){
		
	}
	else{
		$('a[rel="nofollow"]:first').parent().prepend("从").html(jqReplacers("Sign up for free","免费注册","to get started","开使！"));
		
		$('h3').text("想知道您朋友在讨论什么代码吗？").next().html("当你跟踪的人收藏了些有趣的仓库<br />你将会在这里看到。").next().html(jqReplacers("Sign up","注册","or","或","Sign in","登陆"));
		$('span.explore-signup-cta').html(jqReplacers('Sign up','注册','or','或','Sign in','登陆','to subscribe.','以订阅资讯'));
		$('p.reason').html('<p class="reason">要把浏览页面推送到收信箱?订阅Github浏览时事通讯<a href="/explore/subscribe" data-pjax="true">了解更多</a> </p>');
	}
}
function contentBlogUI(){
	subContentHeader();
	subContentTail();
	
	$('a.blog-title').text("Github 官方博客");
	$('ul.menu').children().text(queueDefine("精选","所有职位","新特点","工程类","企业","会议","聚会","新员工"));
	$('a.rss').html(jqReplacer("Subscribe","订阅"));
	
	$('span.previous_page').text("上一页");
	$('span.next_page').text("下一页");
}
function contentLoginUI(){
	// 我可怎么会偷你的账号呢？要被偷了问jQuery和Chrome(别的插件)去!
	subContentHeader();
	subContentTail();
	
	$('h1').text("登陆");
	$('label[for="login_field"]').text("用户名或邮箱");
	$('label[for="password"]').html(jqReplacers("Password","密码","forgot password","忘记了？"));
	$('input[name="commit"]').attr("value","登陆");
}



//小模板
function subContentHeader(){
	$('input[placeholder="Search GitHub"]').attr("placeholder","搜索");
	$('ul.header-nav.left li a').text(queueDefine("浏览","特性","企业","博客"));
	if(hasLogin){
		//已登录
		$("a[href='/issues']").html(jqReplacer("Issues","问题"));
		if($("a[href='/notifications']").attr("aria-label")=="You have no unread notifications")$("a[href='/notifications']").attr("aria-label","无未读信息");
		$("a.header-nav-link[href='/new']").attr("aria-label","新建...");
		$('a[data-ga-click="Header, show menu, icon:avatar"]').attr("aria-label","浏览个人资料等");
		
		$('ul.dropdown-menu.dropdown-menu-sw:first').children().html(queueDefine("新建仓库","新建组织",null,"本仓库","提交问题","新建合作"));
		$('div.dropdown-menu.dropdown-menu-sw:first').children().html(queueDefine(null,null,"我的资料","我的收藏","浏览","帮助",null,"设置",null)).first().html(jqReplacer("Signed in as","登陆账号：")).nextAll().last().html(jqReplacer("Sign out","注销"));
	}else{
		//未登录
		$('div.header-actions a[href="/join"]').text("注册").next().text("登陆");
	}
}
function subContentTail(){
	$('.site-footer-links:first li a').text(queueDefine("状态",null,"培训","商店","博客","关于","帮助"));
	$('.site-footer-links:last li a') .text(queueDefine("条款","隐私","安全性","联系"));
}
// 辅助翻译函数，可以把代码量减少10%，不过用了闭包和jQuery函数调教器，可能jQuery和OOP初学者有点难懂。
function jqReplacer(s,r){return function(i,o){return o.replace(s,r);}}
function jqReplacers(){
	if(arguments.length%2==1)throw "参数必须成对!";
	args=arguments;
	max=arguments.length;
	return function(i,o){
		if(o==null)return null;
		for(l=0;l<max;l+=2) o=o.replace(args[l],args[l+1]);
		return o;
	}
}
function queueDefine(){
	args=arguments;
	return function(i,c){if(args[i]!=null){return args[i];}else return c;};
}