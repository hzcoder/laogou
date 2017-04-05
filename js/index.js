'use strict';

angular.module('app',['ui.router','ngCookies']);
'use strict';
angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url:'/main',
		templateUrl:'view/main.html',
		controller:'mainCtrl'
	})
	.state('position',{
		url:'/position/:id',
		templateUrl:'view/position.html',
		controller:'positionCtrl'
	})
	.state('company',{
		url:'/company',
		templateUrl:'view/company.html',
		controller:'companyCtrl'
	})
	.state('search',{
		url:'/search',
		templateUrl:'view/search.html',
		controller:'searchCtrl'
	})
	.state('consumer',{
		url:'/consumer',
		templateUrl:'view/consumer.html',
		controller:'consumerCtrl'
	})
	.state('login',{
		url:'/login',
		templateUrl:'view/login.html',
		controller:'loginCtrl'
	})
	.state('regist',{
		url:'/regist',
		templateUrl:'view/regist.html',
		controller:'registCtrl'
	})
	.state('delivery',{
		url:'/delivery',
		templateUrl:'view/delivery.html',
		controller:'deliveryCtrl'
	})
	.state('collection',{
		url:'/collection',
		templateUrl:'view/collection.html',
		controller:'collectionCtrl'
	});
	$urlRouterProvider.otherwise('main');	
}])
'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('collectionCtrl', ['$scope','$http','$rootScope', function($scope,$http,$rootScope){
	$http.get('data/myFavorite.json')
		.then((resp)=>{
			$scope.data=resp.data;
		});
	$scope.starUrl="image/star-active.png";
	$scope.star=false;
	var flag=true;
	$scope.cancelSeled=function($event){
		$event.stopPropagation();
		if(flag){
			$scope.starUrl="image/star.png";
			flag=false;
		}else{
			$scope.starUrl="image/star-active.png";
			flag=true;
		}
	}
}])
'use strict';


angular.module('app').controller('companyCtrl', ['$scope','$http','$state', function($scope,$http,$state){
	$http.get('data/company.json')
		.then((resp)=>{
			$scope.data=resp.data;
		});
	$scope.sty1="on";
	$scope.sty2="";
	$scope.flage1=false;
	$scope.flage2=true;
	$scope.changeFirst=function(){
		if($scope.flage1){
			$scope.flage1=!$scope.flage1;
			$scope.flage2=!$scope.flage2;
			$scope.sty1="on";
			$scope.sty2="";
		}
		
	};
	$scope.changeSecond=function(){
		if($scope.flage2){
			$scope.flage1=!$scope.flage1;
			$scope.flage2=!$scope.flage2;
			$scope.sty1="";
			$scope.sty2="on";
		}
	};
}])
'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('consumerCtrl', ['$scope','$http','$rootScope','$state', function($scope,$http,$rootScope,$state){
	$http.get('data/regist.json')
		.then((resp)=>{
			$scope.data=resp.data;
		});
	if($rootScope.states==1){
		$scope.flage1=true;
		$scope.flage2=false;
	}else{
		$scope.flage1=false;
		$scope.flage2=true;
	}
	$scope.doExit=function(){
		$rootScope.states=0;
		window.location.reload();
	};
}])
'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('deliveryCtrl', ['$scope','$http','$rootScope', function($scope,$http,$rootScope){
	$http.get('data/myPost.json')
		.then((resp)=>{
			$scope.data=resp.data;
		});
	$scope.selc1='choed';
	$scope.star=true;
	$scope.changeData1=function(){
		$http.get('data/myPost.json')
		.then((resp)=>{
			$scope.data=resp.data;
		});
		$scope.selc1='choed';
		$scope.selc2='';
		$scope.selc3='';
	};
	$scope.changeData2=function(){
		$http.get('data/myFavorite.json')
		.then((resp)=>{
			$scope.data=resp.data;
		});
		$scope.selc1='';
		$scope.selc2='choed';
		$scope.selc3='';
	};
	$scope.changeData3=function(){
		$http.get('data/myPost.json')
		.then((resp)=>{
			$scope.data=resp.data;
		});
		$scope.selc1='';
		$scope.selc2='';
		$scope.selc3='choed';
	};
}])
'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('loginCtrl', ['$scope','$http','$cookies','$state','$rootScope', function($scope,$http,$cookies,$state,$rootScope){
	
	$scope.checkLogin=function(){
		// console.log($cookies.getObject('register').phone);
		// console.log($cookies.getObject('register').pwd);
		if($scope.phone==$cookies.getObject('register').phone && $scope.pwd==$cookies.getObject('register').pwd){
			$state.go('main');
			$rootScope.states=1;
		}
	}
}])
'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('mainCtrl', ['$scope','$http','$rootScope', function($scope,$http,$rootScope){
	$http.get('data/positionList.json')
		.then((resp)=>{
			$scope.data=resp.data;
		});
	$http.get('data/regist.json')
		.then((resp)=>{
			$scope.data1=resp.data;
		});
	$scope.star=true;
	if($rootScope.states==1){
		$scope.flage1=true;
		$scope.flage2=false;
	}else{
		$scope.flage1=false;
		$scope.flage2=true;
	}
}])
'use strict';


angular.module('app').controller('positionCtrl', ['$scope','$http','$state','$rootScope', function($scope,$http,$state,$rootScope){
	$http.get('data/position.json?id='+$state.params.id)
		.then((resp)=>{
			$scope.data=resp.data;
		});
	$scope.imgUrl="image/star.png";
	
	if($rootScope.states==1){
		$scope.flage1=true;
		$scope.flage2=false;
		$scope.flage3=false;
	}else{
		$scope.flage1=false;
		$scope.flage2=true;
		$scope.flage3=true;
	}
	var flg=true;
	var flg1=true;
	$scope.flage4=true;
	$scope.doCollect=function(){
		if(flg){
			$scope.imgUrl="image/star-active.png";
			flg=false;
		}else{
			$scope.imgUrl="image/star.png";
			flg=true;
		}
	};
	$scope.doSendResume=function(){
		$scope.flage2=true;
		$scope.flage4=false;
	}


}])
'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('registCtrl', ['$scope','$http','$interval','$cookies','$state', function($scope,$http,$interval,$cookies,$state){
	$scope.check1=false;
	$scope.check2=false;
	$scope.checkUsername=function(){
		if(/^1(3|4|5|7|8)\d{9}$/.test($scope.username)){
			$scope.msg1='✅';
			$scope.check1=true;
		}else{
			$scope.msg1='❌';
			$scope.check1=false;
		}
	};

	$scope.checkPwd=function(){
		if(/^[0-9A-Za-z]{6,}$/.test($scope.pwd)){
			$scope.msg2='✅';
			$scope.check2=true;
		}else{
			$scope.msg2='❌';
			$scope.check2=false;
		}
	};
	$scope.sendTxt='发送短信';
	$scope.doSend=function(){
		$scope.sendTxt=10;
		var timer=$interval(doReduce,1000);
		function doReduce(){
			$scope.sendTxt--;
			if($scope.sendTxt===0){
				$interval.cancel(timer);
				$scope.sendTxt='重新发送';
			}
		}
	};
	
	$scope.checkRegist=function(){
		if($scope.check1 && $scope.check2){
			$cookies.putObject('register',{phone: $scope.username,pwd: $scope.pwd});
			$state.go('login');
		}
	};
}])
'use strict';


angular.module('app').controller('searchCtrl', ['$scope','$http','$state', function($scope,$http,$state){
	$http.get('data/positionList.json')
		.then((resp)=>{
			$scope.data=resp.data;
	});
	$scope.star=true;
	$scope.clo1="";
	$scope.clo2="";
	$scope.clo3="";
	$scope.flage1=true;
	$scope.city='城市';
	$scope.salary='薪水';
	$scope.scale='公司规模';
	$scope.doSelect1=function(){
		$scope.clo1="choed";
		$scope.clo2="";
		$scope.clo3="";
		$scope.flage1=false;
		$http.get('data/city.json')
			.then((resp)=>{
				$scope.data1=resp.data;
		});
	};
	$scope.doSelect2=function(){
		$scope.clo1="";
		$scope.clo2="choed";
		$scope.clo3="";
		$scope.flage1=false;
		$http.get('data/salary.json')
			.then((resp)=>{
				$scope.data1=resp.data;
		});
	};
	$scope.doSelect3=function(){
		$scope.clo1="";
		$scope.clo2="";
		$scope.clo3="choed";
		$scope.flage1=false;
		$http.get('data/scale.json')
			.then((resp)=>{
				$scope.data1=resp.data;
		});
	};
	$scope.doHide=function(){
		$scope.flage1=true;
		$scope.clo1="";
		$scope.clo2="";
		$scope.clo3="";
	};

	$scope.doChangeValue=function(item){
		if($scope.clo1=='choed'){
			$scope.city=item;
			$scope.doHide();
		}
		if($scope.clo2=='choed'){
			$scope.salary=item;
			$scope.doHide();
		}
		if($scope.clo3=='choed'){
			$scope.scale=item;
			$scope.doHide();
		}
	};
}])
'user strict';

angular.module('app').directive('appBottom', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/bottom.html'
	};
}])
'user strict';

angular.module('app').directive('appButtons', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/buttons.html'
	};
}])
'user strict';

angular.module('app').directive('appCompanyDetail', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/company-detail.html'
	};
}])
'user strict';

angular.module('app').directive('appCompanyPost', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/company-post.html'
	};
}])
'user strict';

angular.module('app').directive('appConsumerLogined', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/consumer-logined.html'
	};
}])
'user strict';

angular.module('app').directive('appDeliveryList', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/delivery-list.html'
	};
}])
'user strict';

angular.module('app').directive('appDescriptionMiddle', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/description-middle.html'
	};
}])
'user strict';

angular.module('app').directive('appFooter', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/footer.html'
	};
}])

'user strict';

angular.module('app').directive('appHead', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/head.html'
	};
}])

'user strict';

angular.module('app').directive('appLoginBg', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/login-bg.html'
	};
}])

'user strict';

angular.module('app').directive('appLoginInput', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/login-input.html'
	};
}])
'user strict';

angular.module('app').directive('appPositionDetail', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/position-detail.html'
	};
}])
'user strict';

angular.module('app').directive('appPositionList', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/position-list.html'
	};
}])

'user strict';

angular.module('app').directive('appRegistButtons', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/regist-buttons.html'
	};
}])
'user strict';

angular.module('app').directive('appRegistInput', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/regist-input.html'
	};
}])
'user strict';

angular.module('app').directive('appSearchBg', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/search-bg.html'
	};
}])
'user strict';

angular.module('app').directive('appSearchCondition', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/search-condition.html'
	};
}])
'user strict';

angular.module('app').directive('appSearchList', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/search-list.html'
	};
}])
'user strict';

angular.module('app').directive('appSearchTop', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/search-top.html'
	};
}])
'user strict';

angular.module('app').directive('appToLogin', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/to-login.html'
	};
}])
'user strict';

angular.module('app').directive('appTop', [function () {
	return {
		scope:{
			title:"@appTop",
		},
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/top.html'
	};
}])