<?php
$x = 'Hello World!';
function helloWorld() {
  return "Hello World!";
}
if (helloWorld() == $x) {
  echo "T";
} else {
  echo "F";
}

?>