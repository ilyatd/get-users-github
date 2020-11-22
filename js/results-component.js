Vue.component('results-comp', {
    props: ['users'],
    methods: {
        clickLink(link) {
            store.commit('changePage', link);
        },
        sortUsers(action) {
            if (action === 'up' || action === 'down') {
                store.commit('sortUsers', action);
            }
        },
        checked(number) {
            if (number === store.state.currentPage + 1){
                return 'checked'
            }
        }
    },
    template:`
        <div class="results">
            <div class="results__filter">
                <p class="results__filter_text">Фильтр по количеству репозиториев: </p>
                <label @click="sortUsers('up')"><input type="radio" name="filter" class="results__filter_radio"><p class="results__filter_link"><i class="fas fa-sort-amount-down-alt"></i></p></label>
                <label @click="sortUsers('down')"><input type="radio" name="filter" class="results__filter_radio"><p class="results__filter_link"><i class="fas fa-sort-amount-down"></i></p></label>
                
            </div>
            <div class="results__pagination" v-if="$store.getters.pageCount > 1">
                <p class="results__pagination_link" @click="clickLink('prev')"><i class="fas fa-angle-left"></i></p>
                <label v-for="number in $store.getters.pageCount" @click="clickLink(number)"><input type="radio" name="pagination" :checked="checked(number)" class="results__pagination_radio"><p class="results__pagination_link">{{number}}</p></label>
                <p class="results__pagination_link" @click="clickLink('next')"><i class="fas fa-angle-right"></i></p>
            </div>
            <users-comp :users="$store.getters.renderUsers"></users-comp>
        </div>
    `
});