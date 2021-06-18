export const apiURL = () => {
    return window.location.hostname === "localhost"
        ? "http://localhost:9000"
        : "https://dumin1120-proj-budgeting-app.herokuapp.com";
}