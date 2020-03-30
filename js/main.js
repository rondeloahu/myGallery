
// global vars
var gProjects = [
    {
        id: '1',
        name: "Book Store",
        title: "Easy to use - online book store",
        desc: "A way to sell your books online",
        url: `proj/1/index.html`,
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: '2',
        name: "Mine Sweeper",
        title: "Minesweeper game",
        desc: "Best way to burn some time on",
        url: `proj/2/index.html`,
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: '3',
        name: "Picture Pick",
        title: "Pick the right Pic",
        desc: "Fun game to play with",
        url: `proj/3/index.html`,
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: '4',
        name: "Touch The Num",
        title: "Touch the spesific number",
        desc: "go test your skills in touch the number game",
        url: `proj/4/index.html`,
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: '5',
        name: "Pop the Ballon",
        title: "Popin ballons is fun",
        desc: "Can you pop ballon? and what about three? go ahead!",
        url: `proj/5/index.html`,
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    }
];
function getProjects() {
    return gProjects;
}

function getProjectById(projectId) {
    var project = gProjects.find(proj => proj.id === projectId);
    console.log(project);
    return project;


}
