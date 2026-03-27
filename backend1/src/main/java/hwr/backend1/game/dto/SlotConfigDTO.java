package hwr.backend1.game.dto;

import java.util.List;

public record SlotConfigDTO(
        int reels,
        int rows,
        int paylines,
        int minBet,
        int maxBet,
        int defaultBet,
        List<PaylineDTO> paylineDefinitions,
        List<SymbolPayoutDTO> symbols
) {}