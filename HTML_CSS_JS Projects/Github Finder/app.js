// initialize gitHub and UI
const github  = new GitHub
const ui = new UI

// search the user
const searchUser = document.getElementById('searchUser')
// event listener on the search
searchUser.addEventListener('keyup',(e) => {
   // get input text
   const userText = e.target.value;
   // condition check
   if(userText !== ''){
      // make http call
      github.getUser(userText)
         .then(data =>{
            if(data.profile.message === 'Not Found') {
                  // show alert 
                  ui.showAlert('User not found.','alert alert-danger')
            } else {
                  // show profile
                  // console.log(data);
                  ui.showProfile(data.profile);
                  ui.showRepos(data.repos);
            }
         })
   } else {
         // clear search profile
         ui.clearProfile();
   }
})