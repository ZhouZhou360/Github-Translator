//必须
hasTranslatedGithub=false;
//
/*chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request=="TranslateGithub"){
		if(hasTranslatedGithub==false){
			$(document).ready(translate);
			sendResponse("GithubTranslated");
		}else{
			sendResponse("GithubHasTranslated");
		}
	}
});*/
//请求翻译
chrome.runtime.sendMessage("TranslateGithub!",function(response){
	if(response=="Now!"){
		$(translate);
		chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
            sendResponse("HasTranslated!");
        });
	}
	if(response=="Now!WithFont!"){
		$(translate);
		$(".container").css("font-family","微软雅黑");
		chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
            sendResponse("HasTranslated!");
        });
	}
	if(response=="Wait"){
		chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
			if(hasTranslatedGithub==true){
				sendResponse("HasTranslated!");
				return;
			}
            switch(request){
				case "TranslateGithub!":
					$(translate);
					sendResponse("OK!");
					break;
				case "TranslateGithubWithFont!":
					$(translate);
					$(".container").css("font-family","微软雅黑");
					sendResponse("OK!");
					break;
			}
        });
	}
});
//处理字体快关
/*chrome.extension.onMessage.addListener(
function(request,sender,sendResponse) {
	if(request=="EnableYaheiFontForGithub")$('*').css("font-family","微软雅黑");
	if(request=="DisableYaheiFontForGithub")$('*').css("font-family",defaultFont);
	sendResponse("OK!");
});*/