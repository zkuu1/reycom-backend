import type { Prisma, PrismaClient } from "../../generated/prisma/client.js";

export class VideoRepository {
    static async countByTitleVideo(
        prisma: PrismaClient,
        title_video: string,
    ) {
        return prisma.videos.count({
            where: { title_video },
        });
    }

    static async createVideo(
        prisma: PrismaClient,
        data: Prisma.VideosCreateInput,
    ) {
        return prisma.videos.create({
            data,
        });
    }

    static async findVideoByTitle(
        prisma: PrismaClient,
        title_video: string,
    ) {
        return prisma.videos.findFirst({
            where: { title_video },
        });
    }

    static async getAllVideos(
        prisma: PrismaClient,
    ) {
        return prisma.videos.findMany();
    }

    static async getAllVideosPaginated(
        prisma: PrismaClient,
        skip: number,
        take: number
    ) {
        return prisma.videos.findMany({
            skip,
            take,
        });
    }

    static async countVideos(prisma: PrismaClient) {
        return prisma.videos.count()
    }
    
    static async findVideoById(
        prisma: PrismaClient,
        id: number,
    ) {
        return prisma.videos.findUnique({
            where: { id },
        });
    }

    static async updateVideoById(        
        prisma: PrismaClient,
        id: number,
        data: Prisma.VideosUpdateInput,
    ) {
        return prisma.videos.update({
            where: { id },
            data,
        });
    }

    static async deleteVideoById(
        prisma: PrismaClient,
        id: number,
    ) {
        return prisma.videos.delete({
            where: { id },
        });
    }


}