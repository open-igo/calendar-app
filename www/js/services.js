angular.module('igoApp.services',[])

.factory('searchInfo', function(){

	return{
		pref:'',
		year_month:'',
		guest_status:''
	};
})

.factory('searchMst', function(){

	//開催月リスト
	//アプリ利用月から1年間分のプルダウンを生成
	var dateArr = [];

	var date = new Date();
	var maxDate = new Date();
	maxDate.setYear(maxDate.getFullYear() + 1);

	while(date.getTime() < maxDate.getTime()){
		var year = date.getFullYear();
		var month = date.getMonth()+1;

		dateArr.push({value:year+('0'+month).slice(-2), text:year+'年'+month+'月'});
		date.setMonth(date.getMonth() + 1);
	}

	return {
		pref
	}
})
;