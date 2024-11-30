// Mouse Move
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = ["#ff0000"];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

//Animated Water On Image

$(document).ready(function () {
  $("body").ripples({
    resolution: 512,
    dropRadius: 20,
    perturbance: 0.04,
  });
});

// Text Animation Scroll Triger
var tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".textcontiner",
    start: "20% 70%",
    end: "50% 70%",
    scrub: 2,
  },
});

tl1.to(
  ".workText",
  {
    marginTop: "0%",
  },
  "a"
);

// data Faching from projects.json and send into index.html

document.addEventListener("DOMContentLoaded", () => {
  fetch("projects.json")
    .then((response) => response.json())
    .then((data) => {
      renderProjects(data);
      animateProjects();
    });
});

function renderProjects(projects) {
  const container = document.getElementById("projectsContainer");
  projects.forEach((project) => {
    const projectElement = `
            <div class="my-10 md:my-[20%] flex flex-col md:flex-row w-full m-auto gap-10 md:items-center" id="project">
            <div class="md:w-3/5 lg:1/2">
                <img src=${project.image_url} class="w-full   width="100" height="100"/>
                </div>
                <div class="text-start  md:mt-0 md:w-2/5 lg:1/2">
                    <h4 class="text-2xl font-bold text-gray-950 dark:text-gray-50 lg:text-6xl" >${project.title}</h4>
                    <h2 class="text-md text-orange-500 lg:text-2xl">${project.subtitle}</h2>
                    <h6 class="text-xs md:text-base ">${project.description}</h6>
                    <div class="mt-3 text-xs lg:text-xs flex gap-3">
                    <a class="p-2 lg:p-3 bg-orange-500 text-gray-50 outline outline-2 outline-orange-800 rounded-full " href="${project.link}"><button>Visit Now</button></a>
                    <a class="p-2 lg:p-3  bg-gray-950 dark:bg-gray-50  text-gray-50 dark:text-gray-950 rounded-full outline outline-2 dark:outline-orange-500 outline-orange-800" href="${project.link2}">Git Hub</a>
                    </div>
                </div>
            </div>
        `;
    container.insertAdjacentHTML("beforeend", projectElement);
  });
}

function animateProjects() {
  const projects = document.querySelectorAll("#project");
  projects.forEach((project) => {
    gsap.fromTo(
      project,
      {
        opacity: 1,
        y: 150,
      },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        scrollTrigger: {
          trigger: project,
          start: "10% 80%",
          end: "40% 70%",
          scrub: true,
          once: false,
        },
      }
    );
  });
}


//DARK Mode

var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
    var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

    // Change the icons inside the button based on previous settings
    if (
        localStorage.getItem("color-theme") === "dark" ||
        (!("color-theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        themeToggleLightIcon.classList.remove("hidden");
    } else {
        themeToggleDarkIcon.classList.remove("hidden");
    }

    var themeToggleBtn = document.getElementById("theme-toggle");

    themeToggleBtn.addEventListener("click", function () {
        // toggle icons inside button
        themeToggleDarkIcon.classList.toggle("hidden");
        themeToggleLightIcon.classList.toggle("hidden");

        // if set via local storage previously
        if (localStorage.getItem("color-theme")) {
            if (localStorage.getItem("color-theme") === "light") {
                document.documentElement.classList.add("dark");
                localStorage.setItem("color-theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("color-theme", "light");
            }

            // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains("dark")) {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("color-theme", "light");
            } else {
                document.documentElement.classList.add("dark");
                localStorage.setItem("color-theme", "dark");
            }
        }
    });