<template>
    <modal-dialog id="reportInfo">
        <template v-if="selectedReport" #header>
            <modal-header />
        </template>

        <div v-if="selectedReport" class="container">
            <context />

            <debug-view-document 
                v-if="loggedInUser.isAdmin"
                :document="selectedReport" 
            />

            <hr>

            <feedback class="mb-3" />

            <report-feedback-pm
                v-if="!selectedReport.isActive"
            />
        </div>
    </modal-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ModalHeader from './info/ModalHeader.vue';
import Context from './info/Context.vue';
import Feedback from './info/Feedback.vue';
import ReportFeedbackPm from './info/ReportFeedbackPm.vue';
import ModalDialog from '../ModalDialog.vue';
import DebugViewDocument from '../DebugViewDocument.vue';

export default {
    name: 'ReportInfo',
    components: {
        ModalHeader,
        Context,
        Feedback,
        ReportFeedbackPm,
        ModalDialog,
        DebugViewDocument,
    },
    computed: {
        ...mapState([
            'loggedInUser',
        ]),
        ...mapGetters('manageReports', [
            'selectedReport',
        ]),
    },
};
</script>