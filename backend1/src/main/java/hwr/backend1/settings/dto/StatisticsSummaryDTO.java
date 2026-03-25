package hwr.backend1.settings.dto;

import java.math.BigDecimal;

public record StatisticsSummaryDTO(
        int totalSpins,
        BigDecimal winRate,
        int bestPayout
) {
}
