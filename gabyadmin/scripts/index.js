// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div class="left-align"><h5>Email: ${user.email}</h5></div>
        <div class="left-align"><h5>Name: ${doc.data().name}</h5></div>
        <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
      `;
      accountDetails.innerHTML = html;
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupGuides = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <li>
          <div class="collapsible-header green white-text">FROM: ${guide.title} </div>
          <div class="collapsible-body grey lighten-2">${guide.content}?
          <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${guide.title}&tf=1" class="btn green darken-2 z-depth-0 modal-trigger" target="_blank">REPLY</a>
          <a href="#" class="btn red darken-2 z-depth-0 modal-trigger" data-target="delete-question">DELETE</a>
          </div>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = '<div><center><h3>PENDING QUESTIONS</h3></center><br><br></div>' + html;
  } else {
    guideList.innerHTML = '<img class="center-align" src="img/bg.jpg" style="width: 1100px;">';
  }

};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

//reset pass

$("#reset-pass").click(function () {
  var auth = firebase.auth();
  var email = $("#emailad").val();

  //reset the email
  if (email != "") {
    auth.sendPasswordResetEmail(email).then(function () {
      swal({
        title: "Success! Please check your email.",
        icon: "success",
      });
    });
  }
});