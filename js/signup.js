import { validObject } from "./signupValid.js";

try {
  if (localStorage.getItem("signupToken")) location.href = "./folder";
} catch (e) {
  console.log(e);
}

export const formState = {
  email: {
    emailInput: document.querySelector("#username"),
    checkEmail: function (e) {
      const emailErrorText = e.target.nextElementSibling;
      const errorMsg = {
        empty: "이메일을 입력해주세요.",
        used: "이미 사용 중인 이메일입니다.",
        wrong: "올바른 이메일 주소가 아닙니다.",
      };
      if (e.target.value === "") {
        validObject.ifError(e, emailErrorText, errorMsg.wrong, "email");
      } else if (e.target.value.includes("@") == false) {
        validObject.ifError(e, emailErrorText, errorMsg.wrong, "email");
      } else {
        const member = {
          email: e.target.value,
        };

        async function checkEmailFetch(member) {
          try {
            const response = await fetch(
              "https://bootcamp-api.codeit.kr/api/check-email",
              {
                method: "POST",
                body: JSON.stringify(member),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const result = await response.json();

            if ("error" in result) {
              validObject.ifError(
                e,
                emailErrorText,
                result.error.message,
                "email"
              );
            } else if ("data" in result) {
              validObject.ifOk(e, emailErrorText, "email");
            }
          } catch (e) {
            console.log(e);
          }
        }
        checkEmailFetch(member);
      }
    },
    isValid: false,
  },
  pw: {
    pwInput: document.querySelector("#password"),
    checkPw: function (e) {
      const engOnly = /^[A-Za-z]+$/;
      const pwErrorText = e.target.parentElement.lastElementChild;
      const errorMsg = [
        "비밀번호를 입력해주세요.",
        "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.",
      ];

      if (e.target.value === "") {
        validObject.ifError(e, pwErrorText, errorMsg[0], "pw");
      } else if (
        e.target.value.length < 8 ||
        isNaN(e.target.value) !== true ||
        engOnly.test(e.target.value)
      ) {
        validObject.ifError(e, pwErrorText, errorMsg[1], "pw");
      } else {
        validObject.ifOk(e, pwErrorText, "pw");
      }
    },
    isValid: false,
  },
  pwConfirmation: {
    pwConfirmationInput: document.querySelector("#password_check"),
    CheckpwConfirmation: function (e) {
      const pwConfirmationErrorText = e.target.parentElement.lastElementChild;
      const errorMsg = "비밀번호가 일치하지 않아요";
      if (formState.pw.pwInput.value !== e.target.value) {
        validObject.ifError(
          e,
          pwConfirmationErrorText,
          errorMsg,
          "pwConfirmation"
        );
      } else {
        validObject.ifOk(e, pwConfirmationErrorText, "pwConfirmation");
      }
    },
    isValid: false,
  },
  signup: function (e) {
    e.preventDefault();
    if (
      !formState.email.isValid ||
      !formState.pw.isValid ||
      !formState.pwConfirmation.isValid
    )
      return;

    const signinData = {
      email: formState.email.emailInput.value,
      password: formState.pw.pwInput.value,
    };

    async function signupFetch(signinData) {
      try {
        const response = await fetch(
          "https://bootcamp-api.codeit.kr/api/sign-up",
          {
            method: "POST",
            body: JSON.stringify(signinData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();

        if (response.status == 400) {
          formState.email.emailInput.classList.add("error");
          formState.email.emailInput.nextElementSibling.innerHTML =
            result.error.message;
        } else if (response.status == 200) {
          localStorage.setItem("signupToken", result.data.accessToken);
          location.href = "/folder";
        } else {
          console.log(`400번 200번 이외의 오류입니다.`);
        }
      } catch (e) {
        console.log(e);
      }
    }

    signupFetch(signinData);
  },
  form: document.querySelector("form"),
};

formState.email.emailInput.addEventListener(
  "focusout",
  formState.email.checkEmail
);
formState.pw.pwInput.addEventListener("focusout", formState.pw.checkPw);
formState.pwConfirmation.pwConfirmationInput?.addEventListener(
  "focusout",
  formState.pwConfirmation.CheckpwConfirmation
);
formState.form.addEventListener("submit", formState.signup);
