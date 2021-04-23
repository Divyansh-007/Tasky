{
    let createTask = () => {
        let newTaskForm = $('#new_task');

        newTaskForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                method: 'post',
                url: '/task/createTask',
                data: newTaskForm.serialize(),
                success: function(data){
                    // console.log(data);
                    let newTask = newTaskDom(data.data.task);
                    $('.display').prepend(newTask);

                    new Noty({
                        theme: 'relax',
                        text: "Task Created!!",
                        type: 'success',
                        layout: 'topcenter',
                        timeout: 1500
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    const month_list = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    let changeDateFormat = (date) => {
        return month_list[parseInt(date.substring(6,7)) - 1] + " " + date.substring(8,10) + " , " + date.substring(0,4)
    }

    let newTaskDom = (task) => {
        return(`<div class="task_item">
                    <div class="item_info">
                        <a class="check_mark" href="/task/complete-task/${task._id}"><i class="far fa-check-square"></i></a>
                        <div class="item_descp">
                            <p style="font-size: 1.5rem;">${task.description}</p>
                            <p style="font-size: 1.25rem;">
                                <span><i class="far fa-calendar-alt"></i></span>
                                ${changeDateFormat(task.date)}
                            </p>
                        </div>
                    </div>
                    <div class="item_ctg ${task.category}">
                        <p>${task.category}</p>
                    </div>
                </div>`);
    }

    createTask();
}