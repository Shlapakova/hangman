
window.addEventListener('hashchange', switchToStateFromURLHash, false);
window.addEventListener('resize', resizeGame, false);

var container = document.getElementById('container');
container.width = document.body.clientWidth;

function resizeGame() {
  container.width = document.body.clientWidth;
}

var SPAState = {};

function switchToStateFromURLHash() {
  var URLHash = window.location.hash;

  var stateStr = URLHash.substr(1);

  if (stateStr != '') { 
    var parts = stateStr.split('_')
    SPAState = { pagename: parts[0] }; 
  } else {
    SPAState = { pagename: 'Main' }; 
  }

  function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  }

  var pageHTML = '';
  switch (SPAState.pagename) {
    case 'Main':
      pageHTML += `
        <div id="mainPage">
          <div id="mainMenu" class="flex aic fdc menu">
            <button class="button" type="button" onclick="switchToMainPage()">Главная</button>
            <br>
            <button class="button" type="button" onclick="switchToOptionsPage()">Новая игра</button>
            <br>
            <button class="button" type="button" onclick="switchToRulesPage()">Правила игры</button>
            <br>
            <button class="button" type="button" onclick="switchToRecordsPage()">Рекорды</button>
            <br>
          </div>
        </div>
      `;
      include("sound.js");
      break;
    case 'Options':
      pageHTML += `
        <div id="optionsPage" class="menu">
          <form name="optionsForm">
          <div id="playersNames" class="flex aic jcsb">
            <div>
              <p>Как зовут игрока:</p>
              <input type="text" name="playerName" value="Имя" maxlength="8" id="playerName">
            </div> 
          </div>
          </form>
          <br>
          <button class="button" id="gameStart" type="button" onclick="switchToGamePage()">Начать игру</button>
        </div>
      `
      ;
      break;
    case 'Game':
      pageHTML += `
      <div id="board"></div>
      <div id="hangman">
      <img src="img/s0.svg" alt="" />
  </div>
  <div id="abc"></div>
  <div style="clear:both;"></div>
  <button class="button" type="button" onclick="switchToMainPage()">Вернуться на главную</button> 
      `
      ;
      include("hangman.js");
      include("sound.js");
      break;
    case 'Rules':
      pageHTML += `
        <div class="menu" id="rulesPage">
          Угадай пословицу. <br>
          <br>
          Если такая буква есть в пословице, то она появится над соответствующими этой букве чертами — 
          столько раз, сколько она встречается. Если такой буквы нет, 
          то к рисунку дорисовываются части так, что получается виселица. 
          Игрок продолжает отгадывать буквы до тех пор, пока не отгадает слово(выигрыш), либо пока не появится весь рисунок(проигрыш). <br>
          <br>
          <button class="button" type="button" onclick="switchToMainPage()">Вернуться на главную</button>  
        </div>
      `
      ;
      break;
    case 'Records':
      pageHTML += `
        <div id="recordsPage">
          <div class="menu" id="tableWrapper">
            <table id="records">
              <caption>Таблица рекордов</caption>
              <tr>
                <th>Место</th>
                <th>Имя игрока</th>
                <th>Уровень</th>
                <th>Время</th>
              </tr>
              <tr>
                <td>1</td>
                <td id="firstName"></td>
                <td id="firstLevel"></td>
                <td id="firstTime"></td>
              </tr>
              <tr>
                <td>2</td>
                <td id="secondName"></td>
                <td id="secondLevel"></td>
                <td id="secondTime"></td>
              </tr>
              <tr>
                <td>3</td>
                <td id="thirdName"></td>
                <td id="thirdLevel"></td>
                <td id="thirdTime"></td>
              </tr>
              <tr>
                <td>4</td>
                <td id="fourthName"></td>
                <td id="fourthLevel"></td>
                <td id="fourthTime"></td>
              </tr>
              <tr>
                <td>5</td>
                <td id="fifthName"></td>
                <td id="fifthLevel"></td>
                <td id="fifthTime"></td>
              </tr>
            </table><br>
            <button class="button" type="button" onclick="switchToMainPage()">Вернуться на главную</button> 
          </div>
        </div>
      `
      ;
      break;
  }
  document.getElementById('IPage').innerHTML = pageHTML;
}

switchToStateFromURLHash();

function switchToState(newState) {
  var stateStr = newState.pagename;
  location.hash = stateStr;
}
function switchToMainPage() {
  switchToState( { pagename:'Main' } );
}
function switchToOptionsPage() {
  switchToState( { pagename:'Options' } );
}
function switchToGamePage() {
  switchToState( { pagename:'Game' } );
}
function switchToRulesPage() {
  switchToState( { pagename:'Rules' } );
}
function switchToRecordsPage() {
  switchToState( { pagename:'Records' } );
}
