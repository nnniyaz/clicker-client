import $api from "../api/api";
import {AxiosResponse} from "axios";
import {DefaultResponse, GetAllClicks} from "../models/response/DataResponse";
import {ErrorResponse} from "../models/response/ErrorResponse";
import {IStatsResponse} from "../models/IStats";

class ClickService {
    static async addClick(branchName: string, createdAt: string): Promise<AxiosResponse<DefaultResponse | ErrorResponse>> {
        return $api.post<DefaultResponse | ErrorResponse>('/cmd/click-add', {
            branchName: branchName,
            createdAt: createdAt
        });
    }

    static async removeClick(branchName: string): Promise<AxiosResponse<DefaultResponse | ErrorResponse>> {
        return $api.post<DefaultResponse | ErrorResponse>('/cmd/click-delete', {branchName: branchName});
    }

    static async getAllClicks(branchName: string): Promise<AxiosResponse<GetAllClicks | ErrorResponse>> {
        return $api.post<GetAllClicks | ErrorResponse>('/cmd/click-get-all', {branchName: branchName});
    }

    static async getStats(): Promise<AxiosResponse<IStatsResponse | ErrorResponse>> {
        return $api.get<IStatsResponse | ErrorResponse>('/q/click-stats');
    }
}

export default ClickService;
