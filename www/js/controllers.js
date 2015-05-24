angular.module('igoApp.controllers',['igoApp.services','uiGmapgoogle-maps'])

.controller('topCtrl',function($scope, $state, $rootScope, searchInfo, searchMst, searchResult, animateDirection){
$scope.isTop = true;
$scope.isBack = animateDirection.back;

//都道府県リスト
$scope.prefList = searchMst.prefList;
$scope.yearMonthList = searchMst.yearMonthList;
$scope.guestStatusList = searchMst.guestStatusList;

//ロード中かどうかを判定
$scope.loading = false;
$scope.search = function(){
	$scope.loading = true;
	//入力内容を保持
	searchInfo.pref = $scope.pref;
	searchInfo.year_month = $scope.year_month;
	searchInfo.guest_status = $scope.guest_status;

	var pref = $scope.pref ? $scope.pref.value : '';
	var year_month = $scope.year_month ? $scope.year_month.value : '';
	var guest_status = $scope.guest_status ? $scope.guest_status.value : '';
	$scope.searchTournaments(pref, year_month, guest_status);
	//$state.go('search');
};

$scope.searchTournaments = function(pref, year_month, guest_status){
	//開催年月日の加工を行う
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();

	var currentYearMonth = year + '/' + ('0'+ month).slice(-2);

	//選択した年月が当月もしくは選択されていない場合、当日をセット
	if(year_month === '' || year_month == currentYearMonth){
		year_month = currentYearMonth+'/'+('0'+day).slice(-2);
	} else {
		year_month = year_month+'/01';
	}

	Parse.initialize("v0sufrrzgkMvVwdqlzYGr8cVDwNnPh9qnmrPUnr1",
  "pKAxMYvS35pqrLnBYmdS0FHlzNQuw8ZOr6EQjnCh");

	var searchParams = {
		'pref': pref,
		'guest_status':guest_status,
		'year_month':year_month
	};

	console.log(searchParams);
	Parse.Cloud.run('searchTournaments', searchParams, {
		success: function(results) {
			var resultArr = [];
			//このresultsに大会データが20件格納されている
			for(var i=0; i<results.length ; i++){
				//console.log(gameData[i]);
				resultArr.push({id:results[i].id, data:results[i].attributes});
			}
			searchResult.data = resultArr;
			$scope.loading = false;
			$scope.isTopToSearch =true;
			$state.go('search');
		},
		error: function(error) {
		}
	});
};
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		animateDirection.back = false;
	});
})

.controller('searchCtrl',function($scope, $state, $rootScope, searchInfo, searchMst, searchResult, animateDirection){
	$scope.isTopToSearch =true;
	$scope.isBack = animateDirection.back;
	$scope.isFirstAccess =true;
	//都道府県リスト
	$scope.prefList = searchMst.prefList;
	$scope.yearMonthList = searchMst.yearMonthList;
	$scope.guestStatusList = searchMst.guestStatusList;
	$scope.pref = searchInfo.pref;
	$scope.year_month = searchInfo.year_month;
	$scope.guest_status = searchInfo.guest_status;

	$scope.resultList = searchResult.data;

	$scope.getYearMonthLabel = function(){
		var retLabel = '';
		angular.forEach($scope.yearMonthList,function(record, i){
			if(record.value == $scope.year_month){
				retLabel = record.text;
			}
		});
		return retLabel;
	};

	//入力条件が変更された場合に、再検索する
	$scope.$watch('pref+year_month+guest_status',function(oldValue, newValue){
		//初回監視は無視する
		if($scope.isFirstAccess){
			$scope.isFirstAccess = false;
			return;
		}
		//console.log('検索条件が変更されました');
		$scope.loading = true;
		var pref = $scope.pref ? $scope.pref.value : '';
		var year_month = $scope.year_month ? $scope.year_month.value : '';
		var guest_status = $scope.guest_status ? $scope.guest_status.value : '';
		$scope.searchTournaments(pref, year_month, guest_status);
	});

	$scope.searchTournaments = function(pref, year_month, guest_status){
		//開催年月日の加工を行う
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();

		var currentYearMonth = year + '/' + ('0'+ month).slice(-2);

		//選択した年月が当月もしくは選択されていない場合、当日をセット
		if(year_month === '' || year_month == currentYearMonth){
			year_month = currentYearMonth+'/'+('0'+day).slice(-2);
		} else {
			year_month = year_month+'/01';
		}

		Parse.initialize("v0sufrrzgkMvVwdqlzYGr8cVDwNnPh9qnmrPUnr1",
	  "pKAxMYvS35pqrLnBYmdS0FHlzNQuw8ZOr6EQjnCh");

		var searchParams = {
			'pref': pref,
			'guest_status':guest_status,
			'year_month':year_month
		};

		console.log(searchParams);
		Parse.Cloud.run('searchTournaments', searchParams, {
			success: function(results) {
				var resultArr = [];
				//このresultsに大会データが20件格納されている
				for(var i=0; i<results.length ; i++){
					//console.log(gameData[i]);
					resultArr.push({id:results[i].id, data:results[i].attributes});
				}
				searchResult.data = resultArr;
				$scope.resultList = searchResult.data;
				$scope.loading = false;
				$scope.$apply();
			},
			error: function(error) {
			}
		});
	};

	//表示されている一覧の前２０件のデータを取得する
	$scope.getBeforeTournaments = function(){
		$scope.loading = true;
		var pref = $scope.pref ? $scope.pref.value : '';
		var guest_status = $scope.guest_status ? $scope.guest_status.value : '';

		//何もデータが表示されていない場合は、取得処理を行わない
		if($scope.resultList === undefined || $scope.resultList.length === 0) return;
		var id = $scope.resultList[0].id;

		var searchParams = {
			pref: pref,
			guest_status: guest_status,
			id: id
		};

		Parse.initialize("v0sufrrzgkMvVwdqlzYGr8cVDwNnPh9qnmrPUnr1","pKAxMYvS35pqrLnBYmdS0FHlzNQuw8ZOr6EQjnCh");
		Parse.Cloud.run('getBefore20Tournaments', searchParams, {
			success: function(results) {
				var resultArr = [];
				//このresultsに直前20件の大会データが格納されている
				for(var i=0; i<results.length ; i++){
					$scope.resultList.unshift({id:results[i].id, data:results[i].attributes});
				}
				searchResult.data = $scope.resultList;
				$scope.loading = false;
				$scope.$apply();
			},
			error: function(error) {
			}
		});
	};

	//表示されている一覧の後２０件のデータを取得する
	$scope.getAfterTournaments = function(){
		$scope.loading = true;
		var pref = $scope.pref ? $scope.pref.value : '';
		var guest_status = $scope.guest_status ? $scope.guest_status.value : '';

		//何もデータが表示されていない場合は、取得処理を行わない
		if($scope.resultList === undefined || $scope.resultList.length === 0) return;
		var id = $scope.resultList[$scope.resultList.length-1].id;

		var searchParams = {
			pref: pref,
			guest_status: guest_status,
			id: id
		};

		Parse.initialize("v0sufrrzgkMvVwdqlzYGr8cVDwNnPh9qnmrPUnr1","pKAxMYvS35pqrLnBYmdS0FHlzNQuw8ZOr6EQjnCh");
		Parse.Cloud.run('getAfter20Tournaments', searchParams, {
			success: function(results) {
				//このresultsに直後20件の大会データが格納されている
				for(var i=0; i<results.length ; i++){
					$scope.resultList.push({id:results[i].id, data:results[i].attributes});
				}
				searchResult.data = $scope.resultList;
				$scope.loading = false;
				$scope.$apply();
			},
			error: function(error) {
			}
		});
	};

	$scope.showDetail = function(id){
		$state.go({idx:id});
	};

	$scope.back = function(){
		$scope.isBack = true;
		animateDirection.back = true;
		$state.go('top');
	};

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		animateDirection.back = false;
	});
})

.controller('detailCtrl',function($scope,$state,$stateParams,searchResult, animateDirection){
	$scope.detailData = searchResult.data[$stateParams.idx].data;
	$scope.isBack = animateDirection.back;

	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({address:$scope.detailData.address},function(results, status){
		if (status == google.maps.GeocoderStatus.OK) {
      var latlng = results[0].geometry.location;
			$scope.map.center = {latitude:latlng.lat(),longitude:latlng.lng()};
			$scope.siteMarkers[0] = {id:0,coords:{latitude:latlng.lat(),longitude:latlng.lng()}};
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
	});

	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 13 };
	$scope.siteMarkers = [];

	$scope.trimhyphen = function(str){
		return str.replace(/-/g,'');
	};

	$scope.openUrl = function(url){
		var ref = cordova.InAppBrowser.open(url, '_system', 'location=yes');
	};

	$scope.back = function(){
		$scope.isBack = true;
		//$scope.$apply();
		animateDirection.back = true;
		$state.go('search');
	};
});
