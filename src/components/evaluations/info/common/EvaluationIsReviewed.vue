<template>
    <div>
        <b>Reviewed: </b>
        <a
            href="#"
            data-toggle="tooltip"
            data-placement="right"
            title="toggle eval review status"
            @click.prevent="toggleEvaluationIsReviewed($event)"
        >
            <font-awesome-icon
                icon="fa-solid fa-circle-check"
                :class="selectedEvaluation.isReviewed ? 'text-success' : 'text-secondary'"
            />
        </a>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import evaluations from '../../../../mixins/evaluations.js';

export default {
    name: 'EvaluationIsReviewed',
    mixins: [evaluations],
    computed: {
        ...mapGetters('evaluations', ['selectedEvaluation']),
    },
    methods: {
        async toggleEvaluationIsReviewed(e) {
            const result = await this.$http.executePost(`/${this.selectedEvaluation.isApplication ? 'appEval' : 'bnEval'}/toggleIsReviewed/${this.selectedEvaluation.id}`, e); 
            
            if (result && !result.error) {
                this.$store.commit('evaluations/updateEvaluation', result);
                this.$store.dispatch('updateToastMessages', {
                    message: `Toggled eval review status`,
                    type: 'success',
                });
            }  
        },
    },
}
</script>
