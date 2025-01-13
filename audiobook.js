const app = angular.module('audiobookApp', []);

app.controller('AudiobookController', ['$scope', '$http', function ($scope, $http) {
    $scope.selectedTab = 'KO';
    $scope.currentPage = 1;
    $scope.itemsPerPage = 20;

    $http.get('audio_items.json').then(function (response) {
        if (Array.isArray(response.data)) {
            $scope.items = response.data.filter(item => item.audio.en || item.audio.ko || item.audio.pt);
            console.log("Loaded items:", $scope.items);
            $scope.totalPages = Math.ceil($scope.items.length / $scope.itemsPerPage);
        } else {
            console.error("O formato do arquivo JSON não está correto");
        }
    }).catch(function (error) {
        console.error("Error loading JSON:", error);
    });

    $scope.playAudio = function (audioSrc) {
        if (!audioSrc) {
            console.error("Audio source is undefined.");
            return;
        }

        const audio = new Audio(audioSrc);
        audio.play().catch(error => {
            console.error("Error during audio playback:", error);
        });
    };

    $scope.markActiveButton = function (event) {
        const buttons = event.target.parentNode.querySelectorAll('.audio-btn');
        buttons.forEach(button => button.classList.remove('active'));
        event.target.classList.add('active');
    };

    $scope.hasAudio = function (item) {
        return item.audio.en || item.audio.ko || item.audio.pt;
    };

    // Função para rolar até o topo
    $scope.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Mostrar botão flutuante de volta ao topo
    window.addEventListener('scroll', function () {
        const scrollTopButton = document.getElementById('back-to-top');
        if (document.documentElement.scrollTop > window.innerHeight * 0.25) {
            scrollTopButton.classList.add('show');
        } else {
            scrollTopButton.classList.remove('show');
        }
    });
}]);