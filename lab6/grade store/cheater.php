<!DOCTYPE html>
<html>
	<head>
		<title>Grade Store</title>
		<link href="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/pResources/gradestore.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		
		<?php
		# Ex 4 : 
		# Check the existance of each parameter using the PHP function 'isset'.
		# Check the blankness of an element in $_POST by comparing it to the empty string.
		# (can also use the element itself as a Boolean test!)
		 if (isset($_POST['name']) && isset($_POST['id']) && isset($_POST['card'])  && isset($_POST['cc']) ){
		 	foreach ($_POST as $post) {
		 		if(empty($post)){
		 			errorr("You didn't fill out the form completely. ");
		 		}
		 	}
		 }
		 else{
		 	errorr("You didn't fill out the form completely. ");
		 }
		?>

		<!-- Ex 4 : --> 
		<?
			function errorr($state){
				?>
			
			<h1>Sorry</h1>
			<p><?=$state?>
				<a href="gradestore.html">Try again?</a></p>
			<?
			exit();
		}
		?>

		<?php
		if (!preg_match('/^[a-z]+([-]{1}[a-z]+){0,}[ ]?[a-z]+([-]{1}[a-z]+){0,}$/i', $_POST['name'])){
			errorr("You didn't provide a valid name.");
		}
		# Ex 5 : 
		# Check if the name is composed of alphabets, dash(-), ora single white space.
		# } elseif () { 
		?>

		<?php
		# Ex 5 : 
		# Check if the credit card number is composed of exactly 16 digits.
		# Check if the Visa card starts with 4 and MasterCard starts with 5. 
		# } elseif () {
		if(preg_match('/^4\d{15}$/', $_POST['card'])){
			if($_POST['cc']!='visa') errorr("You didn't provide a valid credit card number.");
		}
		else if(preg_match('/^5\d{15}$/', $_POST['card'])){
			errorr("You didn't provide a valid credit card number.");
		}
		else{
			errorr("You didn't provide a valid credit card number.");
		}
		?>

		<!-- Ex 5 : 
			Display the below error message : 
			<h1>Sorry</h1>
			<p>You didn't provide a valid credit card number. Try again?</p>
		--> 

		<?php
		# if all the validation and check are passed 
		# } else {
		?>

		<h1>Thanks, looser!</h1>
		<p>Your information has been recorded.</p>
		
		<!-- Ex 2: display submitted data -->
		<ul> 	
			<li>Name: <?=$_POST['name'];?></li>
			<li>ID: <?=$_POST['id'];?></li>
			<!-- use the 'processCheckbox' function to display selected courses -->
			<li>Course:  <?$courses = processCheckbox($_POST['course']); ?> <?=$courses?> </li>
			<li>Grade: <?=$_POST['grade'];?></li>
			<li>Credit <?=$_POST['card'];?> (<?=$_POST['cc'];?>)</li>
		</ul>
		
		<!-- Ex 3 : -->
			<p>Here are all the loosers who have submitted here:</p> 
		<?php
			$filename = "loosers.txt";
			$result = array($_POST['name'] , $_POST['id'] , $_POST['card'],$_POST['cc']);
			$text = implode(";",$result);
			file_put_contents($filename,$text."\n",FILE_APPEND);
			$text = file_get_contents($filename);


			/* Ex 3: 
			 * Save the submitted data to the file 'loosers.txt' in the format of : "name;id;cardnumber;cardtype".
			 * For example, "Scott Lee;20110115238;4300523877775238;visa"
			 */
		?>
		<pre><?=$text?></pre>		
		<?php
		# }
		?>
		
		<?php
			/* Ex 2: 
			 * Assume that the argument to this function is array of names for the checkboxes ("cse326", "cse107", "cse603", "cin870")
			 * 
			 * The function checks whether the checkbox is selected or not and 
			 * collects all the selected checkboxes into a single string with comma seperation.
			 * For example, "cse326, cse603, cin870"
			 */
			function processCheckbox($names){ 
				return implode(",",$names);
			}
			
		?>
		
	</body>
</html>
