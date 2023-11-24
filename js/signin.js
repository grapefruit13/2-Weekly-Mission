import { validObject } from "./signinValid.js";

try {
  if (localStorage.getItem("signinToken")) location.href = "./folder";
} catch (e) {
  console.log(e);
}

export const formState = {
  email: {
    emailInput: document.querySelector("#username"),
    checkEmail: function (e) {
      const emailErrorText = e.target.nextElementSibling;
      const errorMsg = [
        "이메일을 입력해주세요.",
        "올바른 이메일 주소가 아닙니다.",
      ];
      if (e.target.value === "") {
        validObject.ifError(e, emailErrorText, errorMsg[0], "email");
      } else if (e.target.value.includes("@") == false) {
        validObject.ifError(e, emailErrorText, errorMsg[1], "email");
      } else {
        validObject.ifOk(e, emailErrorText, "email");
      }
    },
    isValid: false,
  },
  pw: {
    pwInput: document.querySelector("#password"),
    checkPw: function (e) {
      const pwErrorText = e.target.parentElement.lastElementChild;
      const errorMsg = "비밀번호를 입력해주세요.";
      if (e.target.value === "") {
        validObject.ifError(e, pwErrorText, errorMsg);
      } else {
        validObject.ifOk(e, pwErrorText, "pw");
      }
    },
    isValid: false,
  },
  form: document.querySelector("form"),
  login: function (e) {
    const emailErrorText = formState.email.emailInput.nextElementSibling;
    const pwErrorText = formState.pw.pwInput.parentElement.lastElementChild;
    const errorMsg = ["이메일을 확인해주세요", "비밀번호를 확인해주세요."];
    const loginMember = {
      email: formState.email.emailInput.value,
      password: formState.pw.pwInput.value,
    };
    e.preventDefault();

    async function signinFetch(loginMember) {
      try {
        const response = await fetch(
          "https://bootcamp-api.codeit.kr/api/sign-in",
          {
            method: "POST",
            body: JSON.stringify(loginMember),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();

        if (response.status == 400) {
          validObject.ifError(
            e,
            emailErrorText,
            errorMsg[0],
            formState.email.emailInput
          );
          validObject.ifError(
            e,
            pwErrorText,
            errorMsg[1],
            formState.pw.pwInput
          );
        } else if (response.status == 200) {
          localStorage.setItem("signinToken", result.data.accessToken);
          location.href = "./folder";
        }
      } catch (e) {
        console.log(e);
      }
    }
    signinFetch(loginMember);
  },
};

formState.email.emailInput.addEventListener(
  "focusout",
  formState.email.checkEmail
);
formState.pw.pwInput.addEventListener("focusout", formState.pw.checkPw);
formState.form.addEventListener("submit", formState.login);
