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

// for burger menu in phone:

const nav_list = document.querySelectorAll(".nav-list > a");

for (let i = 1; i < nav_list.length; i++) {
  const a = nav_list[i];
  if (localStorage.getItem("user")) {
    if (i < 3) {
      a.classList.add("hide");
    } else {
      a.classList.remove("hide");
    }
  } else {
    if (i < 3) {
      a.classList.remove("hide");
    } else {
      a.classList.add("hide");
    }
  }
}
