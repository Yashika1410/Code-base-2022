class GitHub {
   constructor() {
      this.client_id = 'c55a05ed80396e20493f'
      this.client_secret = '8256c33200ca5cc213566db8a561f675702753f3'
      this.repos_count = 5;
      this.repos_sort = 'created:asc';
   }

   // get user method
   async getUser(user){
      const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
      const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

      const profile = await profileResponse.json();
      const repos = await repoResponse.json();
      return {
         profile,repos
      }
   }
}