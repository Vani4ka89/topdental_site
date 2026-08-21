import {apiService} from "./api.service";
import {urls} from "../constants";
import {IRes} from "../types";
import {IFormTwo} from "../interfaces";

const sendFormService = {
    sendSecondForm: (data: IFormTwo): IRes<string> => {
        return apiService.post(urls.secondForm, data)
    }
};

export {sendFormService};