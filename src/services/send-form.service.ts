import {apiService} from "./api.service";
import {urls} from "../constants";
import {IRes} from "../types";
import {IForm, IFormTwo} from "../interfaces";

const sendFormService = {
    sendFirstForm: (data: IForm): IRes<string> => {
        return apiService.post(urls.firstForm, data)
    },
    sendSecondForm: (data: IFormTwo): IRes<string> => {
        return apiService.post(urls.secondForm, data)
    }
};

export {sendFormService};