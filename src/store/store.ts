import {makeAutoObservable} from "mobx";
import {IBranch} from "../models/IBranch";
import BranchService from "../services/branchService";
import {addNotification} from "../utils/notification";
import ClickService from "../services/clickService";
import {IStats} from "../models/IStats";

export default class Store {
    branches: IBranch[] = []

    constructor() {
        makeAutoObservable(this);
    }

    setBranches(branches: IBranch[]) {
        this.branches = branches;
    }

    getBranches() {
        return this.branches;
    }

    getBranch(branchName: string | undefined | null) {
        if (!branchName) return null;
        return this.branches.find(branch => branch.name === branchName) || null;
    }

    async getAllBranches() {
        try {
            const res = await BranchService.getAllBranches();

            if (res.data?.success) {
                this.setBranches(res.data?.data || []);
            } else {
                this.setBranches([]);
                addNotification({title: '', message: res.data.message, type: 'warning'})
            }
        } catch (e) {
            addNotification({title: 'Серверная ошибка', message: '', type: 'danger'})
        }
    }

    async addBranch(name: string) {
        try {
            const res = await BranchService.addBranch(name);

            if (res.data?.success) {
                addNotification({title: '', message: 'Филиал успешно добавлен', type: 'success'})
                await this.getAllBranches();
                return true;
            } else {
                addNotification({title: '', message: res.data.message, type: 'warning'})
                return false;
            }
        } catch (e) {
            addNotification({title: 'Серверная ошибка', message: '', type: 'danger'})
            return false;
        }
    }

    async editBranch(id: string, name: string) {
        try {
            const res = await BranchService.editBranch(id, name);

            if (res.data?.success) {
                addNotification({title: '', message: 'Филиал успешно изменен', type: 'success'})
                await this.getAllBranches();
                return true;
            } else {
                addNotification({title: '', message: res.data.message, type: 'warning'})
                return false;
            }
        } catch (e) {
            addNotification({title: 'Серверная ошибка', message: '', type: 'danger'})
            return false;
        }
    }

    async deleteBranch(id: string) {
        try {
            const res = await BranchService.deleteBranch(id);

            if (res.data?.success) {
                addNotification({title: '', message: 'Филиал успешно удален', type: 'success'})
                await this.getAllBranches();
                return true;
            } else {
                addNotification({title: '', message: res.data.message, type: 'warning'})
                return false;
            }
        } catch (e) {
            addNotification({title: 'Серверная ошибка', message: '', type: 'danger'})
            return false;
        }
    }

    async getOneBranch(id: string) {
        try {
            const res = await BranchService.getOneBranch(id);

            if (res.data?.success) {
                return res.data?.data;
            } else {
                addNotification({title: '', message: res.data.message, type: 'warning'})
            }
        } catch (e) {
            addNotification({title: 'Серверная ошибка', message: '', type: 'danger'})
        }
    }

    async getStats(): Promise<IStats | undefined> {
        try {
            const res = await ClickService.getStats();

            if (res.data?.success) {
                return res.data?.data;
            } else {
                addNotification({title: '', message: res.data.message, type: 'warning'})
            }
        } catch (e) {
            addNotification({title: 'Серверная ошибка', message: '', type: 'danger'})
        }
    }

    async addClick(branchName: string) {
        try {
            const res = await ClickService.addClick(branchName);

            if (res.data?.success) {
                await this.getAllBranches();
                return true;
            } else {
                addNotification({title: '', message: res.data.message, type: 'warning'})
                return false;
            }
        } catch (e) {
            addNotification({title: 'Серверная ошибка', message: '', type: 'danger'})
            return false;
        }
    }

    async removeClick(branchName: string) {
        try {
            const res = await ClickService.removeClick(branchName);

            if (res.data?.success) {
                await this.getAllBranches();
                return true;
            } else {
                addNotification({title: '', message: res.data.message, type: 'warning'})
                return false;
            }
        } catch (e) {
            addNotification({title: 'Серверная ошибка', message: '', type: 'danger'})
            return false;
        }
    }

    async getAllClicks(branchName: string) {
        try {
            const res = await ClickService.getAllClicks(branchName);

            if (res.data?.success) {
                return res.data?.data.clicksNumber;
            } else {
                addNotification({title: '', message: res.data.message, type: 'warning'})
            }
        } catch (e) {
            addNotification({title: 'Серверная ошибка', message: '', type: 'danger'})
        }
    }
}

