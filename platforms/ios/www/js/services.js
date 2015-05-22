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

		var yearMonthVal = year+'/'+('0'+month).slice(-2);

		dateArr.push({value:yearMonthVal, text:year+'年'+month+'月'});
		date.setMonth(date.getMonth() + 1);
	}

	var prefList = [
		{value:'北海道', text:'北海道'},
		{value:'青森県', text:'青森県'},
		{value:'岩手県', text:'岩手県'},
		{value:'宮城県', text:'宮城県'},
		{value:'秋田県', text:'秋田県'},
		{value:'山形県', text:'山形県'},
		{value:'福島県', text:'福島県'},
		{value:'茨城県', text:'茨城県'},
		{value:'栃木県', text:'栃木県'},
		{value:'群馬県', text:'群馬県'},
		{value:'埼玉県', text:'埼玉県'},
		{value:'千葉県', text:'千葉県'},
		{value:'東京都', text:'東京都'},
		{value:'神奈川県', text:'神奈川県'},
		{value:'新潟県', text:'新潟県'},
		{value:'富山県', text:'富山県'},
		{value:'石川県', text:'石川県'},
		{value:'富山県', text:'富山県'},
		{value:'福井県', text:'福井県'},
		{value:'山梨県', text:'山梨県'},
		{value:'長野県', text:'長野県'},
		{value:'岐阜県', text:'岐阜県'},
		{value:'静岡県', text:'静岡県'},
		{value:'愛知県', text:'愛知県'},
		{value:'三重県', text:'三重県'},
		{value:'滋賀県', text:'滋賀県'},
		{value:'京都府', text:'京都府'},
		{value:'大阪府', text:'大阪府'},
		{value:'兵庫県', text:'兵庫県'},
		{value:'奈良県', text:'奈良県'},
		{value:'和歌山県', text:'和歌山県'},
		{value:'鳥取県', text:'鳥取県'},
		{value:'島根県', text:'島根県'},
		{value:'岡山県', text:'岡山県'},
		{value:'広島県', text:'広島県'},
		{value:'山口県', text:'山口県'},
		{value:'徳島県', text:'徳島県'},
		{value:'香川県', text:'香川県'},
		{value:'愛媛県', text:'愛媛県'},
		{value:'高知県', text:'高知県'},
		{value:'福岡県', text:'福岡県'},
		{value:'佐賀県', text:'佐賀県'},
		{value:'長崎県', text:'長崎県'},
		{value:'熊本県', text:'熊本県'},
		{value:'大分県', text:'大分県'},
		{value:'宮崎県', text:'宮崎県'},
		{value:'鹿児島県', text:'鹿児島県'},
		{value:'沖縄県', text:'沖縄県'}
		];

	var guestStatusList = [
		{value:'一般', text:'一般'},
		{value:'大学生', text:'大学生'},
		{value:'高校生', text:'高校生'},
		{value:'中学生', text:'中学生'},
		{value:'小学生', text:'小学生'},
		{value:'小学生未満', text:'小学生未満'}
		];

	return {
		prefList: prefList,
		yearMonthList:dateArr,
		guestStatusList: guestStatusList
	};
})

.factory('searchResult',function(){

//検索結果を格納する配列
var searchResultArr = [];
	return {
		data:searchResultArr
	};

})

.factory('animateDirection',function(){
	return{
		back: false
	};
});