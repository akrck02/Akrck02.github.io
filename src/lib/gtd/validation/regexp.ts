export function validate_email(email : string, func : Function) : boolean {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!regex.test(email)){
        func();
        return false;
    } 
    return true;
} 
