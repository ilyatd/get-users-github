Vue.component('users-comp',  {
    props: ['link', 'users'],
    template: `
        <div class="results__users">
            <user-comp v-for="user in users" :key="user.id" :user="user"></user-comp>
        </div>
    `
});

Vue.component('user-comp', {
    props: ['user'],
    data() {
        return {
            showDetails: false
        }
    },
    methods: {
        detailsOpenClose() {
            return this.showDetails = !this.showDetails;
        }
    },
    template: `
        <div class="results__users__user">
            <p class="results__users__user_name" @click="detailsOpenClose()">Имя пользователя: {{user.name}}</p>
            <p class="results__users__user_repos-count" @click="detailsOpenClose()">Количество репозиториев: {{user.public_repos}}</p>
            <div class="results__users__user_details" v-if="showDetails">
                <p>Login: {{user.login}}</p>
                <p>URL: {{user.html_url}}</p>
                <p>Followers: {{user.followers}}</p>
            </div>
        </div>
    `
});