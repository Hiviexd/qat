<template>
    <div>
        <button
            class="btn btn-block btn-danger"
            data-toggle="tooltip"
            data-placement="top"
            title="The NAT will evaluate your recent activity and remove you from the BN (usually within 24 hours)."
            @click="resignFromBn($event)"
        >
            Resign from the {{ mode | formatMode }} Beatmap Nominators
        </button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import evaluations from '../../../mixins/evaluations';

export default {
    name: 'BnEvaluatorToggle',
    mixins: [ evaluations ],
    props: {
        mode: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapGetters('users', [
            'selectedUser',
        ]),
    },
    methods: {
        async resignFromBn(e) {
            const result = confirm(`Are you sure? You will no longer be a Beatmap Nominator for ${this.formatMode(this.mode)}.`);

            if (result) {
                await this.$http.executePost(`/users/resignFromBn/${this.selectedUser.id}`, { mode: this.mode }, e);
            }
        },
    },
};
</script>