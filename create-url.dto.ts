import { IsUrl, IsOptional, IsString, Length } from "class-validator";

export class CreateUrlDto {
  @IsUrl({}, { message: "Must be a valid URL" })
  url!: string;

  @IsOptional()
  @IsString()
  @Length(3, 20, { message: "Custom code must be 3-20 characters" })
  customCode?: string;
}
