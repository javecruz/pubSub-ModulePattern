var calculator = (function(){
	
	//submodul 1
	var timeConverter = (function(){


		function timeToSeconds(time){
			time.hours = time.hours * 1;
			time.minutes = time.minutes * 1;
			time.seconds = time.seconds * 1;
			return (((time.hours*60) + time.minutes)*60) + time.seconds;
		}


		function secondsToTime(seconds){

			var resto = seconds;

			var hours = Math.floor(resto/3600)
			resto = resto%3600;

			var minutes = Math.floor(resto/60);
			resto = resto%60;

			var seconds =resto.toFixed(2)*1;


			return new Time(hours,minutes,seconds);

		}


		return {
			timeToSeconds:timeToSeconds,
			secondsToTime:secondsToTime
		}

	}())





	//submodul 2
	var distanceConverter = (function(){

		function kmToMeters(km){
			return km * 1000;
		}

		function metersToKm(meters){
			return meters / 1000;
		}

		function milesToImperial(miles){

			var resto = miles;

			var miles = Math.floor(resto);
			resto = resto - miles;

			var yards = Math.floor(resto*1760);

			var feets = (((resto*1760) - yards)*3).toFixed(2) *1;

			return new Imperial(miles,yards,feets);
		}


		function yardsToImperial(yards){

			var miles = Math.floor(yards/1760);
			var resto = yards%1760;
			var yards = Math.floor(resto)
			resto = resto - yards;
			var feets =	(resto*3).toFixed(2) *1;
			return new Imperial(miles,yards,feets);
		}

		function imperialToMiles(imperial){
			var miles;
			miles = imperial.feets / 3 / 1760;
			miles = miles + imperial.yards / 1760;
			miles = miles + imperial.miles;
			return miles;
		}

		function metersToMiles(meters){
			return (meters/1609.344).toFixed(2)*1;
		}

		function milesToMeters(miles){
			return (miles*1609.344).toFixed(2)*1;
		}


		return {
			kmToMeters:kmToMeters,
			metersToKm:metersToKm,
			milesToImperial:milesToImperial,
			milesToMeters:milesToMeters,
			yardsToImperial:yardsToImperial,
			imperialToMiles:imperialToMiles,
			metersToMiles:metersToMiles,
			milesToMeters:milesToMeters
		}





	}())





	// private methods, will open public

	function paceInKm(timeInSeconds,distanceInKm){
		var inKm = timeConverter.secondsToTime(timeInSeconds / distanceInKm);
		var inMiles = timeConverter.secondsToTime(timeInSeconds / distanceConverter.metersToMiles(distanceConverter.kmToMeters(distanceInKm)))
		events.publish('pace', [inKm,inMiles]);
		return [inKm,inMiles];
	}


	function paceInMiles(timeInSeconds,distanceInMiles){
		var inKm = timeConverter.secondsToTime(timeInSeconds / distanceConverter.metersToKm(distanceConverter.milesToMeters(distanceInMiles)));
		var inMiles = timeConverter.secondsToTime(timeInSeconds / distanceInMiles)
		events.publish('pace', [inKm,inMiles]);
		return [inKm,inMiles];
	}


	function markFromPacePerKm(pacePerKm,distanceInMeters){
		var inKm = distanceConverter.metersToKm(distanceInMeters);

		var secondsPace = timeConverter.timeToSeconds(pacePerKm);

		var total = inKm * secondsPace;

		events.publish("mark", timeConverter.secondsToTime(total))
		return timeConverter.secondsToTime(total);
	}


	function markFromPacePerMile(pacePerMile,distanceInImperial){
		var inMiles = distanceConverter.imperialToMiles(distanceInImperial);

		var secondsPace = timeConverter.timeToSeconds(pacePerMile);

		var total = inMiles * secondsPace;

		events.publish("mark", timeConverter.secondsToTime(total))
		return timeConverter.secondsToTime(total);
	}


	function tableTimeFromPacePerKm(pacePerKm,distanceInMeters,cutDistanceInMeters){
		var datos = [];
		var currentDistance;
		for(var i=0;i<Math.ceil(distanceInMeters/cutDistanceInMeters);i++){

			// es para ver la distancia actual a calcular y tamb controlar la ultima
			if(cutDistanceInMeters*(i+1)>distanceInMeters){
				currentDistance = distanceInMeters;
			}else{
				currentDistance = cutDistanceInMeters*(i+1);
			}

			datos.push({
				distance:currentDistance,
				mark:markFromPacePerKm(pacePerKm,currentDistance)
			})
		}

		events.publish("table", datos)
		return datos;
	}


	function tableTimeFromPacePerMile(pacePerMile,distanceInMiles,cutDistanceInYards){
		var datos = [];
		var currentDistance;	// distancia actual en millas
		for(var i=0;i<Math.ceil(distanceInMiles/distanceConverter.imperialToMiles(distanceConverter.yardsToImperial(cutDistanceInYards)));i++){
	
			//entra en el último
			if(i+1==Math.ceil(distanceInMiles/distanceConverter.imperialToMiles(distanceConverter.yardsToImperial(cutDistanceInYards)))){
				currentDistance = distanceInMiles;
			}else{
				currentDistance = distanceConverter.imperialToMiles(distanceConverter.yardsToImperial(cutDistanceInYards)) * (i+1);
			}

			datos.push({
			distance:distanceConverter.milesToImperial(currentDistance),
			mark:markFromPacePerMile(pacePerMile,distanceConverter.milesToImperial(currentDistance))
			})
			
		}
		
		events.publish("table", datos)
		return datos;
	}


	// objects

	 function Time(hours,minutes,seconds){
		this.hours = hours;
		this.minutes = minutes;
		this.seconds = seconds;
	}

	function Imperial(miles,yards,feets){
		this.miles = miles;
		this.yards = yards;
		this.feets = feets;
	}





	return {
		timeConverter:timeConverter,
		distanceConverter:distanceConverter,
		paceInKm:paceInKm,
		paceInMiles:paceInMiles,
		markFromPacePerKm:markFromPacePerKm,
		markFromPacePerMile:markFromPacePerMile,
		tableTimeFromPacePerKm:tableTimeFromPacePerKm,
		tableTimeFromPacePerMile,tableTimeFromPacePerMile,
		creaTime:Time,
		creaImperial:Imperial
	}
	

}())



/* ESTRUCTURA
events.js
calculator.js (modelo)
calculatorView.js(vista)
main.js
*/