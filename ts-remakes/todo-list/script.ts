


let todolist = document.querySelector("#todo-list") as HTMLUListElement;

let btn = document.querySelector("#add-btn") as HTMLButtonElement;
btn.addEventListener("click", function(e :MouseEvent){
    e.preventDefault();
    
    handle_add_task();
})

let todo_input = document.querySelector("#todo-input") as HTMLInputElement;
todo_input.addEventListener("keydown", function(e: KeyboardEvent){
    if(e.code === "Enter"){
        handle_add_task();
    }
})

function handle_add_task(): void{
    let new_task = todo_input.value as string;
    new_task = new_task.trim();
    if (new_task === "") 
    {
        alert("輸入為空白");
        return;
    }
    add_task(new_task);
    todo_input.value = "";
}


let draggeditem : null | HTMLLIElement;

function add_task(text: string): void{
    let newli = document.createElement("li");
    newli.innerText = text;
    newli.setAttribute("draggable", "true"); //draggable是設定能否拖移
    todolist.append(newli);

    let delete_btn = document.createElement("button");
    delete_btn.innerText = "delete";
    delete_btn.classList.add("delete-btn");
    newli.append(delete_btn);

    newli.addEventListener("click", function(e){
        newli.classList.toggle("done"); //toggle適合用在處理兩種狀態之間的切換
    })
    
    delete_btn.addEventListener("click", function(e){
        newli.remove();
    })

    newli.addEventListener("dragstart", function(e: DragEvent){
        draggeditem = newli;
        
    })
    newli.addEventListener("drop", function(e: DragEvent){
        e.preventDefault();
        

        if(draggeditem != newli)
        {
            let temp = newli;
            let parent = temp.parentNode as ParentNode; //insertBefore需要parent

            let rect = this.getBoundingClientRect();
            let offset = e.clientY - rect.top; //放到的位置-下面元素的最高點(y最小) 所以會介於0到元素高之間
            if(offset >= (rect.height/2)) 
            {
                temp = temp.nextElementSibling as HTMLLIElement;
            }

            parent.insertBefore(draggeditem as HTMLLIElement, temp);
        }

        draggeditem = null;
    })
    newli.addEventListener("dragover", function(e){
        e.preventDefault(); // 允許放置
        
    });


}



