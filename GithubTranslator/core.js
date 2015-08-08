//首次运行时，创建自动翻译变量。
if(typeof(localStorage.autoTranslation)=="undefined" ){
	localStorage.autoTranslation="true";
}
if(typeof(localStorage.useYaheiFont)=="undefined" ){
	localStorage.useYaheiFont="true";
}
chrome.runtime.onInstalled.addListener(function(details) {
	if(details.reason=="install"){
		alert("欢迎安装Github中文翻译插件！\n本插件为开源项目，可以在Github上找到源码。\n建议使用官方最新版，更有质量和安全保障。\n作者Harry01");
	}
});
//注册右键菜单
chrome.contextMenus.onClicked.removeListener();
chrome.contextMenus.removeAll();
chrome.contextMenus.create({type:"checkbox",id:"AutoTranslateGithub?",title:"开启自动翻译",checked:false,contexts:["page_action"]},throwError);
chrome.contextMenus.create({type:"checkbox",id:"UseYaheiFont?",title:"使用微软雅黑字体(需要刷新)",checked:false,contexts:["page_action"]},throwError);
chrome.contextMenus.create({id:"VisitGithubTranslatorProject",title:"访问Github项目网站(反馈/bug/资讯)",contexts:["page_action"]},throwError);
if(localStorage.autoTranslation=="true")chrome.contextMenus.update("AutoTranslateGithub?",{checked:true},throwError);
if(localStorage.useYaheiFont=="true")chrome.contextMenus.update("UseYaheiFont?",{checked:true},throwError);
chrome.contextMenus.onClicked.addListener(function(info,tab){
	if(info.menuItemId=="AutoTranslateGithub?"){
		if(info.checked) localStorage.autoTranslation="true";
		else localStorage.autoTranslation="false";
		return;
	}
	if(info.menuItemId=="UseYaheiFont?"){
		if(info.checked){
			localStorage.useYaheiFont="true";
			//chrome.extension.sendMessage(
		}
		else{
			localStorage.useYaheiFont="false";
			//chrome.extension.sendMessage(
		}
		return;
	}
	if(info.menuItemId=="VisitGithubTranslatorProject"){
		chrome.tabs.create({url:"https://github.com/BoyHarry/Github-Translator"});
		return;
	}
});
//点击翻译
chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.pageAction.setIcon({tabId:tab.id,path:"pa_wait.png"});
	chrome.pageAction.setTitle({tabId:tab.id,title:"翻译中..."});
	chrome.tabs.sendMessage(tab.id,localStorage.useYaheiFont=="true"?"TranslateGithubWithFont!":"TranslateGithub!",function(response){
		/* if(response=="OK!"){
			chrome.pageAction.setIcon({tabId:tab.id,path:"pa_ok.png"});
			chrome.pageAction.setTitle({tabId:tab.id,title:"已翻译 Github"});
		}else if(response=="HasTranslated!"){
			chrome.pageAction.hide(tab.id);
		}else{
			chrome.pageAction.setIcon({tabId:tab.id,path:"pa_error.png"});
			chrome.pageAction.setTitle({tabId:tab.id,title:"无法翻译Github"});
		} */
        switch(response){
			case "OK!":
				chrome.pageAction.setIcon({tabId:tab.id,path:"pa_ok.png"});
				chrome.pageAction.setTitle({tabId:tab.id,title:"已翻译 Github"});
				break;
			case "HasTranslated!":
				chrome.pageAction.hide(tab.id);
				break;
			default:
				chrome.pageAction.setIcon({tabId:tab.id,path:"pa_error.png"});
				chrome.pageAction.setTitle({tabId:tab.id,title:"无法翻译Github"});
		}
    });
});
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
	chrome.pageAction.show(sender.tab.id);
	if(request=="TranslateGithub!"){
		if(localStorage.autoTranslation=="true"){
			sendResponse(localStorage.useYaheiFont=="true"?"Now!WithFont!":"Now!");
			chrome.pageAction.setIcon({tabId:sender.tab.id,path:"pa_ok.png"});
			chrome.pageAction.setTitle({tabId:sender.tab.id,title:"已翻译 Github"});
		}else sendResponse("Wait");
	}
});
//输出错误
function throwError(){
	if(!chrome.runtime.lastError)return;
	alert("诶呀，出错了！请升级Chrome或检查配置，或联系作者。\n错误代码：\n"+JSON.stringify(chrome.runtime.lastError, null, "t"));
}