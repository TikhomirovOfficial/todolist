let Todo;
let progressArray = [];
let completedArray = [];
function checkTodo() {
    if(Cookies.get('todo')) {
        Todo = Cookies.getJSON('todo')
        progressArray = Todo.progress
        completedArray = Todo.completed
        fillTodo(progressArray, completedArray)
    }
    else {
        Cookies.set('todo', {
            progress: [],
            completed: []
        })
        $('.inProcess-do').html(`<img width="270" src="nottask.png" alt="" class="notaskPict">`)
    }
}
checkTodo()
function fillTodo(itemsProgress, itemsComplete) {
    console.log(Todo)
    let Completed = $('.todo-list-completed')
   fillProgress(itemsProgress)
    if(itemsComplete.length > 0) {
        Completed.html(``)
        $('.completed-do').css({'display':'block'})
        itemsComplete.forEach((item, index) => {
            console.log(item)
            Completed.append(createTodoCompleted(item, index))
        })
    }
}
function animateComplete(index) {
    $($('.btn-complete')[index]).html(`
    <i class="bi bi-check-lg checkedDo"></i>
    `)
    $($('.todo-process')[index]).css({
    '-webkit-animation': 'slide-out-bck-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        'animation': 'slide-out-bck-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
    })
}
function fillProgress(itemsProgress) {
    if(itemsProgress.length > 0) {
        $('.inProcess-do').html(`
            <div class="title-do-type">
                            In progress
            </div>
            <div class="todo-list-process">
            </div>
        `)
        let inProcess = $('.todo-list-process')
        itemsProgress.forEach((item, index) => {
            inProcess.append(createTodoProgress(item, index))

        })
    } else {
        $('.inProcess-do').html(`<img width="270" src="nottask.png" alt="" class="notaskPict">`)
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function completeTask(index) {

    animateComplete(index)
    completedArray.push(progressArray[index])
    progressArray.splice(index, 1)
    updateCookies()
    await sleep(500)
    fillTodo(progressArray, completedArray)


}
function createTodoProgress(item, index) {
    console.log('sas')
    return `
     <div class="todo-item todo-process">
        <div class="sub-wrap">
            <div class="index-todo">
                ${index + 1}.
            </div>
            <div class="todo-text">
               ${item.taskText}
            </div>
        </div>
        <div class="btn-complete" onclick="completeTask(${index})">
           
        </div>
    </div>
    `
}
function createTodoCompleted(item, index) {
    return `
     <div class="todo-item todo-completed">
        <div class="sub-wrap">
            <div class="index-todo">
               ${index + 1}.
            </div>
            <div class="todo-text">
                 ${item.taskText}
            </div>
        </div>
          
    </div>
`
}
function updateCookies() {
    Cookies.set('todo', {
        progress: progressArray,
        completed: completedArray
    })
}
function addTodo() {
    textTask = $('.task-input').val()
    if(textTask.length > 0) {
        progressArray.push({taskText: textTask})
    }
    updateCookies()
    $('.task-input').val('')
}
$('.btn-new_mob').click(function () {
    addTodoMobile()
    fillProgress(progressArray)
})
function addTodoMobile() {
    textTask = $('.new-task-mobile > input').val()
    if(textTask.length > 0) {
        progressArray.push({taskText: textTask})
    }
    updateCookies()
    $('.new-task-mobile > input').val('')
    $('.new-task-mobile').css({
        'bottom':'-81px'
    })
}
$('.btn-new').click(function () {
    addTodo()
    fillProgress(progressArray)
})
$('.btn-createTask-mobile').click(function () {
    $('.new-task-mobile').css({
        'bottom':'0px'
    })
})