import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUrlDto } from "../dto/create-url.dto";
import { nanoid } from "nanoid";

@Injectable()
export class UrlService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUrlDto) {
    const code = dto.customCode || nanoid(7);

    const existing = await this.prisma.url.findUnique({ where: { code } });
    if (existing) {
      throw new ConflictException(`Code "${code}" is already taken`);
    }

    return this.prisma.url.create({
      data: {
        code,
        original: dto.url,
      },
    });
  }

  async findAll() {
    return this.prisma.url.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }

  async findByCode(code: string) {
    const url = await this.prisma.url.findUnique({ where: { code } });
    if (!url) {
      throw new NotFoundException(`URL with code "${code}" not found`);
    }
    return url;
  }

  async redirect(code: string) {
    const url = await this.findByCode(code);

    await this.prisma.url.update({
      where: { code },
      data: { clicks: { increment: 1 } },
    });

    return url.original;
  }

  async getStats(code: string) {
    const url = await this.findByCode(code);
    return {
      code: url.code,
      original: url.original,
      clicks: url.clicks,
      createdAt: url.createdAt,
    };
  }

  async delete(code: string) {
    await this.findByCode(code);
    return this.prisma.url.delete({ where: { code } });
  }
}
