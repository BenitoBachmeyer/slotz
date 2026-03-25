package hwr.backend1.settings.dto;

public record SpinHistoryEntryDTO(
        long spinId,
        String resultLabel,
        int creditDelta
) {}
