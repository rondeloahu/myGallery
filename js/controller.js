function renderProjects() {
  var projects = getProjects()
  var strHtmls = projects.map(function getProjectHTML(project) {
    return `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="renderModal('${project.id}')">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/proj/0${project.id}.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${project.title}</h4>
          <p class="text-muted">${project.desc}</p>
        </div>
      </div>
        `
  })
  document.querySelector('.prot').innerHTML = strHtmls.join('')
}

function renderModal(projectId) {
  var selectedProject = getProjectById(projectId);
  var strHtml = `
                <h2>${selectedProject.name}</h2>
                <p class="item-intro text-muted">${selectedProject.title}</p>
                <img class="img-fluid d-block mx-auto" src="img/proj/0${selectedProject.id}.jpg" alt="">
                <p>${selectedProject.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${selectedProject.date}</li>
                  <li>Client: Coding Acedemy School</li>
                  <li>Category: ${selectedProject.labels}</li>
                </ul>
                <button onclick="getToProj('${selectedProject.url}')" class="btn btn-primary">
                Try Project
                </button>
                <button class="btn btn-secondry" data-dismiss="modal" type="button">
                <i class="fa fa-times"></i>
                Close Project
                </button>`
  document.querySelector('.modal-body').innerHTML = strHtml;
}
function onSendMail() {
  const SUBJECT = document.querySelector('input[name="subject"]').value;
  const BODY = document.querySelector('textarea[name="text"]').value;
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=gal31010@gmail.com&su=${SUBJECT}&body=${BODY}`, '_blank');
}

function getToProj(url) {
    console.log(url);
  window.open(url, '_blank');
}

renderProjects();
