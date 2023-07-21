const user_nav = {
  profile: document.querySelector(".profile-wrapper"),
  logout: document.querySelector(".logout"),
};
const nouser = {
  login: document.querySelector(".login"),
  signup: document.querySelector(".signup"),
};

if (!localStorage.getItem("user")) {
  user_nav.logout.classList.add("hide");
  user_nav.profile.classList.add("hide");

  nouser.login.classList.remove("hide");
  nouser.signup.classList.remove("hide");
} else {
  user_nav.logout.classList.remove("hide");
  user_nav.profile.classList.remove("hide");
  user_nav.profile.querySelector(
    ".profile"
  ).innerHTML = `${localStorage.getItem("user")}&#9660`;

  nouser.login.classList.add("hide");
  nouser.signup.classList.add("hide");
}
