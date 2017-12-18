var calculatorView = (function(){

			function calculateOption1(paceArray){

				var optionSelected = document.querySelector("#option1_type").value

				if(optionSelected=="Kms"){
					document.querySelector("option1_result").innerHTML = paceArray[0].hours + ":" + paceArray[0].hours + ":" + paceArray[0].seconds +"/KM";
				}else{
					document.querySelector("option1_result").innerHTML = paceArray[1].miles + ":" + paceArray[1].yards + ":" + paceArray[1].feets +"/MILE";
				}

			}

			function calculateOption2(time){
					document.querySelector("option2_result").innerHTML = time.hours + ":" + time.minutes + ":" + time.seconds;
			}

			function calculateOption3(arrayOfObj){

				var tableData = document.querySelector("#tableData");

					for(var i=0;i<arrayOfObj.length;i++){

						var tr = document.createElement("tr");
						var th = document.createElement("th");
						th.setAttribute("scope", "row")
						th.innerHTML = i+1;
						var tdDistance = document.createElement("td");
						tdDistance.innerHTML = arrayOfObj[i].distance;
						var tdMark = document.createElement("td");
						tdMark.innerHTML = arrayOfObj[i].hours + ":" + arrayOfObj[i].minutes + ":" + arrayOfObj[i];

						tr.appendChild(th);
						tr.appendChild(tdDistance);
						tr.appendChild(tdMark);

						tableData.appendChild(tr);
					}
			}


			return{
				init:function(){
					events.subscribe("pace",calculateOption1);
					events.subscribe("mark",calculateOption2);
					events.subscribe("table",calculateOption3);
				}
			}
}())