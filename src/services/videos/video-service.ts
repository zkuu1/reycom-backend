import type { PrismaClient } from "../../generated/prisma/client.js";
import { VideoRepository } from "../../repositories/videos/video-repository.js";

export class VideoService {

  // =====================
  // CREATE VIDEO
  // =====================
    static async createVideo(
        prisma: PrismaClient,
        data: {
            title_video: string;
            link_video: string;
            description_video?: string | null;
        },
    ) 
    {
        return VideoRepository.createVideo(prisma, data);
    }

    // =====================
    // GET ALL VIDEOS
    // =====================
    static async getAllVideos(prisma: PrismaClient) {
        return VideoRepository.getAllVideos(prisma);
    }

    // =====================
    // GET VIDEO BY ID
    // =====================
        static async getVideoById(
            prisma: PrismaClient,
            id: number,
        ) {
            return VideoRepository.findVideoById(prisma, id);
        }

    // =====================
    // UPDATE VIDEO BY ID
    // =====================
        static async updateVideoById(
        prisma: PrismaClient, id_video: number, validated: { title_video?: string | undefined; link_video?: string | undefined; }, data: {
        id: number;
        title_video?: string;
        link_video?: string;
        description_video?: string | null;
        },
        ) {
            const { id, ...updateData } = data;
            return VideoRepository.updateVideoById(prisma, id, updateData);
        }   

        // =====================
        // DELETE VIDEO BY ID
        // =====================
        static async deleteVideoById(
            prisma: PrismaClient,
            id: number,
        ) {
            return VideoRepository.deleteVideoById(prisma, id);
        }
    }
