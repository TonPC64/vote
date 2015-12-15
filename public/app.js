angular.module('voteApp', [])
  .controller('voteCtrl', function ($http, $scope) {
    $scope.test = 'testANGULAR'
    $scope.red = 0
    $scope.green = 0

    var socket = io()

    var pieData = [
      {
        value: $scope.red,
        color: '#F7464A',
        highlight: '#FF5A5E',
        label: 'NO'
      },
      {
        value: $scope.green,
        color: '#46BFBD',
        highlight: '#5AD3D1',
        label: 'YES'
      }
    ]

    var ctx = document.getElementById('chart-area').getContext('2d')
    var myPie = new Chart(ctx).Pie(pieData)

    socket.on('chat message', function (obj) {
      $('#red').text(obj.red)
      $scope.red = obj.red
      $scope.green = obj.blue

      $('#blue').text(obj.blue)

      pieData = [
        {
          value: $scope.red,
          color: '#F7464A',
          highlight: '#FF5A5E',
          label: 'NO'
        },
        {
          value: $scope.green,
          color: '#46BFBD',
          highlight: '#5AD3D1',
          label: 'YES'
        }
      ]
      /*
            myPie.pieData[0].value = $scope.red
            myPie.update()*/

      myPie = new Chart(ctx).Pie(pieData)
    })

    $scope.btnClick = function (color) {
      socket.emit('chat message', color)

      $('#red').removeClass('active')
      $('#blue').removeClass('active')

      $('#' + color).addClass('active')
    }
  })
