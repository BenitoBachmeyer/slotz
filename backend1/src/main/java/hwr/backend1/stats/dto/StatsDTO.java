package hwr.backend1.stats.dto;


public record StatsDTO(
        int totalSpins,
        int winningSpins,
        double winRate,
        int totalBetAmount,
        int totalPayout,
        int netResult,
        int bestPayout
) {}
