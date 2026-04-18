import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Res,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { UrlService } from "./url.service";
import { CreateUrlDto } from "./dto/create-url.dto";

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post("shorten")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateUrlDto) {
    const url = await this.urlService.create(dto);
    return {
      code: url.code,
      shortUrl: `http://localhost:3000/${url.code}`,
      original: url.original,
    };
  }

  @Get("urls")
  async findAll() {
    return this.urlService.findAll();
  }

  @Get("stats/:code")
  async getStats(@Param("code") code: string) {
    return this.urlService.getStats(code);
  }

  @Get(":code")
  async redirect(@Param("code") code: string, @Res() res: Response) {
    const original = await this.urlService.redirect(code);
    return res.redirect(301, original);
  }

  @Delete(":code")
  @HttpCode(204)
  async delete(@Param("code") code: string) {
    await this.urlService.delete(code);
  }
}
