// получаем все объекты на странице с классом .key — это наши клавиши
const keys = document.querySelectorAll(".key"),
      // получаем область на странице, куда будем выводить названия нот 
      note = document.querySelector(".nowplaying"),
      // тут хранятся все наши подсказки
      hints = document.querySelectorAll(".hints");

// проигрываем звук при нажатии на клавишу
function playNote(e) {
  // получаем аудиообъект по коду нажатой клавиши
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
    // получаем нажатую клавишу на пианино по коду нажатой клавиши на клавиатуре
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  // если мы нажали клавишу, которой не было в списке, то выходим из функции и никакой звук не играем
  if (!key) return;

  // получаем название ноты
  const keyNote = key.getAttribute("data-note");

  // добавляем класс, который отвечает за анимацию нажатия
  key.classList.add("playing");
  // выводим на экран название ноты
  note.innerHTML = keyNote;
  // будем проигрывать каждое аудио с самого начала
  audio.currentTime = 0;
  // включаем звук нажатой клавиши
  audio.play();
}

// функция, которая убирает анимацию нажатия на клавишу
function removeTransition(e) {
  // если у клавиши уже нет свойства transform
  if (e.propertyName !== "transform") return;
  // убираем класс playing из описания клавиши
  this.classList.remove("playing");
}

// функция отображения подсказок
function hintsOn(e, index) {
  // добавляем каждой подсказке новое свойство, которое отвечает за задержку появления
  // время задержки зависит от позиции клавиши
  e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
}

// включаем отображение подсказок
hints.forEach(hintsOn);

// перебираем все клавиши, где запустилась анимация, и убираем обводку с тех клавиш, где она уже закончила отрисовываться
keys.forEach(key => key.addEventListener("transitionend", removeTransition));

// отслеживаем нажатие каждой клавиши и сразу включаем звук
window.addEventListener("keydown", playNote);