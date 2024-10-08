function heroAnimation() {
  //animating text usin gsap
  const heroH1 = document.querySelector(".hero h1");

  //wrapping each letter with span
  heroH1.innerHTML = heroH1.textContent
    .split("")
    .map((letter) => `<span class="letter">${letter}</span>`)
    .join("");

  //adding animation
  gsap.from(".letter", {
    opacity: 0,
    duration: 1,
    delay: 0.3,
    stagger: 0.05,
    ease: "power1.inOut",
  });
}

heroAnimation();

const cardAnimation = () => {
  if (window.innerWidth > 768) {
    gsap.from(".card", {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".card",
        start: "top 100%",
        end: "top 95%",
        scroller: "body",
        // scrub: 1,
      },
    });
  }
};

cardAnimation();

// Re-run animation on window resize to ensure responsiveness
window.addEventListener("resize", () => {
  gsap.killTweensOf(".card"); // Kill previous animations to prevent duplicates
  cardAnimation();
});

const layerAnmation = () => {
  var box = document.querySelectorAll(".work-card");

  box.forEach((e) => {
    console.log(e.childNodes);
    e.addEventListener("mouseenter", () => {
      gsap.to(e, {
        borderTop: "2px solid white",
        ease: "power2.out",
        duration: 0.1,
      });

      gsap.to(e.childNodes[1], {
        ease: "power2.out",
        x: 50,
      });

      gsap.to(e.childNodes[3], {
        y: 0,
        height: "100%",
        ease: "power2.out",
        duration: 0.5,
      });

      gsap.to(e.childNodes[5], {
        x: "-50%",
        duration: 0.1,
      });
    });

    e.addEventListener("mouseleave", () => {
      gsap.to(e.childNodes[3], {
        y: "100%",
        height: "100%",
        ease: "power2.out",
        duration: 0.5,
      });

      gsap.to(e.childNodes[5], {
        x: 0,
        y: 0,
        scale: 1,
      });

      gsap.to(e.childNodes[1], {
        ease: "power2.out",
        x: "0%",
      });

      gsap.to(e, {
        ease: "power2.out",
        borderTop: "1px solid #555",
        duration: 0.5,
      });

      setTimeout(() => {
        let tl = gsap.timeline();

        tl.to(e.childNodes[3], {
          y: "-100%",
          opacity: 0,
          duration: 0,
        });

        tl.to(e.childNodes[3], {
          opacity: 1,
          duration: 0,
        });
      }, 500);
    });
  });
};

layerAnmation();

const cursorAnimation = () => {
  const cursor = document.querySelector(".cursor");
  const contactPage = document.querySelector(".contact");

  contactPage.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      height: "7vw",
      width: "7vw",
    });
  });
  contactPage.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      height: 0,
      width: 0,
    });
  });

  contactPage.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      top: e.y - contactPage.getBoundingClientRect().top,
      left: e.x - contactPage.getBoundingClientRect().left,
    });
  });
};
cursorAnimation();

const menuHeightOnLoad = () => {
  const menuScreen = document.querySelector(".menu");
  menuScreen.style.height = "0px";
  menuScreen.style.opacity = "0";
};

menuHeightOnLoad();

const menuClose = () => {
  const menuCloseBtn = document.querySelector(".menu-header button");
  const menuScreen = document.querySelector(".menu");

  menuCloseBtn.addEventListener("click", () => {
    let tl = gsap.timeline();

    tl.to(".menu ul li a", {
      opacity: 0,
      stagger: -0.1,
    });

    tl.to(menuScreen, {
      height: 0,
      opacity: 0,
      pointerEvents: "none",
      ease: "circ.out",
    });
  });
};
menuClose();

const menuOpen = () => {
  const menuOpenBtn = document.querySelector("nav button");
  const menuScreen = document.querySelector(".menu");

  menuOpenBtn.addEventListener("click", () => {
    let tl = gsap.timeline();
    tl.to(menuScreen, {
      opacity: 1,
      height: "100vh",
      pointerEvents: "all",
      ease: "circ.out",
    });

    tl.to(".menu ul li a", {
      opacity: 1,
      stagger: +0.1,
    });
  });
};
menuOpen();

const stringAnimation = () => {
  var string = document.querySelector(".string");
  var path = string.querySelector("path");

  string.addEventListener("mousemove", (dets) => {
    let rect = string.getBoundingClientRect();
    let pathValue = `M 10 200 Q ${dets.x - rect.x} ${dets.y - rect.y} 1430 200`;

    gsap.to(path, {
      attr: { d: pathValue },
      duration: 0.5,
      ease: "power3.out",
    });
  });

  string.addEventListener("mouseleave", () => {
    gsap.to(path, {
      attr: { d: "M 10 200 Q 500 200 1430 200" },
      duration: 1,
      ease: "elastic.out(1,0.3)",
    });
  });
};
stringAnimation();

const contactMail = () => {
  const contactPage = document.querySelector(".contact");
  contactPage.addEventListener("click", (e) => {
    const mail =
      "https://mail.google.com/mail/?view=cm&fs=1&to=shlokarth7@gmail.com&su=Subject&body=Body";
    window.open(mail);
  });
};
contactMail();

const customMessagePopUp = () => {
  var inactiveCard = document.querySelectorAll(".inactive-card");

  inactiveCard.forEach((e) => {
    console.log(e);
    e.addEventListener("click", () => {
      let tl = gsap.timeline();
      tl.to(".inactive-card-message", {
        opacity: 1,
        top: "90%",
        duration: 0.2,
      });

      tl.to(".inactive-card-message ", {
        delay: 2,
        opacity: 0,
        top: "100%",
        duration: 0.2,
      });
    });
  });
};

customMessagePopUp();

function initScrollTrigger(element, callback) {
  let isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;

  if (isTouch) {
    let startY = 0;

    element.addEventListener("touchstart", (event) => {
      startY = event.touches[0].clientY;
    });

    element.addEventListener("touchmove", (event) => {
      let currentY = event.touches[0].clientY;
      let diff = startY - currentY;

      if (Math.abs(diff) > 30) {
        if (diff > 0) {
          callback("down");
        } else {
          callback("up");
        }
        startY = currentY;
      }
    });
  } else {
    window.addEventListener("scroll", () => {
      let scrollY = window.scrollY;
      let direction = scrollY > lastScroll ? "down" : "up";

      callback(direction);
      lastScroll = scrollY;
    });
  }
}

initScrollTrigger(document, (direction) => {
  if (direction === "down") {
    console.log("Scrolled Down");
  } else {
    console.log("Scrolled Up");
  }
});
// initScrollTrigger();

let currentWidth = window.innerWidth;

const reloadOnWidthChange = () => {
  window.addEventListener("resize", () => {
    if (window.innerWidth !== currentWidth) {
      currentWidth = window.innerWidth;
      window.location.reload();
    }
  });
};

reloadOnWidthChange();
