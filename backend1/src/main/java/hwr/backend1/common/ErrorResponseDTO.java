package hwr.backend1.common;

import java.time.Instant;

public record ErrorResponseDTO(
        int status,
        String error,
        String message,
        String path,
        String timestamp
) {
    public static ErrorResponseDTO of(int status, String error, String message, String path) {
        return new ErrorResponseDTO(
                status,
                error,
                message,
                path,
                Instant.now().toString()
        );
    }
}
