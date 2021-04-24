function checkForm(){
    let newPassword = $('#new_password').val();
    let confirmPassword = $('#confirm_new_password').val();

    if(newPassword != confirmPassword){
        alert('Passwords do not match !! \n Try Again..');

        return false;
    }

    return true;
}