import { RequestHandler, Request } from "express";
import prisma from "../connections/connection";

// interface NewRequest extends Request{
//     user?: object| null;
// }



export const createCommentHandler: RequestHandler = async (req, res, next) => {

    const { postId } = req.params;
    const { comment } = req.body;
    const post = await prisma.post.findUnique({
        where: { id: parseInt(postId) }
    })
    if (post == null) {
        return res.status(404).json({ message: 'Post not found' });
    }

    await prisma.comments.create({
        data: {
            authorId: (req as any).user.id,
            postId: parseInt(postId),
            comment,
        }
    })
    res.status(201).json({ message: "Comment posted successfully!" })
}


// Post exists, Comment exists and Comment author is same as req.user
export const updateCommentHandler: RequestHandler = async (req, res, next) => {
    const { postId } = req.params;
    const { comment, id } = req.body;
    const post = await prisma.post.findUnique({
        where: { id: parseInt(postId) }
    })
    if (post == null) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const postedComment = await prisma.comments.findFirst({
        where: { id }
    })
    if (postedComment == null) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    if (postedComment.authorId !== (req as any).user.id) {
        return res.status(403).json({ message: "You are not authorized to perform this action" });
    }
    await prisma.comments.update({
        where: { id },
        data: {
            comment
        },
    })
    res.status(200).json({ message: "Comment updated successfully!" })

}



// Post exists, Comment exists and Comment author is same as req.user
export const deleteCommentHandler: RequestHandler = async (req, res, next) => {
    const { postId } = req.params;
    const { id } = req.body;
    const post = await prisma.post.findUnique({
        where: { id: parseInt(postId) }
    })
    if (post == null) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const postedComment = await prisma.comments.findFirst({
        where: { id }
    })
    if (postedComment == null) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    if (postedComment.authorId !== (req as any).user.id) {
        return res.status(403).json({ message: "You are not authorized to perform this action" });
    }

    await prisma.comments.delete({
        where: { id }
    })

    res.status(204).json({ message: "Comment deleted successfully!" })
}