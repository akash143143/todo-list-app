let inputValue = document.getElementById('inputValues');
let addBtn = document.querySelector('.addBtn');
let todoListElem = document.querySelector('.todo-lists-elem');


const getTodoList = () => {
    return JSON.parse(localStorage.getItem('TodoList2'));
}

const addTodoLocalStorage = (localTodoList) => {
    return localStorage.setItem('TodoList2', JSON.stringify(localTodoList));
}


let localTodoList = getTodoList()  || [];

const addTodoListDynamically = (curElem) => {
    const DivElem = document.createElement('div');
    DivElem.classList.add('main_todo_list');
    DivElem.innerHTML = `<li>${curElem}</li><button class="deleteBtn">Delete</button>`;

    todoListElem.append(DivElem);
}

const addTodoList = (e) => {
    e.preventDefault();
    let todoListItem = inputValue.value.trim();

    if(todoListItem !== "" && !localTodoList.includes(todoListItem)) {

        localTodoList.push(todoListItem);
        localTodoList = [... new Set(localTodoList)];
        // console.log(localTodoList);
    
        localStorage.setItem('TodoList2', JSON.stringify(localTodoList));
        
        // add todo list dynamically
        addTodoListDynamically(todoListItem);

    }

    inputValue.value = "";

}

const showTodoList = () => {
    console.log(localTodoList);
    localTodoList.forEach((curElem) => {
        addTodoListDynamically(curElem);
    });
}

showTodoList();


const removeTodoElem = (e) => {
    const removeTodoItem = e.target;
    let todoListContent = removeTodoItem.previousElementSibling.innerText;
    let parentElem = removeTodoItem.parentElement;
    
    localTodoList = localTodoList.filter((curTodo) => {
        return curTodo !== todoListContent;
    });

    addTodoLocalStorage(localTodoList);
    parentElem.remove();

}


todoListElem.addEventListener('click', (e) => {
    e.preventDefault();
   if(e.target.classList.contains('deleteBtn')) {
    removeTodoElem(e);
   } 
});


addBtn.addEventListener('click', (e) => {
    addTodoList(e);
});