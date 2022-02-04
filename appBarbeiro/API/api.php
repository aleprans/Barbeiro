<?php
  <script>
  iqteste(1,2,3,4,5)
  function iqTest(numbers){
    for (var i = 0; i < numbers.length; i++ ){
      var rest = numbers[i]%2
      if (rest == 0){
        //var imp = [i]
        console.log(i)
      }
    }
  }
  </script>
?>