{
    let date_restrict = function(){
        var today = new Date();

        var month = today.getMonth() + 1;
        var date = today.getDate();
        var year = today.getFullYear();
        
        if(month < 10){
            month = '0' + month.toString();
        }

        if(date < 10){
            date = '0' + date.toString();
        }

        var maxDate = year + '-' + month + '-' + date;

        $('#due_date').attr('min',maxDate);
    }

    date_restrict();
}