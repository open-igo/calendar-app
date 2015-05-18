angular.module('igoApp.services',[])

.factory('searchInfo', function(){

	return{
		pref:'',
		year_month:'',
		guest_status:''
	};
});