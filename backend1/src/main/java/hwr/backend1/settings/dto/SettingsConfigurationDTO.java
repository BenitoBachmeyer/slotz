package hwr.backend1.settings.dto;

public record SettingsConfigurationDTO(
        int reels,
        int rows,
        int paylines,
        int minBet,
        int maxBet,
        int defaultBet
) {
}
