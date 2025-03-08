import { IsDate, IsInt, IsNotEmpty, IsString, MinDate } from "class-validator";
import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from 'class-transformer';
import { polyglot } from 'src/@shared/i18n';
import { I18n } from 'src/@shared/i18n';

export class FilterAppointmentsDto {
    @ApiProperty({
        description: 'The search query',
        required: false,
    })
    @IsOptional()
    @IsString(polyglot(I18n.MESSAGES.IS_STRING_MESSAGE))
    search?: string;

    @ApiProperty({
        description: 'The page number',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt(polyglot(I18n.MESSAGES.IS_INTEGER_MESSAGE))
    page?: number;

    @ApiProperty({
        description: 'The number of items per page',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt(polyglot(I18n.MESSAGES.IS_INTEGER_MESSAGE))
    take?: number;

    @ApiProperty({
        description: 'The from date',
        required: false,
    })
    @Transform(({ value }) => {
        const date = new Date(value);
        return date;
    })
    @IsDate(polyglot(I18n.MESSAGES.IS_DATE_MESSAGE))
    @IsOptional()
    fromDate?: Date;

    @ApiProperty({
        description: 'The to date',
        required: false,
    })
    @Transform(({ value }) => {
        return new Date(value);
    })
    @IsDate(polyglot(I18n.MESSAGES.IS_DATE_MESSAGE))
    @IsOptional()
    toDate?: Date;


    @ApiProperty({
        description: 'The service id',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt(polyglot(I18n.MESSAGES.IS_INTEGER_MESSAGE))
    serviceId?: number;

    @ApiProperty({
        description: 'The user id',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt(polyglot(I18n.MESSAGES.IS_INTEGER_MESSAGE))
    userId?: number;
}
