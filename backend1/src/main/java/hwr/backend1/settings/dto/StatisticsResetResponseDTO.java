package hwr.backend1.settings.dto;

public record StatisticsResetResponseDTO(
        String message,
        StatisticsSummaryDTO statistics
) {}
