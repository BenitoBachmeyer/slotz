package hwr.backend1.settings.dto;

import jakarta.validation.constraints.Min;

public record ClearHistoryRequestDTO(
        @Min(1)
        Integer entriesToClear
) {
}
