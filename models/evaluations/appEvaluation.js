const mongoose = require('mongoose');
const baseSchema = require('./base');

const appEvaluationSchema = new mongoose.Schema({
    ...baseSchema,
    consensus: { type: String, enum: ['pass', 'fail'] },
    mods: [{ type: String, required: true }],
    reasons: [{ type: String, required: true }],
    oszs: [{ type: String, required: true }],
    isRejoinRequest: { type: Boolean },
    natBuddy: { type: 'ObjectId', ref: 'User' },
    vibeChecks: [{ type: 'ObjectId', ref: 'Mediation' }],
    comment: { type: String },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

class AppEvaluationService extends mongoose.Model {

    get isApplication () {
        return true;
    }

    get deadline () {
        let delay = this.isRejoinRequest ? 1 : this.discussion ? 14 : 9;
        let createdAt = this.createdAt;

        return new Date(createdAt.setDate(createdAt.getDate() + delay));
    }

    get kind () {
        return 'application';
    }

    /*
        * in march 2024, the evaluation message changed to show evaluator's individual comments, but not attach their names
        * this bool is needed to identify said evaluations
    */
    get isNewEvaluationFormat () {
        const newEvaluationFormatCutoff = new Date('2024-03-25');
        return new Date(this.archivedAt || this.createdAt) > newEvaluationFormatCutoff;
    }

    static findActiveApps() {
        return AppEvaluation
            .find({
                active: true,
            })
            .populate([
                { path: 'user', select: 'username osuId' },
                { path: 'natBuddy', select: 'username osuId' },
                { path: 'bnEvaluators', select: 'username osuId discordId isBnEvaluator' },
                { path: 'natEvaluators', select: 'username osuId discordId isBnEvaluator' },
                {
                    path: 'reviews',
                    select: 'evaluator behaviorComment moddingComment vote',
                    populate: {
                        path: 'evaluator',
                        select: 'username osuId groups discordId isBnEvaluator',
                    },
                },
                {
                    path: 'rerolls',
                    populate: [
                        {
                            path: 'oldEvaluator',
                            select: 'username osuId',
                        },
                        {
                            path: 'newEvaluator',
                            select: 'username osuId',
                        },
                    ],
                }
            ])
            .sort({
                createdAt: 1,
                consensus: 1,
                feedback: 1,
            });
    }

}

appEvaluationSchema.loadClass(AppEvaluationService);
/**
 * @type {import('../interfaces/evaluations').IAppEvaluationModel}
 */
const AppEvaluation = mongoose.model('AppEvaluation', appEvaluationSchema);

module.exports = AppEvaluation;
