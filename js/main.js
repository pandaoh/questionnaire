/**
 * @Name: HW_5-1.js
 * @Description: 问卷管理
 * @Author: 贺雄彪
 */

/**
 * 打印问卷主体
 * @returns {Boolean} 返回原来的页面
 */
//function print_questionnaire() {
//  if (document.querySelector('.questionnaire').innerHTML === "") {
//    alert("问卷为空！！！");
//  } else {
//    var headstr = "<html><head><title>我的问卷</title><head><body><div class='questionnaire'>";
//    var footstr = "</div></body></html>";
//    var older = document.body.innerHTML;
//    var titlestr = "<h1 style='text-align: left;margin: 10px auto;'>我的问卷</h1>";
//    var newstr = document.querySelector('.questionnaire').innerHTML;
//    var brstr = "<br /><br /><br />";
//    document.body.innerHTML = headstr + brstr + titlestr + newstr + brstr + footstr;
//    window.print();
//    document.body.innerHTML = older;
//    clearDisp();
//    return false;
//  }
//}



/**
 * 类型选择处理
 */
function selectType() {
  var choosetype = document.querySelector('#ques-type').value; //获取选中的类型
  switch (choosetype) {
    case 'password':
      clearDisp();
      break;
    case 'number':
      clearDisp();
      document.querySelector('#number-disp').style.display = 'block';
      break;
    case 'textarea':
      clearDisp();
      document.querySelector('#question-content').style.display = 'none';
      document.querySelector('.textarea-class').style.display = 'block';
      break;
    case 'radio':
      clearDisp();
      document.querySelector('#radio-disp').style.display = 'block';
      var rClass = document.querySelectorAll("[class='demo-right']");
      for (var i = 0, j = rClass.length; i < j; i++) {
        rClass[i].type = 'radio';
      }
      break;
    case 'checkbox':
      clearDisp();
      document.querySelector('#radio-disp').style.display = 'block';
      var cClass = document.querySelectorAll("[class='demo-right']");
      for (var i = 0, j = cClass.length; i < j; i++) {
        cClass[i].type = 'checkbox';
      }
      break;
    default:
      clearDisp();
  }
}



/**
 * 清除main里面内容显示
 */
function clearDisp() {
  document.querySelector('#number-disp').style.display = 'none';
  document.querySelector('.textarea-class').style.display = 'none';
  document.querySelector('#radio-disp').style.display = 'none';
  document.querySelector('#question-content').style.display = 'block';
  clearAddinput();
  clearQuestion();
}



/**
 * 清除产生的选项
 */
function clearAddinput() {
  var child = document.querySelectorAll('.new-ques');
  for (var i = 0, j = child.length; i < j; i++) {
    child[i].parentNode.removeChild(child[i]);
  }
}



/**
 * 篮球双击方法-清空问卷内容
 */
function clearQuestionnaire() {
  document.querySelector(".questionnaire").innerHTML = "";
}



/**
 * 清空问题
 */
function clearQuestion() {
  var textareaQues = document.querySelector('.textarea-class');
  textareaQues.value = "";
  var inputNum = document.querySelectorAll('main input'); //切换时清空main里面的所有input
  for (var i = 0, j = inputNum.length; i < j; i++) {
    inputNum[i].value = "";
  }
}



/**
 * 新增问题
 */
var nameY = 0; //全局变量
function addQuestion() {
  var allQuestion = document.querySelectorAll('.question-div');
  if (allQuestion.length > 119) {
    alert('谁家问卷超过120题的？？？');
    return;
  } else if (allQuestion.length === 0) {
    nameY = 0;
  }
  var choosetype = document.querySelector('#ques-type').value; //获取选择类型
  var questionText = strNohtml(document.querySelector('#question-content').value); //获取问题内容
  var textareaText = strNohtml(document.querySelector('.textarea-class').value); //获取文本块问题内容
  var sup = "<sup style='color:red;'> *</sup>";
  var nosup = "<sup>&nbsp;</sup>";
  var newDiv = document.createElement('div'); //创建div
  newDiv.className = "question-div";
  /* 必选题与非必选题的处理 */
  var newLabel = document.createElement("label");
  newLabel.style.color = "black";
  newLabel.innerHTML = (choosetype === "textarea") ? textareaText : questionText;
  newLabel.innerHTML += (document.querySelector('#must-choose').checked === true) ? sup : nosup;
  newDiv.appendChild(newLabel);
  var newBr = document.createElement("br");
  newDiv.appendChild(newBr);
  var createDiv = document.querySelector('.questionnaire').appendChild(newDiv);
  /* 文字块单独处理 */
  if (choosetype === 'textarea') {
    if (textareaText === "") {                                                  //问题为空的处理
      newDiv.remove();
      document.querySelector('.textarea-class').classList.add("warning-input");
      setTimeout(function () {
        document.querySelector('.textarea-class').classList.remove("warning-input");
      }, 500);
      console.log("请输入问题！");
    }
    if (textareaText !== "") {                                                  //问题不为空的处理
      if (textareaText.length > 45) {
        newDiv.remove();
        document.querySelector('.textarea-class').classList.add("warning-input");
        setTimeout(function () {
          document.querySelector('.textarea-class').classList.remove("warning-input");
        }, 500);
        console.log("问题不能超过45个字！");
      } else {
        newDiv.innerHTML += "<textarea cols='15' rows='5' class='input-" + choosetype + "'>" + "</textarea>";
        newDiv.innerHTML += addButton(); //添加右侧按钮
        createDiv; //添加到问卷内容DIV中
        clearQuestion();
      }
    }
  } else {
    /* 其他选项下的处理 */
    if (questionText === "") {                                                  //问题为空
      newDiv.remove();
      document.querySelector('#question-content').classList.add("warning-input");
      setTimeout(function () {
        document.querySelector('#question-content').classList.remove("warning-input");
      }, 500);
      console.log("请输入问题！");
    }
    if (questionText !== "") {                                                  //问题不为空
      if (questionText.length > 45) {
        newDiv.remove();
        document.querySelector('#question-content').classList.add("warning-input");
        setTimeout(function () {
          document.querySelector('#question-content').classList.remove("warning-input");
        }, 500);
        console.log("问题不能超过45个字！");
      } else {
        var newInput = document.createElement("input");
        newInput.className = "input-" + choosetype;
        newInput.setAttribute("type", choosetype);
        if (choosetype === 'password' || choosetype === 'text') {
          /* 密码框与文本框处理 */
          newDiv.appendChild(newInput);
          newDiv.innerHTML += addButton();
          createDiv;
          clearQuestion();
        } else if (choosetype === 'number') {
          /* 数字框处理 */
          var maxNum = document.querySelector('#max-val');
          var minNum = document.querySelector('#min-val');
          var maxVal = document.querySelector("input[name='max-value']").value;
          var minVal = document.querySelector("input[name='min-value']").value;
          if (maxNum.checked && !minNum.checked || !maxNum.checked && minNum.checked || maxNum.checked && minNum.checked) {
            if (maxNum.checked && minNum.checked && maxVal === "" && maxVal === "") {
              newDiv.remove();
              document.querySelector("input[name='max-value']").classList.add("warning-input");
              document.querySelector("input[name='min-value']").classList.add("warning-input");
              setTimeout(function () {
                document.querySelector("input[name='max-value']").classList.remove("warning-input");
                document.querySelector("input[name='min-value']").classList.remove("warning-input");
              }, 500);
              console.log("请输入数值！");
              return;
            } else if (maxNum.checked && maxVal === "") {
              newDiv.remove();
              document.querySelector("input[name='max-value']").classList.add("warning-input");
              setTimeout(function () {
                document.querySelector("input[name='max-value']").classList.remove("warning-input");
              }, 500);
              console.log("请输入最大值！");
              return;
            } else if (minNum.checked && minVal === "") {
              newDiv.remove();
              document.querySelector("input[name='min-value']").classList.add("warning-input");
              setTimeout(function () {
                document.querySelector("input[name='min-value']").classList.remove("warning-input");
              }, 500);
              console.log("请输入最小值！");
              return;
            } else if (maxNum.checked && minNum.checked && parseInt(minVal) > parseInt(maxVal)) {
              newDiv.remove();
              alert('最大值不能小于最小值！');
              return;
            } else {
              if (maxNum.checked && maxVal !== "") {
                newInput.setAttribute("max", maxVal);
              }
              if (minNum.checked && minVal !== "") {
                newInput.setAttribute("min", minVal);
              }
            }
          }
          newDiv.appendChild(newInput);
          newDiv.innerHTML += addButton();
          createDiv;
          clearQuestion();
        } else if (choosetype === 'radio' || choosetype === 'checkbox') {
          /* 单选框与多选框处理 */
          var allInput = document.querySelectorAll("input[name = 'ques-cho']");
          if (allInput.length > 30) {
            newDiv.remove();
            alert('选项不能超过30项！');
          } else {
            var subDiv = document.createElement('div');
            subDiv.className = "flex-select";
            for (var i = 0, j = allInput.length; i < j; i++) {
              var moreInput = document.createElement("input");
              moreInput.className = "input-" + choosetype;
              moreInput.setAttribute("type", choosetype);
              if (allInput[i].value === "") {
                newDiv.remove();
                alert('选项内容不能为空！');
                return;
              } else if (allInput[i].value.length > 10) {
                newDiv.remove();
                alert('选项内容长度不得超过10个字符！');
                return;
              } else {
                var moreLabel = document.createElement("label");
                moreLabel.className = "label-" + choosetype;
                if (allInput[i].previousElementSibling.checked === true) {
                  moreInput.setAttribute("checked", "checked");
                }
                moreInput.setAttribute("name", choosetype + nameY);
                moreLabel.appendChild(moreInput);
                moreLabel.innerHTML += allInput[i].value;
                subDiv.appendChild(moreLabel);
              }
            }
            nameY++;
            newDiv.innerHTML += addButton();
            newDiv.appendChild(subDiv);
            createDiv;
            clearAddinput();
            clearQuestion();
          }
        }
      }
    }
  }
}



/**
 * 添加问题右侧按钮
 * @returns {String|newDiv.innerHTML|.document@call;createElement.innerHTML} 添加的右侧按钮
 */
function addButton() {
  var newDiv = document.createElement('div');
  var divBeg = "<div class='disp-btn' style='float: right;display: none;flex-direction: row;'>";
  var upBtn = "<input type='button' name='upbtn' onclick='upBtn(this);' value='▲上移'>";
  var downBtn = "<input type='button' name='downbtn' onclick='downBtn(this);' value='▼下移'>";
  var delBtn = "<input type='button' name='delbtn' onclick='delBtn(this);' value='X删除'>";
  var divEnd = "</div>";
  newDiv.innerHTML = divBeg + upBtn + downBtn + delBtn + divEnd;
  return newDiv.innerHTML;
}



/**
 * 上移按钮功能
 * @param {Element} 当前元素
 */
function upBtn(up) {
  var nowNode = up.parentNode.parentNode;
  var parNode = document.querySelector(".questionnaire");
  if (nowNode === parNode.firstElementChild) {
    alert("已经到顶啦！");
  } else {
    nowNode.parentNode.insertBefore(nowNode, nowNode.previousElementSibling);
  }
}



/**
 * 下移按钮功能
 * @param {Element} 当前元素
 */
function downBtn(down) {
  var nowNode = down.parentNode.parentNode;
  var parNode = document.querySelector(".questionnaire");
  if (nowNode === parNode.lastElementChild) {
    alert("已经到底啦！");
  } else {
    nowNode.parentNode.insertBefore(nowNode, nowNode.nextElementSibling.nextElementSibling);
  }
}



/**
 * 删除按钮功能
 * @param {Element} 当前要删除的元素位置
 */
function delBtn(elementNow) {
  var elementDel = elementNow.parentNode.parentNode;
  elementDel.parentNode.removeChild(elementDel);
}



/**
 * 单击新增
 */
function addRight() {
  var newNode = document.querySelector("#radio-disp table tbody");
  var oldNode = document.querySelector("input[class='demo-right']");
  var input_type = (oldNode.type === "radio") ? "radio" : "checkbox";
  var newTr = document.createElement('tr');
  newTr.className = "new-ques";
  var inputType = "<th> </th><td><input type='" + input_type + "' name='radiodemo' class='demo-right'>";
  var inputEnd = "<input style='margin-left: 4px;' ondblclick='delBtn(this);' type='text' name='ques-cho' placeholder='请输入选项名称（双击删除 or 点击 X 按钮）'>";
  var inputBtn = "<input style='display: none;color: #990036' class='input-delbtn' type='button' value='X删除' onclick='delBtn(this);'></td>";
  var newInput = inputType + inputEnd + inputBtn;
  newTr.innerHTML = newInput;
  var quesNum = document.querySelectorAll("input[class='demo-right']");
  if (quesNum.length > 30) {
    alert("选项不能超过30个！");
  } else {
    newNode.insertBefore(newTr, newNode.lastChild.previousSibling);
  }
}



/**
 * 键盘事件
 * @param {Event} 当前按下的按键。
 */
function addKeyboard(e) {
  var keyNum = window.event ? e.keyCode : e.which;
  if (keyNum === 113) {
    addQuestion();
  }
  if (keyNum === 67 && e.altKey) {
    clearQuestionnaire();
  }
  if (keyNum === 80 && e.altKey) {
    addContent();
  }
}



/**
 * 处理问题字符串
 * @param {String} 要处理的字符串。
 */
function strNohtml(str) {
  str = str.replace(/^\s+|\s+$/g, ""); //去掉前后空格
  //str = str.replace(/\s+/g,""); //去掉空格
  //str=str.replace( /^\s/, '');//去掉左空格
  //str=str.replace(/(\s$)/g, "");//去掉右空格
  var div = document.createElement('div');
  div.textContent = str; //利用textContent属性转化"<",">","&","'"等字符 
  var formatString = div.innerHTML;
  return formatString;
}


/**
 * 存储问卷内容
 */
function addContent() {
  var questionnaire = document.querySelector('.questionnaire').innerHTML;
  if (questionnaire === "") {
    alert("问卷为空！！！");
  } else {
    if (typeof (localStorage) !== "undefined") {
      window.localStorage.clear();
      window.localStorage.setItem("content", questionnaire);
      window.open("./questionnaire.html", "target");
    } else {
      alert("此浏览器不支持 Web Storage");
    }
  }
}



/**
 * 获取问卷内容
 */
var valueY = 0;
function getContent() {
  if (window.localStorage["content"]) {
    var questionnaire = document.querySelector('.questionnaire');
    questionnaire.innerHTML = "";
    questionnaire.innerHTML = window.localStorage.content;
    var btn = document.querySelectorAll(".disp-btn");
    for (var i = 0; i < btn.length; i++) {
      btn[i].remove();
    }
    var sups = document.querySelectorAll("sup[style='color:red;']");
    var labels = document.querySelectorAll("label[style='color: black;']");
    Array.prototype.filter.call(labels, function (label) {
      var names = label.nextElementSibling.nextElementSibling;
      if (names.className !== "flex-select") {
        names.setAttribute("name", "value" + valueY);
        valueY++;
      }
    });
    Array.prototype.filter.call(sups, function (sup) {
      var required = sup.parentElement.nextElementSibling.nextElementSibling;
      if (required.className !== "flex-select") {
        required.setAttribute("required", "required");
      } else {
        required.firstElementChild.firstElementChild.setAttribute("required", "required");
      }
    });
  }
}