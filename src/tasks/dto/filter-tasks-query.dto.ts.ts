import { IsIn, IsOptional } from "class-validator";

export class FilterTasksQueryDtoTs {
    @IsOptional()
    title?: string;

    @IsOptional()
    @IsIn([true, false])
    isCompleted?: boolean;
}
