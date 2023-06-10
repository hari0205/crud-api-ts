import { RequestHandler } from "express";
import prisma from "../connections/connection";

interface BlogBody {
    title: string;
    content: string;
}

// interface CustomRequest extends Request{
//     user?: object| null;
// }


export const createBlogHandler: RequestHandler = async (req, res) => {
    const { title, content } = req.body as BlogBody;
    const newBlog = await prisma.post.create({
        data: {
            title: title, content: content, author: {
                connect: { id: (req as any).user.id } // Or extend interface
            },
        }
    })
    if (newBlog == null) {
        return res.status(500).json({ error: "Error creating blog post..." })
    }
    res.status(201).json({
        message: "Blog post created successfully",
    })
}

export const readAllBlogHandler: RequestHandler = async (req, res) => {
    const blogs = await prisma.post.findMany({
        include: {
            Comments: true,
        }
    })
    if (blogs.length == 0) {
        return res.status(404).json({ error: "No blogs found" })
    }
    res.status(200).json({ data: blogs })
}

export const readBlogHandler: RequestHandler = async (req, res) => {

    const id = parseInt(req.params.id)
    const blog = await prisma.post.findFirst({
        where: { id },
        include: { Comments: true }
    })
    if (blog == null) {
        return res.status(404).json({ error: "Error fetching blog" })
    }
    res.status(200).json({ data: blog })

}

export const updateBlogHandler: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id)

    const { title, content } = req.body as BlogBody

    const post = await prisma.post.findFirst({
        where: { id },
    })
    if (post == null) {
        return res.status(404).json({ error: "The post does not exist" })
    }
    if (post?.authorId !== (req as any).user.id as number) {
        return res.status(403).json({ error: "Only authors can update their posts" })
    }
    const updatedPost = await prisma.post.update({
        where: { id },
        data: {
            title,
            content,
        }
    })
    if (updatedPost == null) {
        return res.status(500).json({ error: "Error deleting post" })
    }
    res.status(200).json({ message: "Updated blog successfully.", data: updatedPost })
}

export const deleteBlogHandler: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id)

    const post = await prisma.post.findFirst({
        where: { id },
    })
    if (post == null) {
        return res.status(404).json({ error: "The post does not exist" })
    }
    if (post?.authorId !== (req as any).user.id as number) {
        return res.status(403).json({ error: "Only authors can delete their posts" })
    }

    const deletedPost = await prisma.post.delete({
        where: { id },
    })

    if (deletedPost == null) {
        return res.status(500).json({ error: "Error deleting post" })
    }
    res.status(204).json({ message: "Post deleted successfully..." })
}