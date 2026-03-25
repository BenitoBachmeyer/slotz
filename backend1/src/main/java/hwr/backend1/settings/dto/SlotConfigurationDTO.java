package hwr.backend1.settings.dto;

public record SlotConfigurationDTO(
        int reelCount,
        int rowCount,
        int paylineCount,
        int minBet,
        int maxBet,
        int payoutHighlightMultiplier,
        String payoutHighlightLabel
) {}
