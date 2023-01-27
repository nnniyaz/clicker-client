import {IBranch} from "../IBranch";

export interface GetAllBranches {
    success: true;
    data: IBranch[]
}

export interface GetOneBranch {
    success: true;
    data: IBranch
}

export interface GetAllClicks {
    success: true;
    data: {
        clicksNumber: number
    }
}

export interface DefaultResponse {
    success: true;
    message: string;
}
