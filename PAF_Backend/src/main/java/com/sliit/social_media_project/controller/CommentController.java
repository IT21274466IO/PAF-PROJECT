package com.sliit.social_media_project.controller;

import com.sliit.social_media_project.models.Comment;
import com.sliit.social_media_project.models.User;
import com.sliit.social_media_project.service.CommentService;
import com.sliit.social_media_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/comments/post/{postId}")
    public Comment createComment(
            @RequestBody Comment comment,
            @RequestHeader ("Authorization") String jwt,
            @PathVariable("postId") Integer postId) throws Exception {

        User user = userService.findUserByJwt(jwt);
        Comment createdComment = commentService.createComment(comment, postId, user.getId());

        return createdComment;
    }

    @PutMapping("/api/comments/like/{commentId}")
    public Comment likeComment(
            @RequestHeader ("Authorization") String jwt,
            @PathVariable("commentId") Integer commentId) throws Exception {

        User user = userService.findUserByJwt(jwt);
        Comment likeComment = commentService.likeComment(commentId, user.getId());

        return likeComment;
    }
}
