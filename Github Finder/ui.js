class UI {
   constructor() {
      this.profile = document.getElementById('profile')
      // console.log(this.profile)
   }

   showProfile(user){
      this.profile.innerHTML = `
      <div class="card card-body mb-3">
         <div class="row">
            <div class="col-md-3">
               <img src="${user.avatar_url}" alt="" class="img-fluid mb-2">
               <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
            </div>
            <div class="col-md-9">
               <span class="badge bg-primary">Public repositories : ${user.public_repos}</span>
               <span class="badge bg-primary">Public Gists : ${user.public_gists}</span>
               <span class="badge bg-success">Followers : ${user.followers}</span>
               <span class="badge bg-info">Following : ${user.following} </span>
               
               <br><br>
               <ul class="list-group">
                  <li class="list-group-item">Company : ${user.company}</li>
                  <li class="list-group-item">Blog/website : ${user.blog}</li>
                  <li class="list-group-item">Location : ${user.location}</li>
                  <li class="list-group-item">Member Since : ${user.created_at}</li>
               </ul>
            </div>
         </div>
      </div>
      <h3 class="page_landing mb-3">Latest Repositories : </h3>
      <div id="repos"></div>
      `;
   }

   clearProfile(){
      this.profile.innerHTML = '';
   }

   // displaying the alert
   showAlert(message,className){
      // clearing the remaining alert
      this.clearAlert();

      // create a div
      const div = document.createElement('div');
      // add a class
      div.className = className;
      // add text
      div.appendChild(document.createTextNode(message));
      // create Parent
      const container = document.querySelector('.searchContainer');
      // get search box
      const search = document.querySelector('.search');
      // insert alert
      container.insertBefore(div,search);

      setTimeout( ()=>{
         this.clearAlert();
      },3000 );
   }

   // clear alert message
   clearAlert(){
      const currentAlert = document.querySelector('.alert');
      if(currentAlert){
         currentAlert.remove();
      }
   }

   // show user repos
   showRepos(repos) {
      let output = '';
      
      repos.forEach(function(repo){
         output += `
         <div class="card card-body mb-2">
         <div class="row">
            <div class="col-md-6">
               <a href=${repo.html_url}>${repo.name}</a>
            </div>
            <div class="col-md-6">
            <span class="badge bg-primary">Stars: ${repo.stargazers_count}</span> 
            <span class="badge bg-primary">Watchers : ${repo.watchers_count}</span> 
            <span class="badge bg-primary">Forks : ${repo.forms_count}</span>
            </div>

         </div>
         </div>
         `;
      })
      // output repos
      document.getElementById("repos").innerHTML = output;
   }
}