import { Document, Model } from 'mongoose'
import { IUserDocument } from './user';
import { IMediationDocument } from './mediation';

interface IDiscussionDocument extends Document {
    mode: string;
    title: string;
    discussionLink: string;
    shortReason: string;
    isActive?: boolean;
    isNatOnly: boolean;
    neutralAllowed: boolean;
    reasonAllowed: boolean;
    onlyWrittenInput: boolean;
    isContentReview: boolean;
    isAcceptable: boolean;
    agreeOverwriteText: string;
    neutralOverwriteText: string;
    disagreeOverwriteText: string;
    mediations?: IMediationDocument[];
    creator: IUserDocument;
    createdAt?: Date;
    updatedAt?: Date;
}

export default interface IDiscussionModel extends Model<IDiscussionDocument> { }
