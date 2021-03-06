"use strict";
const medium = {
  template: `
  <section class="main"> 
    <section class="background">
      <section class = "QApopup" ng-show="$ctrl.show" ng-class="$ctrl.incorrect ? 'incorrect' : 'incorrect-disabled'">
        <p class="question" >{{$ctrl.qA.question}}</p>
        <p class = "answer" ng-repeat = "answer in $ctrl.qA.answers">
        <input type = "radio" name = "answer" ng-click = "$ctrl.guess(answer.correct)" ng-disabled=""> {{ answer.answer }}
        </p>
      </section>

      <p class="correctAnswer" ng-show="$ctrl.showCorrect">Correct!</p>
      <p class="tryAgain" ng-show="$ctrl.tryAgain">Try Again</p>

      <div>  
        <img remove-click ng-click="$ctrl.qPopup(3)" src="./images/growler.png" class="growler"> 
      </div>
      <div>  
        <img ng-click="$ctrl.try()" src="./images/globe.png" class="globe">  
        <img remove-click ng-click="$ctrl.qPopup(0)" src="./images/octopuspainting.png" class="octopus">
      </div>
      <div>
      <img  ng-click="$ctrl.try()" src="./images/desktopclock.png" class="clock">
      </div>
      <div>
        <img remove-click ng-click="$ctrl.qPopup(1)" src="./images/bedpillow.png" class="bed">
        <img ng-click="$ctrl.try()" src="./images/mermaidpainting.png" class="mermaid">
      </div>
      <div>
        <img ng-click="$ctrl.try()" src="./images/sailorhats.png" class="hats">
      </div>
      <div>
        <img remove-click ng-click="$ctrl.qPopup(4)" src="./images/lowdresser.png" class="dresser">
        <img ng-click="$ctrl.try()" src="./images/rug.png" class="rug">
      </div>
      <div></div>
      <div>
        <img remove-click ng-click="$ctrl.qPopup(2)" src="./images/chairpillow.png" class="chair">
      </div>

      <div> {{ $ctrl.countDown }}</div>
    
      <div id="myProgress"><div class="timertext">
        <p>H</p>
        <p>U</p>
        <p>R</p>
        <p>R</p>
        <p>Y</p>
        <br></br>
        <p>U</p>
        <p>P</p>
        <p>!</p>
      </div>
  
      <div id="myBar"></div>
    </section>
    
  </section>
  `,

  controller: ["TriviaService", "$timeout", function (TriviaService, $timeout) {
    const vm = this;
    let counter = 0;

    TriviaService.getMediumQuestions().then((response) => {
      vm.questions = response;
      return response
    });

    vm.qPopup = (index) => {
      vm.show = true;
      vm.qA = vm.questions[index];
    }

    vm.try = () => {
      vm.tryAgain = true;
      $timeout (()=>{
        vm.tryAgain = false;
      }, 1000);
    }

    vm.guess = (correct) => {
      vm.show = true;
      if (!correct) {
        vm.incorrect = true;
        $timeout( () => {
          vm.incorrect = false;
        }, 1000)
        rename.play(); 
 
      } else if (correct && counter < 5) {
        counter++;
        vm.show = false;
        vm.showCorrect = true;
        $timeout( ()=>{
        vm.showCorrect = false;
        }, 1000);

      }

      if (counter === 5) {
        //redirects to winner page after 5 correct answers
        location.href = '#!/winner';
        happykids.play();
      }
    }

   function move() {
     let elem = document.getElementById("myBar");
     let height = 100;
     let id = setInterval(frame, 1200); //bigger the number the slower it moves
     function frame() {
      if (height === 0 && counter !== 5) {
        clearInterval(id);
        location.href = '#!/loser';
        sadtrombone.play(); 
      } else {
        height--;
        elem.style.height = height + '%'; 
      }
     }
      
    }

    move();
   
    function play(){
      let rename = document.getElementById("rename");
                }

    function happy(){
      let happykids = document.getElementById("happykids");
                }

    function sad () {
      let sadtrombone = document.getElementById("sadtrombone");
    }
     
  }]
  
}

angular.module("app").component("medium", medium);
