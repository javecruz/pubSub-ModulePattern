calculatorView.init(); 

//First option
var firstOptionButton = document.querySelector(".option1_button");

firstOptionButton.addEventListener("click",function(){
	var hh,mm,ss,distance,type,time,timeToSeconds;
	hh = document.querySelector("#option1_hh").value;
	mm = document.querySelector("#option1_mm").value;
	ss = document.querySelector("#option1_ss").value;
	distance = document.querySelector("#option1_distance").value;
	type = document.querySelector("#option1_type").value;

	time = new calculator.creaTime(hh,mm,ss);

	timeToSeconds = calculator.timeConverter.timeToSeconds(time);

	if(type=="Kms"){
		calculator.paceInKm(timeToSeconds,distance)
	}else{
		calculator.paceInMiles(timeToSeconds,calculator.distanceConverter.metersToMiles(calculator.distanceConverter.kmToMeters(distance)))
	}
})


var secondOptionButton = document.querySelector(".option2_button");

secondOptionButton.addEventListener("click",function(){

	var type,hh,mm,ss,distance,pace,distanceInCurrentOption;

	type = document.querySelector("#option2_type");
	hh = document.querySelector("#option2_hh").value;
	mm = document.querySelector("#option2_mm").value;
	ss = document.querySelector("#option2_ss").value;
	distance = document.querySelector("#option2_distance").value;
	pace = new calculator.creaTime(hh,mm,ss);
	
	//markFromPacePerKm(pacePerKm,distanceInMeters)
	if(type=="Kms"){
		distanceInCurrentOption = calculator.distanceConverter.kmToMeters(distance);
		calculator.markFromPacePerKm(pace,distanceInCurrentOption);
	}else{
		distanceInCurrentOption = calculator.distanceConverter.milesToImperial(distance);
		calculator.markFromPacePerMile(pace,distanceInCurrentOption);
	}
})


var thirdOptionButton = document.querySelector(".option3_button");

thirdOptionButton.addEventListener("click",function(){

	var type,hh,mm,ss,distance,cut,pace,distanceInCurrentOption,cutInCurrentOption;

	type = document.querySelector("#option3_type").value;
	hh = document.querySelector("#option3_hh").value;
	mm = document.querySelector("#option3_mm").value;
	ss = document.querySelector("#option3_ss").value;
	distance = document.querySelector("#option3_distance").value;
	cut = document.querySelector("#option3_cut").value;
	pace = new calculator.creaTime(hh,mm,ss);

	if(type=="Kms"){

		distanceInCurrentOption = calculator.distanceConverter.kmToMeters(distance);
		cutInCurrentOption = calculator.distanceConverter.kmToMeters(cut);
		calculator.tableTimeFromPacePerKm(pace,distanceInCurrentOption,cutInCurrentOption);
	}else{
		distanceInCurrentOption = distance; // ya son millas de por sí
		cutInCurrentOption = cut;
		calculator.tableTimeFromPacePerMile(pace,distanceInCurrentOption,cutInCurrentOption);
	}

	
})