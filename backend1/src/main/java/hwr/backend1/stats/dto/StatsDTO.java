package hwr.backend1.stats.dto;

import java.util.Map;

public record StatsDTO(
        int totalSpins,
        int differenceInSpins,
        double winRate,
        int winningSpins,
        int highestPayout,
        String highestPayoutString,
        double avgReturn,
        Map<String, Integer> weeklyTrend,
        Map<String, Double> symbolFrequency
) {}
