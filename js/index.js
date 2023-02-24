// regexes and error msgs for editable inputs
const elementRegexes = [
  {
    elementId: "fullname",
    regex: /^[a-zA-Z0-9_ ]+$/,
    error: "Invalid full name.",
  },
  {
    elementId: "nic",
    regex: /^([\d]{9}(\V|\X))$|^([\d]{12})$/,
    error: "Invalid NIC.",
  },
  { elementId: "email", regex: /\S+@\S+\.\S+/, error: "Invalid email." },
  {
    elementId: "conf-email",
    regex: /\S+@\S+\.\S+/,
    error: "Invalid confirm mail.",
  },
  {
    elementId: "contact",
    regex: /^[\d]{10}$/,
    error: "Invalid contact number.",
  },
  {
    elementId: "bplace",
    regex: /^[a-zA-Z0-9]+$/,
    error: "Invalid place name.",
  },
  {
    elementId: "fatname",
    regex: /^[a-zA-Z0-9]+$/,
    error: "Invalid name.",
  },
  {
    elementId: "momname",
    regex: /^[a-zA-Z0-9]+$/,
    error: "Invalid name.",
  },
];

window.addEventListener("load", function () {
  document
    .getElementById("registerForm")
    .addEventListener("submit", validateForm);
});

function validateForm(event) {
  // prevent form submission
  event.preventDefault();

  let isFormValid = true;

  // check each input value
  elementRegexes.forEach((er) => {
    const element = document.getElementById(er.elementId);
    const value = element.value;

    // check with regex
    if (!er.regex.test(value)) {
      // show error in correct place
      document.getElementById(`${er.elementId}alert`).innerHTML = er.error;

      // set form as invalid
      isFormValid = false;
    } else {
      document.getElementById(`${er.elementId}alert`).innerHTML = "";
    }
  });

  if (!isFormValid) return;

  // next check if both emails match
  const email = document.getElementById("email").value.trim();
  const confemail = document.getElementById("conf-email").value.trim();

  if (email !== confemail) {
    document.getElementById("emailalert").innerHTML = "E-Mails don't match!";
    document.getElementById("conf-emailalert").innerHTML =
      "E-Mails don't match!";
    return;
  }

  // check if age is less than 30
  const dob = new Date(document.getElementById("dob").value);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();

  const dobalert = document.getElementById("dobalert");

  // check if given dob is a future date
  if (dob > today) {
    dobalert.innerHTML = "Date of birth can't be a future date!.";
    return;
  }

  // if there aren't any errors
  window.alert("Registration successful!");
}
