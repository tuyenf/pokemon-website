import { AxiosInstance } from 'axios';
export declare class ApiService {
    private static _instance;
    private readonly _api;
    constructor();
    static instance(): ApiService;
    get axios(): AxiosInstance;
}
