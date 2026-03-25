package hwr.backend1.settings.dto;

import java.util.List;

public record ClearHistoryResponseDTO(
        String message,
        int clearedEntries,
        int remainingEntries,
        List<SpinHistoryEntryDTO> removedEntries
) {}
