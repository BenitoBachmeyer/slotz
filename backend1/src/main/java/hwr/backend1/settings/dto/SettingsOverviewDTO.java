package hwr.backend1.settings.dto;

public record SettingsOverviewDTO(
        String lastAction,
        long activeDemoBalance,
        StatisticsSummaryDTO statistics,
        int recentHistoryEntryCount,
        int availableConfigurationValueCount
) {}
