var calculatorView = (function(){

			function calculateOption1(paceArray){

				var optionSelected = document.querySelector("#option1_type").value

				if(optionSelected=="Kms"){
					document.querySelector(".option1_result").innerHTML = paceArray[0].hours + ":" + paceArray[0].minutes + ":" + paceArray[0].seconds +"/KM";
				}else{
					document.querySelector(".option1_result").innerHTML = paceArray[1].hours + ":" + paceArray[1].minutes + ":" + paceArray[1].seconds +"/MILE";
				}

			}

			function calculateOption2(time){
					document.querySelector(".option2_result").innerHTML = time.hours + ":" + time.minutes + ":" + time.seconds;
			}

			function calculateOption3(arrayOfObj){

				var tableData = document.querySelector("#tableData");
				 while(tableData.firstChild){
					tableData.removeChild(tableData.firstChild);
				 }
					for(var i=0;i<arrayOfObj.length;i++){

						var tr = document.createElement("tr");
						var th = document.createElement("th");
						th.setAttribute("scope", "row")
						th.innerHTML = i+1;
						var tdDistance = document.createElement("td");
						//check if is an object (miles) or a number (kms)
						if(typeof arrayOfObj[i].distance === "object"){
							tdDistance.innerHTML = arrayOfObj[i].distance.miles + " miles -- " + arrayOfObj[i].distance.yards + " yards -- " + arrayOfObj[i].distance.feets +" feets";	
						}else{
							tdDistance.innerHTML = arrayOfObj[i].distance;	
						}
						
						var tdMark = document.createElement("td");
						tdMark.innerHTML = arrayOfObj[i].mark.hours + ":" + arrayOfObj[i].mark.minutes + ":" + arrayOfObj[i].mark.seconds;

						tr.appendChild(th);
						tr.appendChild(tdDistance);
						tr.appendChild(tdMark);

						tableData.appendChild(tr);
					}
			}

			function test(){
				console.log("hola");
			}

	

			return{
				
				init:function(){
					events.subscribe("pace",calculateOption1);
					events.subscribe("pace",test);
					events.subscribe("mark",calculateOption2);
					events.subscribe("table",calculateOption3);
				}
				


			}
}())

