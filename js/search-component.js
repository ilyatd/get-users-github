Vue.component('search-comp', {
    props: ['users', 'error'],
    data() {
        return {
            searchText: '',
            requestText: ''
        }
    },
    methods: {
        getUsers() {
            if (this.searchText !== '') {
                this.requestText = this.searchText;
                return store.dispatch('getUsers', this.searchText)
            } else return store.commit('clearState');
        }
    },
    template: `
        <form class="search-users" @submit.prevent="getUsers">
            <p class="search-users_header">Введите имя пользователя:</p>
            <input type="text" class="search-users_input" v-model="searchText" >
            <input type="submit" class="search-users_submit" value="Поиск">
            <p class="search-users_result-text" v-if="users !== null">По запросу ' <span>{{requestText}}</span> ' получено результатов: {{users.length}}</p>
            <p class="search-users_result-error" v-if="error !== null">{{error}}</p>
        </form>
    `
});