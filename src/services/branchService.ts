import $api from "../api/api";
import {AxiosResponse} from "axios";
import {DefaultResponse, GetAllBranches, GetOneBranch} from "../models/response/DataResponse";
import {ErrorResponse} from "../models/response/ErrorResponse";
import {IStats} from "../models/IStats";

class BranchService {
    static async addBranch (branchName: string): Promise<AxiosResponse<DefaultResponse | ErrorResponse>> {
        return $api.post<DefaultResponse | ErrorResponse>('/cmd/branch-add', {name: branchName});
    }

    static async editBranch (branchId: string, branchName: string): Promise<AxiosResponse<DefaultResponse | ErrorResponse>> {
        return $api.post<DefaultResponse | ErrorResponse>('/cmd/branch-update', {id: branchId, newBranchName: branchName});
    }

    static async deleteBranch (branchId: string): Promise<AxiosResponse<DefaultResponse | ErrorResponse>> {
        return $api.post<DefaultResponse | ErrorResponse>('/cmd/branch-delete', {id: branchId});
    }

    static async getOneBranch(branchId: string): Promise<AxiosResponse<GetOneBranch | ErrorResponse>> {
        return $api.post<GetOneBranch | ErrorResponse>('/q/branch-get-one', {id: branchId});
    }

    static async getAllBranches(): Promise<AxiosResponse<GetAllBranches | ErrorResponse>> {
        return $api.get<GetAllBranches | ErrorResponse>('/q/branch-get-all');
    }
}

export default BranchService;
