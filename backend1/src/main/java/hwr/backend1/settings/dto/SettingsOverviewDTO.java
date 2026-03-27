package hwr.backend1.settings.dto;

public record SettingsOverviewDTO(
        int currentDemoBalance,
        int totalSpins,
        int historySize,
        int minBet,
        int maxBet,
        int defaultBet
) {}
