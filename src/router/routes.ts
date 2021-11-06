export const routes = {
    "/game/:id": {
        main: "Game",
    },
    "/about": {
        main: "About",
        layout: "Page",
    },
    "/": {
        main: "Home",
        layout: "Page",
    },
}

export const fallback = {
    main: "404",
    layout: "Page",
}
