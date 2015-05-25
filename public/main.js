var app = angular.module('triviaApp', [])

.factory('Questions', function($http) {
  var getQuestions = function() {
    return $http({
      method: 'GET',
      url: '/questions'
    });
  };

  var getQuestion = function() {
    return $http({
      method: 'GET',
      url: '/question'
    }).then(function(resp) {
      return resp;
    });
  };

  return {
    getQuestions: getQuestions,
    getQuestion: getQuestion
  };
})
.controller('TriviaController', function($scope, $http, Questions) {
  $scope.username;
  $scope.round = 0;
  $scope.score = 0;
  $scope.currentQuestion;
  $scope.guess;

  $scope.startGame = function() {
    $scope.nextQuestion();
    $scope.game = true;
  };

  $scope.nextQuestion = function() {
    Questions.getQuestion()
    .then(function(question) {
      $scope.currentQuestion = $scope.parseQuestion(question.data);
    });
  };

  $scope.parseQuestion = function(question) {
    return {
      question: question.q_text,
      choices: [question.q_options_1, question.q_options_2, question.q_options_3, question.q_options_4],
      answer: +question.q_correct_option - 1 // choices is not zero indexed
    };
  };

  $scope.checkAnswer = function(choice) {
    $scope.guess = choice;
    var answer = $scope.currentQuestion.choices[$scope.currentQuestion.answer];
    if( $scope.guess === answer ) {
      $scope.score++;
    }
    $scope.round++;
    if( $scope.round < 10 ) {
      $scope.nextQuestion();
    } else {
      $scope.gameOver = true;
    }
  };

});
