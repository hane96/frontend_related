var todolist = document.querySelector("#todo-list");
var btn = document.querySelector("#add-btn");
btn.addEventListener("click", function (e) {
    e.preventDefault();
    handle_add_task();
});
var todo_input = document.querySelector("#todo-input");
todo_input.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        handle_add_task();
    }
});
function handle_add_task() {
    var new_task = todo_input.value;
    new_task = new_task.trim();
    if (new_task === "") {
        alert("輸入為空白");
        return;
    }
    add_task(new_task);
    todo_input.value = "";
}
var draggeditem;
function add_task(text) {
    var newli = document.createElement("li");
    newli.innerText = text;
    newli.setAttribute("draggable", "true"); //draggable是設定能否拖移
    todolist.append(newli);
    var delete_btn = document.createElement("button");
    delete_btn.innerText = "delete";
    delete_btn.classList.add("delete-btn");
    newli.append(delete_btn);
    newli.addEventListener("click", function (e) {
        newli.classList.toggle("done"); //toggle適合用在處理兩種狀態之間的切換
    });
    delete_btn.addEventListener("click", function (e) {
        newli.remove();
    });
    newli.addEventListener("dragstart", function (e) {
        draggeditem = newli;
    });
    newli.addEventListener("drop", function (e) {
        e.preventDefault();
        if (draggeditem != newli) {
            var temp = newli;
            var parent_1 = temp.parentNode; //insertBefore需要parent
            var rect = this.getBoundingClientRect();
            var offset = e.clientY - rect.top; //放到的位置-下面元素的最高點(y最小) 所以會介於0到元素高之間
            if (offset >= (rect.height / 2)) {
                temp = temp.nextElementSibling;
            }
            parent_1.insertBefore(draggeditem, temp);
        }
        draggeditem = null;
    });
    newli.addEventListener("dragover", function (e) {
        e.preventDefault(); // 允許放置
    });
}
