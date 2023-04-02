export default function blink() {
    const form = document.querySelector(".modal-container > .toolbar-modal");
    const oldColor = form.style.backgroundColor;
    var count = 0;
    const int = setInterval(() => {
        if (form.style.backgroundColor == oldColor)
            form.style.backgroundColor = "red";
        else form.style.backgroundColor = oldColor;
        if (++count > 3) {
            clearInterval(int);
            form.style.backgroundColor = oldColor;
        }
    }, 10);
}