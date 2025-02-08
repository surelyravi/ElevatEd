import axios from 'axios';



// Bacekend String
const BACKEND = "http://localhost:8000";

const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");
const registerForm = document.getElementById("regForm");
const loginForm = document.getElementById("loginForm")

const registerUserToDB = async () => {
  const registerUserNameInput = document.getElementById("regUserName");
  const registerEmailInput = document.getElementById("regEmail");
  const registerPasswordInput = document.getElementById("regPassword");

  const data = {
    username: registerUserNameInput.value,
    email: registerEmailInput.value,
    password: registerPasswordInput.value,
  };

  console.log({ data });

  try {
    const responceData = await axios.post(`${BACKEND}/register`, data);
    console.log({resData});
    if(responceData.status === 200){
      localStorage.setItem("user" , JSON.stringify({username : data.username}));
      window.location.href = "/"
      return;
    }
  } catch (err) {
    console.log("ERROR : ", err);
  }
};

const loginUser = async () => {
  const loginUserNameInput = document.getElementById("loginUserName");
  const loginUserPassword = document.getElementById("loginPassword");

  const data = {
    username : loginUserNameInput.value,
    password : loginUserPassword.value
  }
  
  console.log({data});
  
  try{
    const responceData = await axios.post(`${BACKEND}/login` , data);
    console.log({responceData});
    if(responceData.status === 200){
      localStorage.setItem("user" , JSON.stringify({username : data.username}));
      window.location.href = "/"
      return;
    }
  }catch(err){
    console.log("Error :" , err);
  }
  
}

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await registerUserToDB();
});

loginForm.addEventListener("submit", async(event) => {
  event.preventDefault();
  await loginUser();
})

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
