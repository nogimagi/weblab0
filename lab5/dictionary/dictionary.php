<!DOCTYPE html>
<html>
<head>
    <title>Dictionary</title>
    <meta charset="utf-8" />
    <link href="dictionary.css" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="header">
    <h1>My Dictionary</h1>
<!-- Ex. 1: File of Dictionary -->
    <p>
        <? $filename = "dictionary.tsv"; 
        $lines = file($filename);?> 
        My dictionary has <?=sizeof($lines)?> total words
        and
        size of <?=filesize($filename)?> bytes.
    </p>
</div>
<div class="article">
    <div class="section">
        <h2>Today's words</h2>
<!-- Ex. 2: Today’s Words & Ex 6: Query Parameters -->
        <ol>
        <?php
         $numberOfWords=3;
            if(isset($_GET['number_of_words'])){
                $numberOfWords = $_GET['number_of_words'];
            }
            
            $todaysWords = getWordsByNumber($lines,$numberOfWords);
            foreach ($todaysWords as  $value) {
                $tmp = preg_split("/[\t]/", $lines[$value]);?>
                <li><?=$tmp[0]?> - <?=$tmp[1]?></li> <?
            }

            function getWordsByNumber($listOfWords, $numberOfWords){
                return array_rand($listOfWords, $numberOfWords);
            }
        ?>
        </ol>
    </div>
    <div class="section">
        <h2>Searching Words</h2>
<!-- Ex. 3: Searching Words & Ex 6: Query Parameters -->
        <?php
            $startCharacter='C';
            if (isset($_GET['character'])) {
                $startCharacter=$_GET['character'];
            }
            $searchedWords=getWordsByCharacter($lines,$startCharacter);
            function getWordsByCharacter($listOfWords, $startCharacter){
                $resultArray = array();
                foreach ($listOfWords as $key => $value) {
                    if($value[0] == $startCharacter){
                        array_push($resultArray, $value);
                    }
                }
                return $resultArray;
            }
        ?>
        <p>
            Words that started by <strong>"<?=$startCharacter?>"</strong> are followings :
        </p>
        <ol>
            <?
                foreach ($searchedWords as $key => $value) {
                    $tmp = preg_split("/[\t]/", $value);
                    ?> <li> <?=$tmp[0]?> - <?=$tmp[1]?> </li><?
                }
            ?>
        </ol>
    </div>
    <div class="section">
        <h2>List of Words</h2>
<!-- Ex. 4: List of Words & Ex 6: Query Parameters -->
        <?php
            $orderby = 0;
            $ordertxt;
            if (isset($_GET['orderby'])) {
               $orderby = $_GET['orderby'];
            }
            if($orderby == 0){
                $ordertxt = "alphabetical order";
            }
            else{
                $ordertxt = "reverse alphabetical order";
            }
            $orderedWord = getWordsByOrder($lines,$orderby);
            function getWordsByOrder($listOfWords, $orderby){
                $resultArray = $listOfWords;
                if($orderby == 0){
                    asort($resultArray);
                }
                else{
                    arsort($resultArray);
                }
                return $resultArray;
            }
        ?>
        <p>
            All of words ordered by <strong><?=$ordertxt?></strong> are followings :
        </p>
        <ol>
            <?
                foreach ($orderedWord as $key => $value) {
                    $tmp = preg_split("/[\t]/", $value);
                    if (strlen($tmp[0]) > 6 ){
                        ?><li class= "long" > <?=$tmp[0]?> - <?=$tmp[1]?></li><?
                    }
                    else{?>
                         <li><?=$tmp[0]?> - <?=$tmp[1]?></li><?
                    }
                }
            ?>
        </ol>
    </div>
    <div class="section">
        <h2>Adding Words</h2>
<!-- Ex. 5: Adding Words & Ex 6: Query Parameters -->
        <?
            $newWord ;
            $meaning ;
            if(isset($_GET['new_word'])){
                $newWord = $_GET['new_word'];
            }
            if (isset($_GET['meaning'])) {
                $meaning = $_GET['meaning'];
            }
            if (isset($meaning) && isset($newWord)) {
                $input = $newWord."\t".$meaning;
                file_put_contents($filename,$input."\n",FILE_APPEND);
                    ?>Adding a word is success!<?
                
            }
            else{
                ?><p>Input word or meaning of the word doesn't exist.</p><?
            }
        ?>
    </div>
</div>
<div id="footer">
    <a href="http://validator.w3.org/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-html.png" alt="Valid HTML5" />
    </a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-css.png" alt="Valid CSS" />
    </a>
</div>
</body>
</html>