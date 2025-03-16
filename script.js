function elemScroll(elemID) {
    const targetElement = document.querySelector("#" + elemID);

    if (!targetElement) {
        console.error("Элемент с ID " + elemID + " не найден.");
        return;
    }

    const rect = targetElement.getBoundingClientRect();
    const isInViewport = rect.top >= 0 && rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    if (!isInViewport) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        targetElement.classList.add("scroll-target");
        setTimeout(() => {
            targetElement.classList.remove("scroll-target");
        }, 1000);
    }

    let isScrolling;
    const onScroll = () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            window.removeEventListener("scroll", onScroll);
            targetElement.classList.add("scroll-target");
            setTimeout(() => {
                targetElement.classList.remove("scroll-target");
            }, 1000);
        }, 150);
    };

    window.addEventListener("scroll", onScroll);
}