<template>
    <div>
        <b>Security checked: </b>
        <a
            href="#"
            @click.prevent="toggleEvaluationIsSecurityChecked($event)"
        >
            <font-awesome-icon
                icon="fa-solid fa-circle-check"
                :class="selectedEvaluation.isSecurityChecked ? 'text-success' : 'text-secondary'"
            />
        </a>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import evaluations from '../../../../mixins/evaluations.js';

export default {
    name: 'EvaluationIsSecurityChecked',
    mixins: [evaluations],
    computed: {
        ...mapGetters('evaluations', ['selectedEvaluation']),
    },
    methods: {
        async toggleEvaluationIsSecurityChecked(e) {
            const result = await this.$http.executePost(`/${this.selectedEvaluation.isApplication ? 'appEval' : 'bnEval'}/toggleisSecurityChecked/${this.selectedEvaluation.id}`, e); 
            
            if (result && !result.error) {
                this.$store.commit('evaluations/updateEvaluation', result);
                this.$store.dispatch('updateToastMessages', {
                    message: `Toggled security check status`,
                    type: 'success',
                });
            }  
        },
    },
}
</script>
