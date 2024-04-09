let inputValue = document.getElementById('inputValue');
        let addBtn = document.getElementById('addBtn');
        let todoListElem = document.querySelector('.todoListElem');

        const getTodoListItem = () => {
            return JSON.parse(localStorage.getItem('TodoList2'));
        }

        const addTodoToLocalStorage = () => {
            return localStorage.setItem('TodoList2', JSON.stringify(localTodoList));
        }
 
        let localTodoList = getTodoListItem() || [];


        const addTodoListDynamically = (curElem) => {
            const divElem = document.createElement('div');
            divElem.classList.add('main_todo_list');
            divElem.innerHTML = `<li>${curElem}</li><button class="deleteBtn">Delete</button>`;
            todoListElem.append(divElem);
        }

        function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
        }


        const addTodoList = (e) => {
            e.preventDefault();
            
            let todoListItem = capitalizeFirstLetter(inputValue.value).trim();

            if(todoListItem !== "" && !localTodoList.includes(todoListItem)) {

                localTodoList.push(todoListItem);
                localTodoList = [... new Set(localTodoList)];
                console.log(localTodoList);

                localStorage.setItem('TodoList2', JSON.stringify(localTodoList));

                addTodoListDynamically(todoListItem);

            }


            // adding items to list dynamically
            

            inputValue.value = "";

        }

        const showTodoListItem = () => {
            console.log(localTodoList);
            localTodoList.forEach((curElem) => {
                addTodoListDynamically(curElem);
            });
        }
        showTodoListItem();


        const removeTodoListItem = (e) => {
            const removeItem = e.target;
            let todoListContent = removeItem.previousElementSibling.innerText;
            let parentElem = removeItem.parentElement;
            
            localTodoList = localTodoList.filter((curTodo) => {
                return curTodo !== todoListContent;
            })

            addTodoToLocalStorage(localTodoList);
            parentElem.remove();

        }


        todoListElem.addEventListener('click', (e) => {
            e.preventDefault();
            if(e.target.classList.contains('deleteBtn')){
                removeTodoListItem(e);
            }
        });


        addBtn.addEventListener('click', (e) => {
            addTodoList(e);
        });
