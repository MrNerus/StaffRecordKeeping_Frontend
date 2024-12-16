import { Enum_Department } from "../Enum/Enum_Department";
import { Enum_Post } from "../Enum/Enum_Post";

export interface IStaff {
    id?: number,
    name: string,
    department: Enum_Department,
    department_Name?: string,
    post: Enum_Post,
    post_Name?: string,
    salary: number
}