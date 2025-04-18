import { Document, Model } from 'mongoose'
import { IUserDocument } from './user';
import { IReviewDocument } from './review';
import { IMediationDocument } from './mediation';

interface IEvaluationBase {
    user: IUserDocument;
    mode: string;
    reviews?: IReviewDocument[];
    active?: boolean;
    discussion?: boolean;
    feedback?: string;
    cooldownDate?: Date;
    natEvaluators?: IUserDocument[];
    bnEvaluators?: IUserDocument[];
    archivedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    isApplication?: boolean;
    isBnEvaluation?: boolean;
    isResignation?: boolean;
    isReviewed?: boolean;
    isSecurityChecked?: boolean;
    vibeChecks?: IMediationDocument[];
    isNewEvaluationFormat?: boolean;
    isPublic?: boolean;
    messages: {
        date: Date;
        content: string;
        isNat: boolean;
    }[];
    messagesLocked?: boolean;
    rerolls?: {
        createdAt: Date;
        oldEvaluator: IUserDocument;
        newEvaluator: IUserDocument;
        type: string;
    }[];
}

export interface IAppEvaluationDocument extends IEvaluationBase, Document {
    consensus?: string;
    mods: string[];
    reasons: string[];
    oszs: string[];
    isRejoinRequest?: Boolean;
    deadline?: Date;
    kind?: string;
    natBuddy?: IUserDocument;
    comment?: string;
}

export interface IAppEvaluationModel extends Model<IAppEvaluationDocument> {
    findActiveApps?: () => Promise<IAppEvaluationDocument[]>;
}

export interface IBnEvaluationDocument extends IEvaluationBase, Document {
    consensus?: string;
    deadline?: Date;
    addition?: string;
    activityToCheck?: number;
    kind?: string;
    length?: number;
}

export interface IBnEvaluationModel extends Model<IBnEvaluationDocument> {
    findActiveEvaluations?: (user: IUserDocument, isNat: boolean) => Promise<IBnEvaluationDocument[]>;
    findInactiveEvaluations?: () => Promise<IEvaluationDocument[]>;
    deleteUserActiveEvaluations?: (userId: number, mode: string) => Promise<{ ok: number, deletedCount: number, n: number }>;
}

export interface IResignationEvaluationDocument extends IEvaluationBase, Document {
    consensus?: string;
    deadline?: Date;
    kind?: string;
    length?: number;
}

export interface IResignationEvaluationModel extends Model<IResignationEvaluationDocument> {
    findActiveResignations?: () => Promise<IResignationEvaluationDocument[]>;
}

export interface IEvaluationDocument extends IEvaluationBase, IBnEvaluationDocument, Document {
}

export interface IEvaluationModel extends Model<IEvaluationDocument> {
    findActiveEvaluations?: (user: IUserDocument, isNat: boolean) => Promise<IEvaluationDocument[]>;
    findInactiveEvaluations?: () => Promise<IEvaluationDocument[]>;
    deleteUserActiveEvaluations?: (userId: number, mode: string) => Promise<{ ok: number, deletedCount: number, n: number }>;
}
