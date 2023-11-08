// "add-todo"というIDを持つ要素にクリックイベントリスナーを追加
document
  .getElementById("add-todo")
  .addEventListener("click", () => clickAddTodoButton());

// 追加ボタンがクリックされたときに実行される関数
const clickAddTodoButton = () => {
  // 入力されたテキストを取得
  const inputText = document.getElementById("input-todo").value.trim();
  // テキストが空でない場合の処理
  if (inputText) {
    // 入力フィールドを空にする
    document.getElementById("input-todo").value = "";
    // TODOリスト項目を追加
    const todo = addTodo(inputText);
    // "todo-list"というIDを持つ要素にリストアイテムを追加
    document.getElementById("todo-list").appendChild(todo);
  } else {
    // テキストが空の場合、アラートを表示
    alert("TODOを入力してください");
  }
};

// 新しいTODOリスト項目を作成する関数
const addTodo = (text) => {
    //リストのItemになるliタブ要素を作成
    const listItem = document.createElement("li")
    //内部を横並びにするためのflexbox用のdivタグ要素を作成
    const flexBox = document.createElement("div")
    flexBox.id = "flexbox" //IDを付与
    // textを表示するaタグ要素を作成
    const listText = document.createElement("a");
    listText.id = "todoText"; //idを付与
    listText.innerText = text; //aタグ内に引数で受け取ったtextを挿入
    flexBox.appendChild(listText) //flexBoxの子要素に追加

    //複数のボタンをラップするコンテナ用のdivを作成
    const buttonContainer = document.createElement("div")
    buttonContainer.id = "button-container"
    // 削除ボタンを作成
    const deleteButton = createDeleteButton(listItem);
    // 完了ボタンを作成
    const completeButton = createCompleteButton(listItem);
     // 編集ボタンを作成
    const editButton = createEditButton(listItem);
    //ボタンを一纏めに配列化
    const handleTodoButtons = [deleteButton,editButton,completeButton]
    //ボタンコンテナ配下に追加していく
    handleTodoButtons.map((item)=>{
        buttonContainer.appendChild(item)
    })
    //以下の処理と同義
    // buttonContainer.appendChild(deleteButton);  
    // buttonContainer.appendChild(completeButton);
    // buttonContainer.appendChild(editButton)
    
    //flexBoxの子要素に追加
    flexBox.appendChild(buttonContainer)
    //liタグの子要素に追加
    listItem.appendChild(flexBox)
    // 完成したリストアイテムを返す
    return listItem;
};

// 削除ボタンを作成し、機能を追加する関数
const createDeleteButton = (listItem) => {
    // ボタン要素を作成
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除"; //ボタンのテキスト
    deleteButton.id="delete-button" //IDを付与
    // 削除ボタンにクリックイベントリスナーを追加
    deleteButton.addEventListener("click", () => {
    // リスト項目を削除
    listItem.remove();
    });
    //作成したボタンを返す
    return deleteButton;
};

const createEditButton = (listItem) => {
    //ボタン要素を作成
    const editButton = document.createElement("button");    
    editButton.textContent = "編集" //ボタンのテキスト
    editButton.id="edit-button" //IDを付与 
    // 編集ボタンにクリックイベントリスナーを追加
    editButton.addEventListener("click",()=>{ 
        //ボタンを押した際の処理をする関数
        actionEditButton(listItem)
    });
    return editButton;
}

//編集ボタンを押した際の処理
const actionEditButton = (listItem) => {
    //受け取った引数のリスト内Todoのテキストを取得する
    const textAnchor = listItem.querySelector('#todoText');
    //ボタン群が入ったコンテナ要素も取得する
    const buttonContainer = listItem.querySelector('#button-container')
    //代わりに配置する保存ボタンを作成する
    const saveButton = document.createElement("button");
    saveButton.textContent = "保存"
    saveButton.addEventListener("click",()=>actionSaveButton())
    // 新しいinput要素を作成
    const input = document.createElement("input");
    input.type = "text";
    input.value = textAnchor.textContent;; //先ほど取得したtodoテキストをinputに入れる

    // listItemの内容をinput要素に置き換え
    listItem.querySelector('#flexbox').replaceChild(input, textAnchor);
    //listItem内のボタンをsaveButtonに置き換え
    listItem.querySelector('#flexbox').replaceChild(saveButton, buttonContainer)

    // 保存ボタンを押したときの処理関数
    const actionSaveButton = () =>{
        const newInputText = input.value.trim();
        if (newInputText) { 
            textAnchor.textContent = newInputText
            listItem.querySelector('#flexbox').replaceChild(textAnchor, input);
            listItem.querySelector('#flexbox').replaceChild(buttonContainer , saveButton)
        } else {
            // テキストが空の場合、アラートを表示
            alert("TODOを入力してください");
        }
    }
    // input要素にフォーカスを当てる
    input.focus();
    // input要素外でのクリック（またはEnterキー押下）を検出して編集を完了
    input.addEventListener('blur', () => actionSaveButton());
    // Enterキーを検出して編集を完了
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            actionSaveButton(); 
        }
    });
}

// 完了ボタンを作成し、機能を追加する関数
const createCompleteButton = (listItem) => {
    // ボタン要素を作成
    const completeButton = document.createElement("button");
    completeButton.textContent = "完了";
    completeButton.id="complete-button" //IDを付与 
    // 完了ボタンにクリックイベントリスナーを追加
    completeButton.addEventListener("click", () => {
        // 完了アクションを実行
        actionCompleteButton(listItem);
    });
    return completeButton;
};

// 完了ボタンのアクションを実行する関数
const actionCompleteButton = (listItem) => {
    // 不要なボタンを削除
    listItem.querySelector("#complete-button").remove();
    listItem.querySelector("#edit-button").remove()
    // リスト項目を削除
    listItem.remove();
    // 戻すボタンを作成
    const restoreButton = document.createElement('button')
    restoreButton.id = "restore-button"
    restoreButton.textContent = "戻す"
    restoreButton.addEventListener("click",()=>{
        actionRestoreButton(listItem)
    })
    // "complete-list"というIDを持つ要素にリスト項目を追加
    document.getElementById("complete-list").appendChild(listItem);
    //ボタンコンテナの中に戻すボタンを追加
    listItem.querySelector("#button-container").appendChild(restoreButton)
};

//　戻すボタンのアクションを実行する関数
const actionRestoreButton = (listItem) => {
    listItem.remove();
    const restoreText = listItem.querySelector('#todoText').textContent
    document.getElementById("todo-list").appendChild(addTodo(restoreText));
 }