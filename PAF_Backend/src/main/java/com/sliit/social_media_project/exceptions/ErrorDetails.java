package com.sliit.social_media_project.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDetails {

    private String message;
    private String error;
    private LocalDateTime timestamp;

}
