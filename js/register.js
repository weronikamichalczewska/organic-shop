const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

const checkInputs = () => {
    // get the values from the inputs
   const emailValue = email.value.trim();
   const passwordValue = password.value.trim();
   const password2Value = password2.value.trim(); //.trim delete whitespace

   if(emailValue === ''){
       // show error
       // add error class
       setErrorFor(email, 'Email cannot be black');
   } else if(!isEmail(emailValue)){
       setErrorFor(email, 'Email is not valid');
   } else{
       setSuccessFor(email);
   }

   if(passwordValue === ''){
        setErrorFor(password, 'Password cannot be black');
   } else if(!checkPassword(passwordValue)){
        setErrorFor(password, 'Password must be between 7 to 16 characters which contain only characters, numeric digits and underscore and first character must be a letter.')
   } else{
        setSuccessFor(password);
   }

   if(password2Value === ''){
        setErrorFor(password2, 'Password cannot be black');
    } else if(passwordValue !== password2Value){
        setErrorFor(password2, 'Passwords does not match');
    } else if(!checkPassword(passwordValue)){
        setErrorFor(password2, '');
    }
    else{
        setSuccessFor(password2);
    }
}

const setErrorFor= (input, message) => {
    const formControl = input.parentElement; // .form-control
    const small = formControl.querySelector('small');

    // add error message inside small
    small.innerText = message;

    // add error class
    formControl.className = 'form-control error';
}

const setSuccessFor = input => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

const isEmail = email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);


const checkPassword = password => /^[A-Za-z]\w{7,14}$/.test(password);
