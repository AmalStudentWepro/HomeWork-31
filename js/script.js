document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector(".modal");
    const modalClose = document.querySelector("[data-close]");
    const modalTriggers = document.querySelectorAll("[data-modal]");
    const canvas = document.createElement("canvas");
  
    document.body.appendChild(canvas);
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
  
    const ctx = canvas.getContext("2d");
    let fireworks = [];
  
    modalTriggers.forEach(btn => {
      btn.addEventListener("click", () => {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    });
  
    modalClose.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });
  
    modal.addEventListener("click", e => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  
    const menuLinks = document.querySelectorAll(".header__link");
  
    menuLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const section = document.querySelector(".offer");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  
    const tabs = document.querySelectorAll(".tabheader__item");
    const tabContents = document.querySelectorAll(".tabcontent");
  
    function hideTabs() {
      tabContents.forEach(function (content) {
        content.style.display = "none";
      });
      tabs.forEach(function (tab) {
        tab.classList.remove("tabheader__item_active");
      });
    }
  
    function showTab(index) {
      tabContents[index].style.display = "block";
      tabs[index].classList.add("tabheader__item_active");
    }
  
    hideTabs();
    showTab(0);
  
    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        hideTabs();
        showTab(index);
      });
    });
  
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
  
    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();
  
    class Firework {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.particles = [];
          const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]; // Добавлены разные цвета
          for (let i = 0; i < 50; i++) {
            this.particles.push({
              x: this.x,
              y: this.y,
              angle: Math.random() * Math.PI * 2,
              speed: Math.random() * 3 + 1,
              life: 100,
              color: colors[Math.floor(Math.random() * colors.length)] // Случайный цвет для каждой частицы
            });
          }
        }
        update() {
          this.particles.forEach(p => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.life--;
          });
          this.particles = this.particles.filter(p => p.life > 0);
          return this.particles.length > 0;
        }
        draw() {
          this.particles.forEach(p => {
            ctx.fillStyle = p.color; 
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); 
            ctx.fill();
          });
        }
      }
      
  
    function showFireworks() {
      setInterval(() => {
        fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height / 2));
      }, 200);
    }
  
    function animateFireworks() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireworks = fireworks.filter(firework => firework.update());
      fireworks.forEach(firework => firework.draw());
      requestAnimationFrame(animateFireworks);
    }
  
    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");
    const targetDate = new Date("2025-03-01T13:30:00");
  
    function updateTimer() {
      let now = new Date();
      let remainingTime = targetDate - now;
      let d = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      let h = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let m = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      let s = Math.floor((remainingTime % (1000 * 60)) / 1000);
      days.textContent = d;
      hours.textContent = h;
      minutes.textContent = m;
      seconds.textContent = s;
  
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        showFireworks();
        animateFireworks();
      }
    }
  
    let timerInterval = setInterval(updateTimer, 1000);
  });
  